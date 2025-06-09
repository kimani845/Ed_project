import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Users, 
  Plus,
  Edit,
  Trash2,
  Play,
  Filter,
  Search,
  BookOpen,
  DollarSign
} from 'lucide-react';

interface TutorClass {
  id: string;
  title: string;
  description: string;
  subject: string;
  scheduledAt: Date;
  duration: number;
  maxStudents: number;
  enrolledStudents: number;
  price: number;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  meetingLink?: string;
}

const TutorClassesPage = () => {
  const [classes, setClasses] = useState<TutorClass[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<TutorClass[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [classToDelete, setClassToDelete] = useState<TutorClass | null>(null);

  const subjects = ['Mathematics', 'English', 'Chemistry', 'Physics', 'Biology'];

  useEffect(() => {
    // Simulate loading classes data
    const mockClasses: TutorClass[] = [
      {
        id: '1',
        title: 'Advanced Calculus - Derivatives and Integrals',
        description: 'Master the fundamentals of calculus with practical examples and problem-solving techniques.',
        subject: 'Mathematics',
        scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        duration: 90,
        maxStudents: 25,
        enrolledStudents: 18,
        price: 500,
        status: 'scheduled',
        meetingLink: 'https://meet.educonnect.ke/class-1',
      },
      {
        id: '2',
        title: 'Algebra Fundamentals',
        description: 'Build a strong foundation in algebraic concepts and problem-solving.',
        subject: 'Mathematics',
        scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        duration: 60,
        maxStudents: 30,
        enrolledStudents: 25,
        price: 400,
        status: 'scheduled',
      },
      {
        id: '3',
        title: 'Trigonometry Workshop',
        description: 'Interactive session on trigonometric functions and applications.',
        subject: 'Mathematics',
        scheduledAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago (live)
        duration: 75,
        maxStudents: 20,
        enrolledStudents: 15,
        price: 450,
        status: 'live',
        meetingLink: 'https://meet.educonnect.ke/class-3',
      },
      {
        id: '4',
        title: 'Geometry Basics',
        description: 'Introduction to geometric shapes, theorems, and proofs.',
        subject: 'Mathematics',
        scheduledAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        duration: 60,
        maxStudents: 25,
        enrolledStudents: 22,
        price: 400,
        status: 'completed',
      },
      {
        id: '5',
        title: 'Statistics and Probability',
        description: 'Learn statistical analysis and probability theory with real-world examples.',
        subject: 'Mathematics',
        scheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        duration: 90,
        maxStudents: 20,
        enrolledStudents: 8,
        price: 550,
        status: 'scheduled',
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
          classItem.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          classItem.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter((classItem) => classItem.status === selectedStatus);
    }

    // Filter by subject
    if (selectedSubject !== 'all') {
      filtered = filtered.filter((classItem) => classItem.subject === selectedSubject);
    }

    setFilteredClasses(filtered);
  }, [classes, searchTerm, selectedStatus, selectedSubject]);

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
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-100 text-red-800 animate-pulse';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteClass = (classItem: TutorClass) => {
    setClassToDelete(classItem);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (classToDelete) {
      setClasses(prev => prev.filter(c => c.id !== classToDelete.id));
      setShowDeleteModal(false);
      setClassToDelete(null);
    }
  };

  const handleStartClass = (classId: string) => {
    // Update class status to live
    setClasses(prev => prev.map(c => 
      c.id === classId 
        ? { ...c, status: 'live' as const }
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Classes</h1>
            <p className="text-gray-600">
              Manage your scheduled classes and create new ones
            </p>
          </div>
          <Link
            to="/tutor/classes/new"
            className="btn btn-primary flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Class</span>
          </Link>
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
              <option value="cancelled">Cancelled</option>
            </select>

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

            {/* Results Count */}
            <div className="flex items-center text-sm text-gray-600">
              <Filter className="h-4 w-4 mr-2" />
              {filteredClasses.length} classes found
            </div>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredClasses.map((classItem) => (
            <div key={classItem.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(classItem.status)}`}>
                    {classItem.status === 'live' ? '🔴 Live' : classItem.status}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      {formatCurrency(classItem.price)}
                    </span>
                    <div className="flex space-x-1">
                      <Link
                        to={`/tutor/classes/${classItem.id}/edit`}
                        className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteClass(classItem)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {classItem.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {classItem.description}
                </p>

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
                    <span>{classItem.enrolledStudents}/{classItem.maxStudents} students enrolled</span>
                  </div>
                </div>

                {/* Enrollment Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Enrollment</span>
                    <span>{Math.round((classItem.enrolledStudents / classItem.maxStudents) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${(classItem.enrolledStudents / classItem.maxStudents) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 pb-6">
                <div className="flex space-x-2">
                  {classItem.status === 'scheduled' && (
                    <button
                      onClick={() => handleStartClass(classItem.id)}
                      className="flex-1 btn btn-primary flex items-center justify-center space-x-2"
                    >
                      <Play className="h-4 w-4" />
                      <span>Start Class</span>
                    </button>
                  )}
                  
                  {classItem.status === 'live' && (
                    <Link
                      to={`/class/${classItem.id}/video`}
                      className="flex-1 btn btn-primary flex items-center justify-center space-x-2"
                    >
                      <Play className="h-4 w-4" />
                      <span>Join Live Class</span>
                    </Link>
                  )}
                  
                  {classItem.status === 'completed' && (
                    <Link
                      to={`/tutor/classes/${classItem.id}/analytics`}
                      className="flex-1 btn btn-outline flex items-center justify-center space-x-2"
                    >
                      <BookOpen className="h-4 w-4" />
                      <span>View Analytics</span>
                    </Link>
                  )}

                  <Link
                    to={`/tutor/classes/${classItem.id}/students`}
                    className="btn btn-outline flex items-center space-x-1"
                  >
                    <Users className="h-4 w-4" />
                    <span>Students</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredClasses.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No classes found</h3>
            <p className="text-gray-600 mb-4">
              {classes.length === 0 
                ? "You haven't created any classes yet. Start by creating your first class."
                : "Try adjusting your filters to find more classes."
              }
            </p>
            {classes.length === 0 ? (
              <Link
                to="/tutor/classes/new"
                className="btn btn-primary inline-flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Create Your First Class</span>
              </Link>
            ) : (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedStatus('all');
                  setSelectedSubject('all');
                }}
                className="btn btn-primary"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && classToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delete Class
              </h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete "{classToDelete.title}"? This action cannot be undone.
                {classToDelete.enrolledStudents > 0 && (
                  <span className="block mt-2 text-red-600 font-medium">
                    Warning: {classToDelete.enrolledStudents} students are enrolled in this class.
                  </span>
                )}
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 btn bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorClassesPage;