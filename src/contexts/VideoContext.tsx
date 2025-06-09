import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

interface Participant {
  id: string;
  name: string;
  role: 'tutor' | 'student';
  isAudioMuted: boolean;
  isVideoMuted: boolean;
  isHandRaised: boolean;
  stream?: MediaStream;
}

interface VideoContextType {
  isConnected: boolean;
  participants: Participant[];
  localStream: MediaStream | null;
  isAudioMuted: boolean;
  isVideoMuted: boolean;
  isHandRaised: boolean;
  isScreenSharing: boolean;
  messages: ChatMessage[];
  joinRoom: (roomId: string, userInfo: { name: string; role: 'tutor' | 'student' }) => Promise<void>;
  leaveRoom: () => void;
  toggleAudio: () => void;
  toggleVideo: () => void;
  toggleHandRaise: () => void;
  startScreenShare: () => Promise<void>;
  stopScreenShare: () => void;
  sendMessage: (message: string) => void;
  sendReaction: (emoji: string) => void;
  kickParticipant: (participantId: string) => void;
  muteParticipant: (participantId: string) => void;
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
  type: 'message' | 'reaction';
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};

interface VideoProviderProps {
  children: ReactNode;
}

export const VideoProvider: React.FC<VideoProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  const socketRef = useRef<Socket | null>(null);
  const peerConnectionsRef = useRef<{ [key: string]: RTCPeerConnection }>({});
  const currentRoomRef = useRef<string | null>(null);

  const joinRoom = async (roomId: string, userInfo: { name: string; role: 'tutor' | 'student' }) => {
    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      
      setLocalStream(stream);
      currentRoomRef.current = roomId;

      // Connect to signaling server
      socketRef.current = io(process.env.REACT_APP_SIGNALING_SERVER || 'ws://localhost:3001');
      
      socketRef.current.emit('join-room', { roomId, userInfo });
      
      socketRef.current.on('user-joined', handleUserJoined);
      socketRef.current.on('user-left', handleUserLeft);
      socketRef.current.on('offer', handleOffer);
      socketRef.current.on('answer', handleAnswer);
      socketRef.current.on('ice-candidate', handleIceCandidate);
      socketRef.current.on('chat-message', handleChatMessage);
      socketRef.current.on('reaction', handleReaction);
      socketRef.current.on('participant-update', handleParticipantUpdate);
      
      setIsConnected(true);
    } catch (error) {
      console.error('Error joining room:', error);
      throw error;
    }
  };

  const leaveRoom = () => {
    if (socketRef.current) {
      socketRef.current.emit('leave-room', currentRoomRef.current);
      socketRef.current.disconnect();
    }

    // Close all peer connections
    Object.values(peerConnectionsRef.current).forEach(pc => pc.close());
    peerConnectionsRef.current = {};

    // Stop local stream
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }

    setIsConnected(false);
    setParticipants([]);
    setMessages([]);
    currentRoomRef.current = null;
  };

  const createPeerConnection = (participantId: string): RTCPeerConnection => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        // Add TURN servers for production
      ],
    });

    pc.onicecandidate = (event) => {
      if (event.candidate && socketRef.current) {
        socketRef.current.emit('ice-candidate', {
          candidate: event.candidate,
          to: participantId,
        });
      }
    };

    pc.ontrack = (event) => {
      setParticipants(prev => prev.map(p => 
        p.id === participantId 
          ? { ...p, stream: event.streams[0] }
          : p
      ));
    };

    // Add local stream to peer connection
    if (localStream) {
      localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
      });
    }

    peerConnectionsRef.current[participantId] = pc;
    return pc;
  };

  const handleUserJoined = async (data: { participantId: string; userInfo: any }) => {
    const { participantId, userInfo } = data;
    
    setParticipants(prev => [...prev, {
      id: participantId,
      name: userInfo.name,
      role: userInfo.role,
      isAudioMuted: false,
      isVideoMuted: false,
      isHandRaised: false,
    }]);

    // Create offer for new participant
    const pc = createPeerConnection(participantId);
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    
    if (socketRef.current) {
      socketRef.current.emit('offer', {
        offer,
        to: participantId,
      });
    }
  };

  const handleUserLeft = (participantId: string) => {
    setParticipants(prev => prev.filter(p => p.id !== participantId));
    
    if (peerConnectionsRef.current[participantId]) {
      peerConnectionsRef.current[participantId].close();
      delete peerConnectionsRef.current[participantId];
    }
  };

  const handleOffer = async (data: { offer: RTCSessionDescriptionInit; from: string }) => {
    const { offer, from } = data;
    const pc = createPeerConnection(from);
    
    await pc.setRemoteDescription(offer);
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    
    if (socketRef.current) {
      socketRef.current.emit('answer', {
        answer,
        to: from,
      });
    }
  };

  const handleAnswer = async (data: { answer: RTCSessionDescriptionInit; from: string }) => {
    const { answer, from } = data;
    const pc = peerConnectionsRef.current[from];
    
    if (pc) {
      await pc.setRemoteDescription(answer);
    }
  };

  const handleIceCandidate = async (data: { candidate: RTCIceCandidateInit; from: string }) => {
    const { candidate, from } = data;
    const pc = peerConnectionsRef.current[from];
    
    if (pc) {
      await pc.addIceCandidate(candidate);
    }
  };

  const handleChatMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  };

  const handleReaction = (data: { emoji: string; from: string; name: string }) => {
    const reactionMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: data.from,
      senderName: data.name,
      message: data.emoji,
      timestamp: new Date(),
      type: 'reaction',
    };
    setMessages(prev => [...prev, reactionMessage]);
  };

  const handleParticipantUpdate = (data: { participantId: string; updates: any }) => {
    setParticipants(prev => prev.map(p => 
      p.id === data.participantId 
        ? { ...p, ...data.updates }
        : p
    ));
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioMuted(!audioTrack.enabled);
        
        if (socketRef.current) {
          socketRef.current.emit('participant-update', {
            isAudioMuted: !audioTrack.enabled,
          });
        }
      }
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoMuted(!videoTrack.enabled);
        
        if (socketRef.current) {
          socketRef.current.emit('participant-update', {
            isVideoMuted: !videoTrack.enabled,
          });
        }
      }
    }
  };

  const toggleHandRaise = () => {
    const newHandRaised = !isHandRaised;
    setIsHandRaised(newHandRaised);
    
    if (socketRef.current) {
      socketRef.current.emit('participant-update', {
        isHandRaised: newHandRaised,
      });
    }
  };

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      
      // Replace video track in all peer connections
      const videoTrack = screenStream.getVideoTracks()[0];
      Object.values(peerConnectionsRef.current).forEach(pc => {
        const sender = pc.getSenders().find(s => 
          s.track && s.track.kind === 'video'
        );
        if (sender) {
          sender.replaceTrack(videoTrack);
        }
      });
      
      setIsScreenSharing(true);
      
      videoTrack.onended = () => {
        stopScreenShare();
      };
    } catch (error) {
      console.error('Error starting screen share:', error);
    }
  };

  const stopScreenShare = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      Object.values(peerConnectionsRef.current).forEach(pc => {
        const sender = pc.getSenders().find(s => 
          s.track && s.track.kind === 'video'
        );
        if (sender && videoTrack) {
          sender.replaceTrack(videoTrack);
        }
      });
    }
    
    setIsScreenSharing(false);
  };

  const sendMessage = (message: string) => {
    if (socketRef.current) {
      const chatMessage: ChatMessage = {
        id: Date.now().toString(),
        senderId: 'me',
        senderName: 'You',
        message,
        timestamp: new Date(),
        type: 'message',
      };
      
      socketRef.current.emit('chat-message', chatMessage);
      setMessages(prev => [...prev, chatMessage]);
    }
  };

  const sendReaction = (emoji: string) => {
    if (socketRef.current) {
      socketRef.current.emit('reaction', { emoji });
    }
  };

  const kickParticipant = (participantId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('kick-participant', { participantId });
    }
  };

  const muteParticipant = (participantId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('mute-participant', { participantId });
    }
  };

  const value = {
    isConnected,
    participants,
    localStream,
    isAudioMuted,
    isVideoMuted,
    isHandRaised,
    isScreenSharing,
    messages,
    joinRoom,
    leaveRoom,
    toggleAudio,
    toggleVideo,
    toggleHandRaise,
    startScreenShare,
    stopScreenShare,
    sendMessage,
    sendReaction,
    kickParticipant,
    muteParticipant,
  };

  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  );
};