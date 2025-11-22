import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Sayfalar
import LandingPage from './modules/landing/LandingPage';
import LoginPage from './modules/auth/LoginPage';
import StudentDashboard from './modules/student/Dashboard';
import SchoolDashboard from './modules/school/Dashboard';
import SchoolRegisterPage from './modules/auth/SchoolRegisterPage';

// Korumalı Rota Bileşeni
function ProtectedRoute({ children, allowedRoles }) {
  const { user, role } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(role)) {
    // Yetkisiz giriş denemesi
    return <Navigate to="/" />; 
  }
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Herkese Açık */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* 🎒 Öğrenci Alanı */}
          <Route 
            path="/student/*" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />

          {/* 🏫 Okul/PDR Alanı */}
          <Route 
            path="/school/*" 
            element={
              <ProtectedRoute allowedRoles={['pdr', 'admin']}>
                <SchoolDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
