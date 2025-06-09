import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Calendar, 
  BookOpen, 
  FileText, 
  GraduationCap, 
  Clock,
  TrendingUp,
  Users,
  Award,
  Play,
  ChevronRight
} from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    enrolledClasses: 0,
    completedAssignments: 0,
    upcomingExams: 0,
    averageGrade: 0,
  });

  const [upcomingClasses, setUpcomingClasses] = useState([
    {
      id: '1',
      title: 'Advanced Mathematics',
      tutor: 'Dr. Sarah Wanjiku',
      subject: 'Mathematics',
      scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      duration: 60,
      isLive: false,
    },
    {
      id: '2',
      title: 'English Literature',
      tutor: 'Prof. James Kiprotich',
      subject: 'English',
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      duration: 90,
      isLive: false,
    },
  ]);

  const [recentAssignments, setRecentAssignments] = useState([
    {
      id: '1',
      title: 'Calculus Problem Set',
      subject: 'Mathematics',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      status: 'pending',
      score: null,
    },
    {
      id: '2',
      title: 'Essay on Kenyan Literature',
      subject: 'English',
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      status: 'graded',
      score: 85,
    },
  ]);

  useEffect(() => {
    // Simulate loading dashboard data
    setStats({
      enrolledClasses: 5,
      completedAssignments: 12,
      upcomingExams: 2,
      averageGrade: 87.5,
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'graded':
        return 'text-green-600 bg-green-100';
      case 'overdue':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
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
            Here's what's happening with your learning journey today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Enrolled Classes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.enrolledClasses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-success-100 rounded-lg">
                <FileText className="h-6 w-6 text-success-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Assignments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedAssignments}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-warning-100 rounded-lg">
                <GraduationCap className="h-6 w-6 text-warning-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming Exams</p>
                <p className="text-2xl font-bold text-gray-900">{stats.upcomingExams}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-secondary-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-secondary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Grade</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageGrade}%</p>
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
                  to="/student/classes"
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
                        <p className="text-sm text-gray-600">with {classItem.tutor}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {formatDate(classItem.scheduledAt)} at {formatTime(classItem.scheduledAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {classItem.isLive ? (
                        <Link
                          to={`/class/${classItem.id}/video`}
                          className="btn btn-primary flex items-center space-x-1"
                        >
                          <Play className="h-4 w-4" />
                          <span>Join</span>
                        </Link>
                      ) : (
                        <span className="text-sm text-gray-500">{classItem.duration} min</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Assignments */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Assignments</h2>
                <Link
                  to="/student/assignments"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
                >
                  View all
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-secondary-100 rounded-lg">
                        <FileText className="h-5 w-5 text-secondary-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                        <p className="text-sm text-gray-600">{assignment.subject}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            Due {formatDate(assignment.dueDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                        {assignment.status}
                      </span>
                      {assignment.score && (
                        <div className="flex items-center space-x-1">
                          <Award className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium text-gray-900">{assignment.score}%</span>
                        </div>
                      )}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/student/classes"
              className="flex items-center space-x-3 p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
            >
              <Calendar className="h-6 w-6 text-primary-600" />
              <div>
                <h3 className="font-medium text-gray-900">Browse Classes</h3>
                <p className="text-sm text-gray-600">Find and enroll in new classes</p>
              </div>
            </Link>

            <Link
              to="/student/assignments"
              className="flex items-center space-x-3 p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
            >
              <FileText className="h-6 w-6 text-secondary-600" />
              <div>
                <h3 className="font-medium text-gray-900">Submit Assignment</h3>
                <p className="text-sm text-gray-600">Complete pending assignments</p>
              </div>
            </Link>

            <Link
              to="/student/progress"
              className="flex items-center space-x-3 p-4 bg-success-50 rounded-lg hover:bg-success-100 transition-colors"
            >
              <TrendingUp className="h-6 w-6 text-success-600" />
              <div>
                <h3 className="font-medium text-gray-900">View Progress</h3>
                <p className="text-sm text-gray-600">Track your learning journey</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;