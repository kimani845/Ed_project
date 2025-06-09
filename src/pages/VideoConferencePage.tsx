import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useVideo } from '../contexts/VideoContext';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Phone, 
  Monitor, 
  Hand, 
  MessageCircle,
  Users,
  Settings,
  MoreVertical,
  Send,
  Smile
} from 'lucide-react';
import toast from 'react-hot-toast';

const VideoConferencePage = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
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
  } = useVideo();

  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [showReactions, setShowReactions] = useState(false);
  const [classInfo, setClassInfo] = useState({
    title: 'Advanced Mathematics',
    tutor: 'Dr. Sarah Wanjiku',
    subject: 'Mathematics',
  });

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user || !classId) {
      navigate('/');
      return;
    }

    // Join the video room
    const userInfo = {
      name: `${user.profile.firstName} ${user.profile.lastName}`,
      role: user.role,
    };

    joinRoom(classId, userInfo).catch((error) => {
      console.error('Failed to join room:', error);
      toast.error('Failed to join the class. Please check your camera and microphone permissions.');
      navigate(-1);
    });

    return () => {
      leaveRoom();
    };
  }, [classId, user, joinRoom, leaveRoom, navigate]);

  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      sendMessage(chatMessage);
      setChatMessage('');
    }
  };

  const handleReaction = (emoji: string) => {
    sendReaction(emoji);
    setShowReactions(false);
  };

  const handleLeaveCall = () => {
    leaveRoom();
    navigate(-1);
  };

  const reactions = ['👍', '👏', '❤️', '😂', '😮', '🤔', '✋', '👋'];

  const getVideoGridClass = () => {
    const totalParticipants = participants.length + 1; // +1 for local user
    if (totalParticipants === 1) return 'video-grid-1';
    if (totalParticipants === 2) return 'video-grid-2';
    if (totalParticipants <= 4) return 'video-grid-4';
    return 'video-grid-many';
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Connecting to class...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">{classInfo.title}</h1>
          <p className="text-sm text-gray-300">with {classInfo.tutor}</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowParticipants(!showParticipants)}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Users className="h-4 w-4" />
            <span>{participants.length + 1}</span>
          </button>
          <button
            onClick={() => setShowChat(!showChat)}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Chat</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main Video Area */}
        <div className="flex-1 p-4">
          <div className={`video-grid ${getVideoGridClass()} h-full`}>
            {/* Local Video */}
            <div className="video-participant">
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="video-overlay" />
              <div className="participant-name">
                You {isHandRaised && '✋'}
              </div>
              {isVideoMuted && (
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                  <VideoOff className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>

            {/* Remote Videos */}
            {participants.map((participant) => (
              <div key={participant.id} className="video-participant">
                {participant.stream ? (
                  <video
                    autoPlay
                    playsInline
                    ref={(video) => {
                      if (video && participant.stream) {
                        video.srcObject = participant.stream;
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-xl font-bold">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <p className="text-sm">{participant.name}</p>
                    </div>
                  </div>
                )}
                <div className="video-overlay" />
                <div className="participant-name">
                  {participant.name} {participant.isHandRaised && '✋'}
                  {participant.role === 'tutor' && ' (Host)'}
                </div>
                {participant.isVideoMuted && (
                  <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                    <VideoOff className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                {participant.isAudioMuted && (
                  <div className="absolute top-2 right-2">
                    <MicOff className="h-5 w-5 text-red-500" />
                  </div>
                )}
                {user?.role === 'tutor' && (
                  <div className="absolute top-2 left-2">
                    <button
                      onClick={() => muteParticipant(participant.id)}
                      className="p-1 bg-black bg-opacity-50 rounded hover:bg-opacity-75"
                    >
                      <MoreVertical className="h-4 w-4 text-white" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Chat</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-medium">
                      {message.senderName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">
                        {message.senderName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">
                      {message.type === 'reaction' ? (
                        <span className="text-2xl">{message.message}</span>
                      ) : (
                        message.message
                      )}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-4">
        <div className="flex items-center justify-center space-x-4">
          {/* Audio Toggle */}
          <button
            onClick={toggleAudio}
            className={`p-3 rounded-full transition-colors ${
              isAudioMuted 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            {isAudioMuted ? (
              <MicOff className="h-5 w-5 text-white" />
            ) : (
              <Mic className="h-5 w-5 text-white" />
            )}
          </button>

          {/* Video Toggle */}
          <button
            onClick={toggleVideo}
            className={`p-3 rounded-full transition-colors ${
              isVideoMuted 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            {isVideoMuted ? (
              <VideoOff className="h-5 w-5 text-white" />
            ) : (
              <Video className="h-5 w-5 text-white" />
            )}
          </button>

          {/* Screen Share */}
          {user?.role === 'tutor' && (
            <button
              onClick={isScreenSharing ? stopScreenShare : startScreenShare}
              className={`p-3 rounded-full transition-colors ${
                isScreenSharing 
                  ? 'bg-primary-600 hover:bg-primary-700' 
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              <Monitor className="h-5 w-5 text-white" />
            </button>
          )}

          {/* Raise Hand */}
          {user?.role === 'student' && (
            <button
              onClick={toggleHandRaise}
              className={`p-3 rounded-full transition-colors ${
                isHandRaised 
                  ? 'bg-yellow-600 hover:bg-yellow-700' 
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              <Hand className="h-5 w-5 text-white" />
            </button>
          )}

          {/* Reactions */}
          <div className="relative">
            <button
              onClick={() => setShowReactions(!showReactions)}
              className="p-3 rounded-full bg-gray-600 hover:bg-gray-700 transition-colors"
            >
              <Smile className="h-5 w-5 text-white" />
            </button>
            {showReactions && (
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 flex space-x-1">
                {reactions.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleReaction(emoji)}
                    className="p-2 hover:bg-gray-100 rounded text-xl"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Leave Call */}
          <button
            onClick={handleLeaveCall}
            className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
          >
            <Phone className="h-5 w-5 text-white transform rotate-[135deg]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoConferencePage;