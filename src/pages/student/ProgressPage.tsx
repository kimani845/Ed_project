import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Award, 
  Target, 
  Calendar,
  BookOpen,
  Clock,
  Star,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

interface ProgressData {
  overallGrade: number;
  totalClasses: number;
  completedAssignments: number;
  totalAssignments: number;
  examScores: ExamScore[];
  subjectProgress: SubjectProgress[];
  weeklyActivity: WeeklyActivity[];
  achievements: Achievement[];
  studyStreak: number;
  totalStudyHours: number;
}

interface ExamScore {
  id: string;
  title: string;
  subject: string;
  score: number;
  maxScore: number;
  date: Date;
}

interface SubjectProgress {
  subject: string;
  averageGrade: number;
  classesAttended: number;
  totalClasses: number;
  assignmentsCompleted: number;
  totalAssignments: number;
  color: string;
}

interface WeeklyActivity {
  week: string;
  classesAttended: number;
  assignmentsCompleted: number;
  studyHours: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: Date;
  category: 'academic' | 'participation' | 'streak' | 'improvement';
}

const ProgressPage = () => {
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'semester'>('month');

  useEffect(() => {
    // Simulate loading progress data
    const mockProgressData: ProgressData = {
      overallGrade: 87.5,
      totalClasses: 24,
      completedAssignments: 18,
      totalAssignments: 20,
      examScores: [
        {
          id: '1',
          title: 'Calculus Midterm',
          subject: 'Mathematics',
          score: 85,
          maxScore: 100,
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
        {
          id: '2',
          title: 'Literature Quiz',
          subject: 'English',
          score: 42,
          maxScore: 50,
          date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        },
        {
          id: '3',
          title: 'Chemistry Lab',
          subject: 'Chemistry',
          score: 68,
          maxScore: 75,
          date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
        },
      ],
      subjectProgress: [
        {
          subject: 'Mathematics',
          averageGrade: 88,
          classesAttended: 8,
          totalClasses: 8,
          assignmentsCompleted: 6,
          totalAssignments: 6,
          color: 'bg-blue-500',
        },
        {
          subject: 'English',
          averageGrade: 85,
          classesAttended: 6,
          totalClasses: 6,
          assignmentsCompleted: 5,
          totalAssignments: 6,
          color: 'bg-green-500',
        },
        {
          subject: 'Chemistry',
          averageGrade: 90,
          classesAttended: 5,
          totalClasses: 5,
          assignmentsCompleted: 4,
          totalAssignments: 4,
          color: 'bg-purple-500',
        },
        {
          subject: 'Physics',
          averageGrade: 82,
          classesAttended: 3,
          totalClasses: 3,
          assignmentsCompleted: 2,
          totalAssignments: 3,
          color: 'bg-orange-500',
        },
        {
          subject: 'Biology',
          averageGrade: 92,
          classesAttended: 2,
          totalClasses: 2,
          assignmentsCompleted: 1,
          totalAssignments: 1,
          color: 'bg-red-500',
        },
      ],
      weeklyActivity: [
        { week: 'Week 1', classesAttended: 6, assignmentsCompleted: 4, studyHours: 12 },
        { week: 'Week 2', classesAttended: 5, assignmentsCompleted: 3, studyHours: 10 },
        { week: 'Week 3', classesAttended: 7, assignmentsCompleted: 5, studyHours: 15 },
        { week: 'Week 4', classesAttended: 6, assignmentsCompleted: 6, studyHours: 14 },
      ],
      achievements: [
        {
          id: '1',
          title: 'Perfect Attendance',
          description: 'Attended all classes for 2 weeks straight',
          icon: '🎯',
          earnedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          category: 'participation',
        },
        {
          id: '2',
          title: 'Top Performer',
          description: 'Scored above 90% in Chemistry',
          icon: '🏆',
          earnedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          category: 'academic',
        },
        {
          id: '3',
          title: 'Study Streak',
          description: '7 days of consistent study',
          icon: '🔥',
          earnedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          category: 'streak',
        },
      ],
      studyStreak: 7,
      totalStudyHours: 51,
    };

    setTimeout(() => {
      setProgressData(mockProgressData);
      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeLetter = (grade: number) => {
    if (grade >= 90) return 'A';
    if (grade >= 80) return 'B';
    if (grade >= 70) return 'C';
    if (grade >= 60) return 'D';
    return 'F';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-40 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!progressData) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Progress</h1>
          <p className="text-gray-600">
            Track your academic journey and achievements
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Overall Grade</p>
                <div className="flex items-center space-x-2">
                  <p className={`text-2xl font-bold ${getGradeColor(progressData.overallGrade)}`}>
                    {progressData.overallGrade}%
                  </p>
                  <span className={`text-lg font-medium ${getGradeColor(progressData.overallGrade)}`}>
                    ({getGradeLetter(progressData.overallGrade)})
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-success-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-success-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Classes Attended</p>
                <p className="text-2xl font-bold text-gray-900">{progressData.totalClasses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-warning-100 rounded-lg">
                <Target className="h-6 w-6 text-warning-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Assignments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {progressData.completedAssignments}/{progressData.totalAssignments}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-secondary-100 rounded-lg">
                <Clock className="h-6 w-6 text-secondary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Study Hours</p>
                <p className="text-2xl font-bold text-gray-900">{progressData.totalStudyHours}h</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Subject Progress */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Subject Progress</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {progressData.subjectProgress.map((subject, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{subject.subject}</span>
                      <span className={`font-bold ${getGradeColor(subject.averageGrade)}`}>
                        {subject.averageGrade}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${subject.color}`}
                        style={{ width: `${subject.averageGrade}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Classes: {subject.classesAttended}/{subject.totalClasses}</span>
                      <span>Assignments: {subject.assignmentsCompleted}/{subject.totalAssignments}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Exam Scores */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Exam Scores</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {progressData.examScores.map((exam) => (
                  <div key={exam.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{exam.title}</h3>
                      <p className="text-sm text-gray-600">{exam.subject}</p>
                      <p className="text-xs text-gray-500">{formatDate(exam.date)}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getGradeColor((exam.score / exam.maxScore) * 100)}`}>
                        {exam.score}/{exam.maxScore}
                      </div>
                      <div className={`text-sm ${getGradeColor((exam.score / exam.maxScore) * 100)}`}>
                        {Math.round((exam.score / exam.maxScore) * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Weekly Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {progressData.weeklyActivity.map((week, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{week.week}</span>
                      <span className="text-sm text-gray-600">{week.studyHours}h studied</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span>{week.classesAttended} classes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-green-500" />
                        <span>{week.assignmentsCompleted} assignments</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Achievements</h2>
                <div className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-orange-500" />
                  <span className="text-sm font-medium text-gray-600">
                    {progressData.studyStreak} day streak
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {progressData.achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500">{formatDate(achievement.earnedAt)}</p>
                    </div>
                    <Award className="h-5 w-5 text-yellow-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Study Goals */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Study Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <Target className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Weekly Goal</h3>
              <p className="text-sm text-gray-600">Complete 5 assignments</p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">4/5 completed</p>
              </div>
            </div>

            <div className="text-center p-4 bg-success-50 rounded-lg">
              <Clock className="h-8 w-8 text-success-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Study Time</h3>
              <p className="text-sm text-gray-600">15 hours this week</p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-success-600 h-2 rounded-full" style={{ width: '93%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">14/15 hours</p>
              </div>
            </div>

            <div className="text-center p-4 bg-warning-50 rounded-lg">
              <Star className="h-8 w-8 text-warning-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Grade Goal</h3>
              <p className="text-sm text-gray-600">Maintain 85% average</p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-warning-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">87.5% achieved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;