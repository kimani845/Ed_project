import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Star,
  TrendingUp,
  Clock,
  BookOpen,
  Play,
  ChevronRight,
  Plus
} from 'lucide-react';

const TutorDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeClasses: 0,
    monthlyEarnings: 0,
    averageRating: 0,
    totalRatings: 0,
  });

  const [upcomingClasses, setUpcomingClasses] = useState([
    {
      id: '1',
      title: 'Advanced Mathematics',
      subject: 'Mathematics',
      scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      duration: 60,
      enrolledStudents: 18,
      maxStudents: 25,
      isLive: false,
    },
    {
      id: '2',
      title: 'Calculus Problem Solving',
      subject: 'Mathematics',
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      duration: 90,
      enrolledStudents: 12,
      maxStudents: 20,
      isLive: false,
    },
  ]);

  const [recentStudents, setRecentStudents] = useState([
    {
      id: '1',
      name: 'Sarah Wanjiku',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      enrolledAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      progress: 85,
      lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000),
    },
    {
      id: '2',
      name: 'James Kiprotich',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      enrolledAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      progress: 92,
      lastActive: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
    {
      id: '3',
      name: 'Grace Achieng',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      enrolledAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      progress: 78,
      lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
  ]);

  useEffect(() => {
    // Simulate loading dashboard data
    setStats({
      totalStudents: 45,
      activeClasses: 8,
      monthlyEarnings: 125000, // KSh
      averageRating: 4.8,
      totalRatings: 124,
    });
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffHours < 1) {
      return 'Just now';
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.profile.firstName}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's an overview of your teaching activities and student progress.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-success-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-success-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Classes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeClasses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-warning-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-warning-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Earnings</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.monthlyEarnings)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-secondary-100 rounded-lg">
                <Star className="h-6 w-6 text-secondary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <div className="flex items-center space-x-1">
                  <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-500">({stats.totalRatings})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Classes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Classes</h2>
                <Link
                  to="/tutor/classes"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
                >
                  View all
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingClasses.map((classItem) => (
                  <div key={classItem.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <Calendar className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{classItem.title}</h3>
                        <p className="text-sm text-gray-600">{classItem.subject}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {formatDate(classItem.scheduledAt)} at {formatTime(classItem.scheduledAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">
                        {classItem.enrolledStudents}/{classItem.maxStudents} students
                      </div>
                      {classItem.isLive ? (
                        <Link
                          to={`/class/${classItem.id}/video`}
                          className="btn btn-primary flex items-center space-x-1 text-sm"
                        >
                          <Play className="h-4 w-4" />
                          <span>Start</span>
                        </Link>
                      ) : (
                        <span className="text-sm text-gray-500">{classItem.duration} min</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link
                  to="/tutor/classes/new"
                  className="w-full btn btn-outline flex items-center justify-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Schedule New Class</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Students */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Students</h2>
                <Link
                  to="/tutor/students"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
                >
                  View all
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{student.name}</h3>
                        <p className="text-sm text-gray-600">
                          Enrolled {formatDate(student.enrolledAt)}
                        </p>
                        <p className="text-xs text-gray-500">
                          Last active {getTimeAgo(student.lastActive)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium text-gray-900">{student.progress}%</span>
                      </div>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link
              to="/tutor/classes/new"
              className="flex items-center space-x-3 p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
            >
              <Plus className="h-6 w-6 text-primary-600" />
              <div>
                <h3 className="font-medium text-gray-900">Create Class</h3>
                <p className="text-sm text-gray-600">Schedule a new class</p>
              </div>
            </Link>

            <Link
              to="/tutor/assignments/new"
              className="flex items-center space-x-3 p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
            >
              <BookOpen className="h-6 w-6 text-secondary-600" />
              <div>
                <h3 className="font-medium text-gray-900">New Assignment</h3>
                <p className="text-sm text-gray-600">Create an assignment</p>
              </div>
            </Link>

            <Link
              to="/tutor/students"
              className="flex items-center space-x-3 p-4 bg-success-50 rounded-lg hover:bg-success-100 transition-colors"
            >
              <Users className="h-6 w-6 text-success-600" />
              <div>
                <h3 className="font-medium text-gray-900">View Students</h3>
                <p className="text-sm text-gray-600">Manage your students</p>
              </div>
            </Link>

            <Link
              to="/tutor/analytics"
              className="flex items-center space-x-3 p-4 bg-warning-50 rounded-lg hover:bg-warning-100 transition-colors"
            >
              <TrendingUp className="h-6 w-6 text-warning-600" />
              <div>
                <h3 className="font-medium text-gray-900">Analytics</h3>
                <p className="text-sm text-gray-600">View performance data</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">This Month's Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">24</div>
              <div className="text-sm text-gray-600">Classes Conducted</div>
              <div className="text-xs text-green-600 mt-1">+15% from last month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success-600 mb-2">96%</div>
              <div className="text-sm text-gray-600">Student Satisfaction</div>
              <div className="text-xs text-green-600 mt-1">+2% from last month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning-600 mb-2">18</div>
              <div className="text-sm text-gray-600">New Students</div>
              <div className="text-xs text-green-600 mt-1">+25% from last month</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;