import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Users, 
  Star, 
  Filter,
  Search,
  Play,
  BookOpen,
  User
} from 'lucide-react';

interface ClassItem {
  id: string;
  title: string;
  description: string;
  tutor: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
    totalRatings: number;
  };
  subject: string;
  scheduledAt: Date;
  duration: number;
  maxStudents: number;
  enrolledStudents: number;
  price: number;
  status: 'scheduled' | 'live' | 'completed';
  isEnrolled: boolean;
}

const ClassesPage = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<ClassItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  const subjects = [
    'Mathematics', 'English', 'Kiswahili', 'Science', 'Physics', 
    'Chemistry', 'Biology', 'History', 'Geography', 'Computer Studies'
  ];

  useEffect(() => {
    // Simulate loading classes data
    const mockClasses: ClassItem[] = [
      {
        id: '1',
        title: 'Advanced Calculus - Derivatives and Integrals',
        description: 'Master the fundamentals of calculus with practical examples and problem-solving techniques.',
        tutor: {
          id: '1',
          name: 'Dr. Sarah Wanjiku',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          rating: 4.8,
          totalRatings: 124,
        },
        subject: 'Mathematics',
        scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        duration: 90,
        maxStudents: 25,
        enrolledStudents: 18,
        price: 500,
        status: 'scheduled',
        isEnrolled: true,
      },
      {
        id: '2',
        title: 'English Literature - Poetry Analysis',
        description: 'Explore the beauty of poetry through detailed analysis of classic and contemporary works.',
        tutor: {
          id: '2',
          name: 'Prof. James Kiprotich',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          rating: 4.9,
          totalRatings: 89,
        },
        subject: 'English',
        scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        duration: 60,
        maxStudents: 20,
        enrolledStudents: 15,
        price: 400,
        status: 'scheduled',
        isEnrolled: false,
      },
      {
        id: '3',
        title: 'Chemistry Lab - Organic Compounds',
        description: 'Hands-on virtual lab session exploring organic chemistry reactions and mechanisms.',
        tutor: {
          id: '3',
          name: 'Dr. Grace Achieng',
          avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          rating: 4.7,
          totalRatings: 156,
        },
        subject: 'Chemistry',
        scheduledAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago (live)
        duration: 120,
        maxStudents: 15,
        enrolledStudents: 12,
        price: 600,
        status: 'live',
        isEnrolled: true,
      },
      {
        id: '4',
        title: 'Physics - Quantum Mechanics Basics',
        description: 'Introduction to quantum mechanics principles and their real-world applications.',
        tutor: {
          id: '4',
          name: 'Dr. Michael Ochieng',
          rating: 4.6,
          totalRatings: 78,
        },
        subject: 'Physics',
        scheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        duration: 75,
        maxStudents: 30,
        enrolledStudents: 22,
        price: 550,
        status: 'scheduled',
        isEnrolled: false,
      },
    ];

    setTimeout(() => {
      setClasses(mockClasses);
      setFilteredClasses(mockClasses);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = classes;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (classItem) =>
          classItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          classItem.tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          classItem.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by subject
    if (selectedSubject !== 'all') {
      filtered = filtered.filter((classItem) => classItem.subject === selectedSubject);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter((classItem) => classItem.status === selectedStatus);
    }

    setFilteredClasses(filtered);
  }, [classes, searchTerm, selectedSubject, selectedStatus]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-100 text-red-800 animate-pulse';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEnroll = (classId: string) => {
    // Simulate enrollment
    setClasses(prev => prev.map(c => 
      c.id === classId 
        ? { ...c, isEnrolled: true, enrolledStudents: c.enrolledStudents + 1 }
        : c
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Classes</h1>
          <p className="text-gray-600">
            Discover and enroll in classes taught by expert tutors
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Subject Filter */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Status</option>
              <option value="live">Live Now</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
            </select>

            {/* Results Count */}
            <div className="flex items-center text-sm text-gray-600">
              <Filter className="h-4 w-4 mr-2" />
              {filteredClasses.length} classes found
            </div>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClasses.map((classItem) => (
            <div key={classItem.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(classItem.status)}`}>
                    {classItem.status === 'live' ? '🔴 Live' : classItem.status}
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    KSh {classItem.price}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {classItem.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {classItem.description}
                </p>

                {/* Tutor Info */}
                <div className="flex items-center mb-4">
                  {classItem.tutor.avatar ? (
                    <img
                      src={classItem.tutor.avatar}
                      alt={classItem.tutor.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center mr-3">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{classItem.tutor.name}</p>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">
                        {classItem.tutor.rating} ({classItem.tutor.totalRatings})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Class Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span>{classItem.subject}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(classItem.scheduledAt)} at {formatTime(classItem.scheduledAt)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{classItem.duration} minutes</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{classItem.enrolledStudents}/{classItem.maxStudents} students</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 pb-6">
                {classItem.isEnrolled ? (
                  <div className="space-y-2">
                    {classItem.status === 'live' ? (
                      <Link
                        to={`/class/${classItem.id}/video`}
                        className="w-full btn btn-primary flex items-center justify-center space-x-2"
                      >
                        <Play className="h-4 w-4" />
                        <span>Join Live Class</span>
                      </Link>
                    ) : (
                      <button className="w-full btn btn-secondary cursor-default">
                        Enrolled
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => handleEnroll(classItem.id)}
                    disabled={classItem.enrolledStudents >= classItem.maxStudents}
                    className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {classItem.enrolledStudents >= classItem.maxStudents ? 'Class Full' : 'Enroll Now'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredClasses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No classes found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or search terms to find more classes.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSubject('all');
                setSelectedStatus('all');
              }}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassesPage;