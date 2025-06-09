import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Calendar, 
  Clock, 
  Upload, 
  Download,
  CheckCircle,
  AlertCircle,
  XCircle,
  Filter,
  Search,
  Eye,
  Edit
} from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  className: string;
  dueDate: Date;
  maxScore: number;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  submission?: {
    submittedAt: Date;
    content: string;
    fileUrl?: string;
    score?: number;
    feedback?: string;
  };
}

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [filteredAssignments, setFilteredAssignments] = useState<Assignment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [submissionContent, setSubmissionContent] = useState('');

  const subjects = ['Mathematics', 'English', 'Chemistry', 'Physics', 'Biology'];

  useEffect(() => {
    // Simulate loading assignments data
    const mockAssignments: Assignment[] = [
      {
        id: '1',
        title: 'Calculus Problem Set - Chapter 5',
        description: 'Complete problems 1-20 from Chapter 5. Show all work and provide detailed explanations for each solution.',
        subject: 'Mathematics',
        className: 'Advanced Calculus',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        maxScore: 100,
        status: 'pending',
      },
      {
        id: '2',
        title: 'Essay: Kenyan Literature Analysis',
        description: 'Write a 1500-word essay analyzing the themes in Ngugi wa Thiongo\'s "Weep Not, Child".',
        subject: 'English',
        className: 'English Literature',
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        maxScore: 100,
        status: 'graded',
        submission: {
          submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          content: 'In Ngugi wa Thiongo\'s seminal work "Weep Not, Child"...',
          score: 85,
          feedback: 'Excellent analysis of the themes. Your understanding of the colonial context is particularly strong. Consider expanding on the symbolism in the final chapter.',
        },
      },
      {
        id: '3',
        title: 'Lab Report: Organic Synthesis',
        description: 'Submit a detailed lab report on the organic synthesis experiment conducted in class.',
        subject: 'Chemistry',
        className: 'Organic Chemistry Lab',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        maxScore: 80,
        status: 'pending',
      },
      {
        id: '4',
        title: 'Physics Problem Set - Quantum Mechanics',
        description: 'Solve the quantum mechanics problems from the textbook pages 245-260.',
        subject: 'Physics',
        className: 'Quantum Physics',
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        maxScore: 90,
        status: 'overdue',
      },
      {
        id: '5',
        title: 'Research Paper: Cell Division',
        description: 'Write a research paper on the process of mitosis and meiosis, including diagrams.',
        subject: 'Biology',
        className: 'Cell Biology',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        maxScore: 100,
        status: 'submitted',
        submission: {
          submittedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
          content: 'Cell division is a fundamental process...',
        },
      },
    ];

    setTimeout(() => {
      setAssignments(mockAssignments);
      setFilteredAssignments(mockAssignments);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = assignments;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (assignment) =>
          assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          assignment.className.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter((assignment) => assignment.status === selectedStatus);
    }

    // Filter by subject
    if (selectedSubject !== 'all') {
      filtered = filtered.filter((assignment) => assignment.subject === selectedSubject);
    }

    setFilteredAssignments(filtered);
  }, [assignments, searchTerm, selectedStatus, selectedSubject]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'submitted':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'graded':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'overdue':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'submitted':
        return 'text-blue-600 bg-blue-100';
      case 'graded':
        return 'text-green-600 bg-green-100';
      case 'overdue':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const now = new Date();
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days overdue`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return `Due in ${diffDays} days`;
    }
  };

  const handleSubmitAssignment = (assignmentId: string) => {
    setAssignments(prev => prev.map(a => 
      a.id === assignmentId 
        ? { 
            ...a, 
            status: 'submitted' as const,
            submission: {
              submittedAt: new Date(),
              content: submissionContent,
            }
          }
        : a
    ));
    setShowSubmissionModal(false);
    setSubmissionContent('');
    setSelectedAssignment(null);
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Assignments</h1>
          <p className="text-gray-600">
            Manage your assignments and track your progress
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
                placeholder="Search assignments..."
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
              <option value="pending">Pending</option>
              <option value="submitted">Submitted</option>
              <option value="graded">Graded</option>
              <option value="overdue">Overdue</option>
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
              {filteredAssignments.length} assignments found
            </div>
          </div>
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => (
            <div key={assignment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(assignment.status)}
                    <h3 className="text-lg font-semibold text-gray-900">
                      {assignment.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                      {assignment.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="h-4 w-4 mr-2" />
                      <span>{assignment.subject} - {assignment.className}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{formatDate(assignment.dueDate)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className={assignment.status === 'overdue' ? 'text-red-600 font-medium' : ''}>
                        {getDaysUntilDue(assignment.dueDate)}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{assignment.description}</p>

                  {assignment.submission && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">Your Submission</h4>
                        <span className="text-sm text-gray-500">
                          Submitted {formatDateTime(assignment.submission.submittedAt)}
                        </span>
                      </div>
                      
                      {assignment.submission.score !== undefined && (
                        <div className="flex items-center space-x-4 mb-2">
                          <span className="text-lg font-bold text-green-600">
                            {assignment.submission.score}/{assignment.maxScore}
                          </span>
                          <span className="text-sm text-gray-600">
                            ({Math.round((assignment.submission.score / assignment.maxScore) * 100)}%)
                          </span>
                        </div>
                      )}
                      
                      {assignment.submission.feedback && (
                        <div className="mt-2">
                          <h5 className="font-medium text-gray-900 mb-1">Feedback:</h5>
                          <p className="text-gray-600 text-sm">{assignment.submission.feedback}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2 ml-6">
                  <span className="text-sm text-gray-500">Max Score</span>
                  <span className="text-lg font-bold text-gray-900">{assignment.maxScore}</span>
                  
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => setSelectedAssignment(assignment)}
                      className="btn btn-outline flex items-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                    
                    {(assignment.status === 'pending' || assignment.status === 'overdue') && (
                      <button
                        onClick={() => {
                          setSelectedAssignment(assignment);
                          setShowSubmissionModal(true);
                        }}
                        className="btn btn-primary flex items-center space-x-1"
                      >
                        <Upload className="h-4 w-4" />
                        <span>Submit</span>
                      </button>
                    )}
                    
                    {assignment.status === 'submitted' && (
                      <button
                        onClick={() => {
                          setSelectedAssignment(assignment);
                          setSubmissionContent(assignment.submission?.content || '');
                          setShowSubmissionModal(true);
                        }}
                        className="btn btn-secondary flex items-center space-x-1"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAssignments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters to find more assignments.
            </p>
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
          </div>
        )}

        {/* Submission Modal */}
        {showSubmissionModal && selectedAssignment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Submit Assignment: {selectedAssignment.title}
                </h2>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assignment Content
                  </label>
                  <textarea
                    value={submissionContent}
                    onChange={(e) => setSubmissionContent(e.target.value)}
                    rows={10}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your assignment content here..."
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attach File (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, DOCX up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowSubmissionModal(false);
                    setSubmissionContent('');
                    setSelectedAssignment(null);
                  }}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSubmitAssignment(selectedAssignment.id)}
                  disabled={!submissionContent.trim()}
                  className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Assignment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentsPage;