import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './contexts/AuthContext';

// Layout Components
import Navbar from './components/layout/Navbar';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

// Main Pages
import DashboardPage from './pages/main/DashboardPage';

// Network Pages
import AIMatching from './pages/network/AIMatching';
import CampusNetworkPage from './pages/network/CampusNetworkPage';
import OpportunitiesPage from './pages/opportunities/OpportunitiesPage';

// Workspace Pages
import WorkspacePage from './pages/workspace/WorkspacePage';
import FileManagement from './pages/workspace/FileManagement';
import GitWorkspace from './pages/workspace/GitWorkspace';
import TaskManagement from './pages/workspace/TaskManagement';
import TeamChat from './pages/workspace/TeamChat';
import VideoCall from './pages/workspace/VideoCall';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

// Layout Component
const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
    <Navbar />
    <main>{children}</main>
  </div>
);

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Main Routes */}
        <Route path="/" element={
          <MainLayout>
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          </MainLayout>
        } />

        {/* Protected Network Routes */}
        <Route path="/ai-matching" element={
          <MainLayout>
            <ProtectedRoute>
              <AIMatching />
            </ProtectedRoute>
          </MainLayout>
        } />
        <Route path="/campus-network" element={
          <MainLayout>
            <ProtectedRoute>
              <CampusNetworkPage />
            </ProtectedRoute>
          </MainLayout>
        } />
        <Route path="/opportunities" element={
          <MainLayout>
            <ProtectedRoute>
              <OpportunitiesPage />
            </ProtectedRoute>
          </MainLayout>
        } />

        {/* Protected Workspace Routes */}
        <Route path="/workspace" element={
          <MainLayout>
            <ProtectedRoute>
              <WorkspacePage />
            </ProtectedRoute>
          </MainLayout>
        } />
        <Route path="/workspace/files" element={
          <MainLayout>
            <ProtectedRoute>
              <FileManagement />
            </ProtectedRoute>
          </MainLayout>
        } />
        <Route path="/workspace/git" element={
          <MainLayout>
            <ProtectedRoute>
              <GitWorkspace />
            </ProtectedRoute>
          </MainLayout>
        } />
        <Route path="/workspace/tasks" element={
          <MainLayout>
            <ProtectedRoute>
              <TaskManagement />
            </ProtectedRoute>
          </MainLayout>
        } />
        <Route path="/workspace/chat" element={
          <MainLayout>
            <ProtectedRoute>
              <TeamChat />
            </ProtectedRoute>
          </MainLayout>
        } />
        <Route path="/workspace/video-call" element={
          <MainLayout>
            <ProtectedRoute>
              <VideoCall />
            </ProtectedRoute>
          </MainLayout>
        } />

        {/* Catch-all route for 404 */}
        <Route path="*" element={
          <Navigate to="/" replace />
        } />
      </Routes>
    </AuthProvider>
  );
};

export default App;