import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Award,
  BookOpen,
  MessageCircle,
  MoreVertical,
  Star
} from 'lucide-react';

// Student information to the tutor
interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  enrolledAt: Date;
  lastActive: Date;
  enrolledClasses: string[];
  completedAssignments: number;
  totalAssignments: number;
  averageGrade: number;
  attendanceRate: number;
  status: 'active' | 'inactive' | 'suspended';
}

const TutorStudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);

  const classes = ['Advanced Calculus', 'Algebra Fundamentals', 'Trigonometry Workshop', 'Geometry Basics'];

  useEffect(() => {
    // Simulate loading students data
    const mockStudents: Student[] = [
      {
        id: '1',
        name: 'Sarah Wanjiku',
        email: 'sarah.wanjiku@email.com',
        phone: '+254712345678',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        enrolledAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        enrolledClasses: ['Advanced Calculus', 'Trigonometry Workshop'],
        completedAssignments: 8,
        totalAssignments: 10,
        averageGrade: 88,
        attendanceRate: 95,
        status: 'active',
      },
      {
        id: '2',
        name: 'James Kiprotich',
        email: 'james.kiprotich@email.com',
        phone: '+254723456789',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        enrolledAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
        lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        enrolledClasses: ['Advanced Calculus', 'Algebra Fundamentals', 'Geometry Basics'],
        completedAssignments: 12,
        totalAssignments: 15,
        averageGrade: 92,
        attendanceRate: 88,
        status: 'active',
      },
      {
        id: '3',
        name: 'Grace Achieng',
        email: 'grace.achieng@email.com',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        enrolledAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
        lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        enrolledClasses: ['Algebra Fundamentals'],
        completedAssignments: 5,
        totalAssignments: 8,
        averageGrade: 78,
        attendanceRate: 75,
        status: 'active',
      },
      {
        id: '4',
        name: 'Michael Ochieng',
        email: 'michael.ochieng@email.com',
        phone: '+254734567890',
        enrolledAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
        lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        enrolledClasses: ['Trigonometry Workshop', 'Geometry Basics'],
        completedAssignments: 3,
        totalAssignments: 6,
        averageGrade: 65,
        attendanceRate: 60,
        status: 'inactive',
      },
      {
        id: '5',
        name: 'Faith Njeri',
        email: 'faith.njeri@email.com',
        phone: '+254745678901',
        avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        enrolledAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
        lastActive: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        enrolledClasses: ['Advanced Calculus'],
        completedAssignments: 4,
        totalAssignments: 4,
        averageGrade: 95,
        attendanceRate: 100,
        status: 'active',
      },
    ];

    setTimeout(() => {
      setStudents(mockStudents);
      setFilteredStudents(mockStudents);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = students;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter((student) => student.status === selectedStatus);
    }

    // Filter by class
    if (selectedClass !== 'all') {
      filtered = filtered.filter((student) => 
        student.enrolledClasses.includes(selectedClass)
      );
    }

    setFilteredStudents(filtered);
  }, [students, searchTerm, selectedStatus, selectedClass]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'inactive':
        return 'text-yellow-600 bg-yellow-100';
      case 'suspended':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Students</h1>
          <p className="text-gray-600">
            Manage and track your students' progress
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{students.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-success-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-success-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Students</p>
                <p className="text-2xl font-bold text-gray-900">
                  {students.filter(s => s.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-warning-100 rounded-lg">
                <Award className="h-6 w-6 text-warning-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Grade</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(students.reduce((acc, s) => acc + s.averageGrade, 0) / students.length)}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-secondary-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-secondary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Attendance</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(students.reduce((acc, s) => acc + s.attendanceRate, 0) / students.length)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>

            {/* Class Filter */}
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Classes</option>
              {classes.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>

            {/* Results Count */}
            <div className="flex items-center text-sm text-gray-600">
              <Filter className="h-4 w-4 mr-2" />
              {filteredStudents.length} students found
            </div>
          </div>
        </div>

        {/* Students List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <div key={student.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {student.avatar ? (
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-gray-900">{student.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                          {student.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-4 w-4 mr-1" />
                          <span>{student.email}</span>
                        </div>
                        {student.phone && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-4 w-4 mr-1" />
                            <span>{student.phone}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Enrolled {formatDate(student.enrolledAt)}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Last active {getTimeAgo(student.lastActive)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    {/* Stats */}
                    <div className="text-center">
                      <div className={`text-lg font-bold ${getGradeColor(student.averageGrade)}`}>
                        {student.averageGrade}%
                      </div>
                      <div className="text-xs text-gray-500">Avg. Grade</div>
                    </div>

                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {student.completedAssignments}/{student.totalAssignments}
                      </div>
                      <div className="text-xs text-gray-500">Assignments</div>
                    </div>

                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {student.attendanceRate}%
                      </div>
                      <div className="text-xs text-gray-500">Attendance</div>
                    </div>

                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {student.enrolledClasses.length}
                      </div>
                      <div className="text-xs text-gray-500">Classes</div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewStudent(student)}
                        className="btn btn-outline text-sm"
                      >
                        View Details
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Enrolled Classes */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {student.enrolledClasses.map((className, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                    >
                      {className}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-600 mb-4">
              {students.length === 0 
                ? "You don't have any students yet. Students will appear here when they enroll in your classes."
                : "Try adjusting your filters to find more students."
              }
            </p>
            {students.length > 0 && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedStatus('all');
                  setSelectedClass('all');
                }}
                className="btn btn-primary"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Student Details Modal */}
        {showStudentModal && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Student Details</h2>
                  <button
                    onClick={() => setShowStudentModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  {selectedStudent.avatar ? (
                    <img
                      src={selectedStudent.avatar}
                      alt={selectedStudent.name}
                      className="w-16 h-16 rounded-full"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl font-medium">
                        {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedStudent.name}</h3>
                    <p className="text-gray-600">{selectedStudent.email}</p>
                    {selectedStudent.phone && (
                      <p className="text-gray-600">{selectedStudent.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Academic Performance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average Grade:</span>
                        <span className={`font-medium ${getGradeColor(selectedStudent.averageGrade)}`}>
                          {selectedStudent.averageGrade}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Assignments:</span>
                        <span className="font-medium text-gray-900">
                          {selectedStudent.completedAssignments}/{selectedStudent.totalAssignments}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Attendance:</span>
                        <span className="font-medium text-gray-900">{selectedStudent.attendanceRate}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Enrollment Info</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Enrolled:</span>
                        <span className="font-medium text-gray-900">
                          {formatDate(selectedStudent.enrolledAt)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Active:</span>
                        <span className="font-medium text-gray-900">
                          {getTimeAgo(selectedStudent.lastActive)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedStudent.status)}`}>
                          {selectedStudent.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Enrolled Classes</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.enrolledClasses.map((className, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                      >
                        {className}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setShowStudentModal(false)}
                  className="btn btn-outline"
                >
                  Close
                </button>
                <button className="btn btn-primary flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorStudentsPage;