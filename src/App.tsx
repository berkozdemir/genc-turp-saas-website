import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './modules/landing/LandingPage';

// Not: Diğer sayfaların kodlarını (Dashboard vb.) henüz dosyaya dökmediysen
// hata vermemesi için şimdilik sadece Landing Page'i aktif ediyoruz.
// Diğerlerini oluşturdukça buraya eklersin.

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Diğer rotaları dosyaları oluşturdukça açacağız */}
      </Routes>
    </BrowserRouter>
  );
}
