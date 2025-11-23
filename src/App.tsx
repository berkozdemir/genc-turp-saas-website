import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DemoProvider } from './contexts/DemoContext';

// --- MEVCUT SAYFALAR ---
import LandingPage from './modules/landing/LandingPage';
import LoginPage from './modules/auth/LoginPage';
import SchoolRegisterPage from './modules/auth/SchoolRegisterPage';
import RiskCalculator from './modules/landing/RiskCalculator';
import StudentDashboard from './modules/student/Dashboard';
import Marketplace from './modules/student/Marketplace';
import SchoolDashboard from './modules/school/Dashboard';
import ParentDashboard from './modules/parent/Dashboard';
import PeerSupport from './modules/student/PeerSupport'; // <--- YENİ: Import Ettik
import ParentAcademy from './modules/parent/ParentAcademy';

// --- GELECEK SAYFALAR (Placeholder) ---
const Placeholder = ({ title }: { title: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
    <div className="text-center p-10 border-4 border-dashed border-slate-200 rounded-[3rem]">
      <div className="text-6xl mb-4">🚧</div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
      <p className="text-slate-400">Bu modül şu an geliştirme aşamasında.</p>
    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <DemoProvider>
        <Routes>
          {/* --- PUBLIC (HERKES) --- */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/school-risk-simulator" element={<RiskCalculator />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/school-register" element={<SchoolRegisterPage />} />

          {/* --- ÖĞRENCİ ROTALARI --- */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/marketplace" element={<Marketplace />} />
          <Route path="/student/peers" element={<PeerSupport />} /> {/* <--- YENİ: Rota Tanımladık */}
          <Route path="/student/journal" element={<Placeholder title="Günlük Geçmişi" />} />
          <Route path="/student/chill-zone" element={<Placeholder title="Chill Zone (Müzik & Nefes)" />} />
          <Route path="/student/profile" element={<Placeholder title="Profil & Avatar" />} />
          <Route path="/student/settings" element={<Placeholder title="Ayarlar" />} />

          {/* --- OKUL / PDR ROTALARI --- */}
          <Route path="/school/dashboard" element={<SchoolDashboard />} />
          <Route path="/school/students" element={<Placeholder title="Öğrenci Listesi & Risk Takibi" />} />
          <Route path="/school/reports" element={<Placeholder title="Detaylı Raporlar" />} />
          <Route path="/school/settings" element={<Placeholder title="Okul Ayarları" />} />

          {/* --- VELİ ROTALARI --- */}
          // Veli Rotaları
          <Route path="/parent/dashboard" element={<ParentDashboard />} />
          {/* Placeholder'ı gerçek bileşenle değiştiriyoruz: */}
          <Route path="/parent/academy" element={<ParentAcademy />} /> 
          <Route path="/parent/settings" element={<Placeholder title="Veli Ayarları" />} />
          // ...        </Routes>
      </DemoProvider>
    </BrowserRouter>
  );
}