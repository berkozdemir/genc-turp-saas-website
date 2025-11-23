import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DemoProvider } from './contexts/DemoContext';

// Sayfaları İçe Aktar
import LandingPage from './modules/landing/LandingPage';
import LoginPage from './modules/auth/LoginPage';
import SchoolRegisterPage from './modules/auth/SchoolRegisterPage';
import StudentDashboard from './modules/student/Dashboard';
import Marketplace from './modules/student/Marketplace';
import SchoolDashboard from './modules/school/AnalyticsView';
import ParentDashboard from './modules/parent/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <DemoProvider>
        <Routes>
          {/* Ana Sayfa (Senin tasarımın burada çalışacak) */}
          <Route path="/" element={<LandingPage />} />

          {/* Diğer Sayfalar */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/school-register" element={<SchoolRegisterPage />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/marketplace" element={<Marketplace />} />
          <Route path="/school/dashboard" element={<SchoolDashboard />} />
          <Route path="/parent/dashboard" element={<ParentDashboard />} />
        </Routes>
      </DemoProvider>
    </BrowserRouter>
  );
}
