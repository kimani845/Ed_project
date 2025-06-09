import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { VideoProvider } from './contexts/VideoContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import StudentDashboard from './pages/student/StudentDashboard';
import TutorDashboard from './pages/tutor/TutorDashboard';
import ClassesPage from './pages/student/ClassesPage';
import AssignmentsPage from './pages/student/AssignmentsPage';
import ExamsPage from './pages/student/ExamsPage';
import ProgressPage from './pages/student/ProgressPage';
import TutorClassesPage from './pages/tutor/TutorClassesPage';
import TutorStudentsPage from './pages/tutor/TutorStudentsPage';
import VideoConferencePage from './pages/VideoConferencePage';
import SubscriptionPage from './pages/SubscriptionPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <VideoProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/subscription" element={<SubscriptionPage />} />
                
                {/* Student Routes */}
                <Route path="/student" element={
                  <ProtectedRoute requiredRole="student">
                    <StudentDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/student/classes" element={
                  <ProtectedRoute requiredRole="student">
                    <ClassesPage />
                  </ProtectedRoute>
                } />
                <Route path="/student/assignments" element={
                  <ProtectedRoute requiredRole="student">
                    <AssignmentsPage />
                  </ProtectedRoute>
                } />
                <Route path="/student/exams" element={
                  <ProtectedRoute requiredRole="student">
                    <ExamsPage />
                  </ProtectedRoute>
                } />
                <Route path="/student/progress" element={
                  <ProtectedRoute requiredRole="student">
                    <ProgressPage />
                  </ProtectedRoute>
                } />
                
                {/* Tutor Routes */}
                <Route path="/tutor" element={
                  <ProtectedRoute requiredRole="tutor">
                    <TutorDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/tutor/classes" element={
                  <ProtectedRoute requiredRole="tutor">
                    <TutorClassesPage />
                  </ProtectedRoute>
                } />
                <Route path="/tutor/students" element={
                  <ProtectedRoute requiredRole="tutor">
                    <TutorStudentsPage />
                  </ProtectedRoute>
                } />
                
                {/* Video Conference */}
                <Route path="/class/:classId/video" element={
                  <ProtectedRoute>
                    <VideoConferencePage />
                  </ProtectedRoute>
                } />
                
                {/* Fallback */}
                <Route path="*" element={<Navigate to="/\" replace />} />
              </Routes>
            </main>
            <Footer />
            <Toaster position="top-right" />
          </div>
        </Router>
      </VideoProvider>
    </AuthProvider>
  );
}

export default App;