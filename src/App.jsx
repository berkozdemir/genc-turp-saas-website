// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { 
  Sprout, ChevronDown, Globe, Lock, Headphones, 
  LayoutDashboard, ShoppingBag, Shield, Users, 
  ArrowRight, BarChart3, PlayCircle, CheckCircle 
} from 'lucide-react';

// --- SAHTE VERİLER & MODÜLLER (Mock Imports) ---
// Gerçek projede bunları ayrı dosyalardan import edeceğiz.
import StudentDashboard from './modules/student/Dashboard';
import SchoolDashboard from './modules/school/AnalyticsView';
import Marketplace from './modules/student/Marketplace';
import ParentDashboard from './modules/parent/Dashboard';
import LoginPage from './modules/auth/LoginPage';

// --- LANDING PAGE BİLEŞENİ (İçerik Genişletildi) ---
const LandingView = ({ setView }) => {
  const [activeFeature, setActiveFeature] = useState('student');

  return (
    <div className="animate-in fade-in duration-500">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Arkaplan Efektleri */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-green-300/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-teal-300/30 rounded-full blur-3xl -z-10 animate-pulse delay-1000"></div>

        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 px-4 py-1.5 rounded-full text-xs font-bold mb-8 shadow-sm hover:scale-105 transition-transform cursor-default">
           <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
           v2.0 Yayında: Spotify Entegrasyonu
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
          Zihinsel Sağlık Artık <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">
            Ölçülebilir ve Eğlenceli.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Öğrenciler için gizli bir sığınak, okullar için yapay zeka destekli erken uyarı sistemi.
          Zorbalığı ve stresi kriz olmadan yakalayın.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={() => setView('school-dashboard')} className="group bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-slate-800 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
            Okul Yönetimi <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
          </button>
          <button onClick={() => setView('student-dashboard')} className="group bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
            <PlayCircle size={18} className="text-green-600"/> Demo Dene
          </button>
        </div>

        {/* Dashboard Preview Image */}
        <div className="mt-16 relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" 
              alt="Dashboard" 
              className="rounded-2xl shadow-2xl border border-slate-200 opacity-90"
            />
        </div>
      </section>

      {/* FEATURES TABS */}
      <section className="py-24 bg-white max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">İki Farklı Dünya, Tek Platform</h2>
          <div className="inline-flex bg-slate-100 p-1.5 rounded-full">
            <button 
              onClick={() => setActiveFeature('student')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeFeature === 'student' ? 'bg-white shadow text-green-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              🎒 Öğrenci Perspektifi
            </button>
            <button 
              onClick={() => setActiveFeature('school')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeFeature === 'school' ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              🏫 Okul Yönetimi Perspektifi
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
           {activeFeature === 'student' ? (
             <div className="space-y-8 animate-in slide-in-from-left duration-500">
                <FeatureItem 
                  icon={<Headphones className="text-green-600"/>}
                  title="Müzik Terapisi & Spotify"
                  desc="Ruh haline göre otomatik playlistler. Üstelik anlaşmalı okullarda Premium hediye."
                />
                <FeatureItem 
                  icon={<ShoppingBag className="text-green-600"/>}
                  title="Turp Bazaar & Ödüller"
                  desc="Anketleri çözdükçe puan kazan, sinema bileti ve kahve ödüllerini kap."
                />
                <FeatureItem 
                  icon={<Lock className="text-green-600"/>}
                  title="%100 Gizlilik"
                  desc="Yazdıklarını ailen veya arkadaşların göremez. PDR sadece yüksek riskte devreye girer."
                />
             </div>
           ) : (
             <div className="space-y-8 animate-in slide-in-from-right duration-500">
                <FeatureItem 
                  icon={<BarChart3 className="text-blue-600"/>}
                  title="Erken Uyarı Paneli"
                  desc="Okulun stres haritasını çıkarın. Zorbalık ve depresyonu kriz olmadan tespit edin."
                />
                <FeatureItem 
                  icon={<Users className="text-blue-600"/>}
                  title="PDR Verimliliği"
                  desc="Tüm okulu taramak yerine, sadece riskli öğrencilere odaklanın. Veriye dayalı rehberlik."
                />
                <FeatureItem 
                  icon={<Shield className="text-blue-600"/>}
                  title="Yasal Uyum & Güvenlik"
                  desc="KVKK uyumlu altyapı, veli onay mekanizmaları ve şifreli veri saklama."
                />
             </div>
           )}
           
           <div className={`rounded-3xl p-8 h-96 flex items-center justify-center shadow-xl relative overflow-hidden ${activeFeature === 'student' ? 'bg-green-50' : 'bg-blue-50'}`}>
              {/* Mockup Image Area */}
              <img 
                src={activeFeature === 'student' 
                  ? "https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&w=800&q=80" 
                  : "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80"
                } 
                className="rounded-xl shadow-lg max-w-full max-h-full object-cover hover:scale-105 transition-transform duration-700"
              />
           </div>
        </div>
      </section>

      {/* SPOTIFY DARK SECTION */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 relative z-10">
           <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                 <div className="bg-green-500 text-black text-xs font-black px-2 py-1 rounded uppercase">Partner</div>
                 <Headphones className="text-green-500"/>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                "Bugün modun düşük mü? <br/>
                <span className="text-green-500">Seni anlayan şarkı burada."</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                Genç Turp yapay zekası, duygularını analiz eder ve Spotify kütüphanesinden seni iyileştirecek frekansı bulur.
              </p>
              <button onClick={() => setView('student-dashboard')} className="bg-green-500 text-black px-8 py-3 rounded-full font-bold hover:bg-green-400 transition shadow-lg shadow-green-500/20 flex items-center gap-2">
                Demo: Modunu Seç & Dinle <ArrowRight size={18}/>
              </button>
           </div>
           <div className="flex-1 flex justify-center">
              <div className="w-72 h-[500px] border-8 border-slate-800 bg-black rounded-[3rem] shadow-2xl relative overflow-hidden">
                 {/* Phone Screen Simulation */}
                 <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mb-6 animate-pulse"></div>
                    <h4 className="text-white font-bold text-xl mb-2">Odaklanma Modu</h4>
                    <p className="text-gray-400 text-sm">Deep Focus Playlist</p>
                    <div className="mt-8 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                       <div className="w-2/3 h-full bg-green-500"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

// --- YARDIMCI BİLEŞEN: FEATURE ITEM ---
const FeatureItem = ({ icon, title, desc }) => (
  <div className="flex gap-4 items-start p-4 rounded-2xl hover:bg-slate-50 transition-colors group cursor-default">
    <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 text-slate-900 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-slate-900 text-lg mb-1">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);


// === ANA APP BİLEŞENİ ===
export default function App() {
  // --- STATE YÖNETİMİ ---
  const [view, setView] = useState('home'); // 'home', 'student-dashboard', 'school-dashboard', 'marketplace', 'login'
  const [isScrolled, setIsScrolled] = useState(false);
  const [session, setSession] = useState(false); // Demo amaçlı false

  // --- EFFECTLER ---
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- ROUTER MANTIĞI (Basitleştirilmiş) ---
  const renderView = () => {
    switch (view) {
      case 'home': return <LandingView setView={setView} />;
      case 'student-dashboard': return <StudentDashboard />;
      case 'school-dashboard': return <SchoolDashboard />;
      case 'marketplace': return <Marketplace />;
      case 'parent-dashboard': return <ParentDashboard />;
      case 'login': return <LoginPage />;
      default: return <LandingView setView={setView} />;
    }
  };

  return (
    <div className="font-sans text-slate-900 bg-slate-50 min-h-screen flex flex-col selection:bg-green-200 selection:text-green-900">
      
      {/* --- NAVBAR --- */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => setView('home')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-600/20 group-hover:rotate-6 transition-transform">
              <Sprout size={22} className="text-green-50" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Genç Turp</span>
          </div>

          {/* Menü Linkleri */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center bg-white/80 backdrop-blur border border-slate-200 p-1.5 rounded-full shadow-sm">
              
              <button onClick={() => setView('home')} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${view === 'home' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
                Ana Sayfa
              </button>

              {/* Modüller Dropdown Simülasyonu */}
              <div className="relative group">
                <button className="px-5 py-2 rounded-full text-sm font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-1">
                   Modüller <ChevronDown size={14}/>
                </button>
                {/* Dropdown Content */}
                <div className="absolute top-full right-0 mt-2 w-56 hidden group-hover:block pt-2 animate-in fade-in slide-in-from-top-2">
                   <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden p-1">
                      <button onClick={() => setView('student-dashboard')} className="w-full text-left px-4 py-3 text-sm font-medium text-slate-600 hover:bg-green-50 hover:text-green-700 rounded-xl flex items-center gap-2 transition-colors">
                         <Headphones size={16}/> Öğrenci Paneli
                      </button>
                      <button onClick={() => setView('school-dashboard')} className="w-full text-left px-4 py-3 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl flex items-center gap-2 transition-colors">
                         <LayoutDashboard size={16}/> PDR Paneli
                      </button>
                      <button onClick={() => setView('parent-dashboard')} className="w-full text-left px-4 py-3 text-sm font-medium text-slate-600 hover:bg-purple-50 hover:text-purple-700 rounded-xl flex items-center gap-2 transition-colors">
                         <Users size={16}/> Veli Paneli
                      </button>
                      <button onClick={() => setView('marketplace')} className="w-full text-left px-4 py-3 text-sm font-medium text-slate-600 hover:bg-orange-50 hover:text-orange-700 rounded-xl flex items-center gap-2 transition-colors">
                         <ShoppingBag size={16}/> Turp Bazaar
                      </button>
                   </div>
                </div>
              </div>

              <button onClick={() => setView('login')} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${view === 'login' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
                Giriş Yap
              </button>
            </div>

            {/* Dil Seçeneği */}
            <div className="flex items-center gap-1 bg-white/80 backdrop-blur border border-slate-200 p-1.5 rounded-full shadow-sm">
               <button className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs hover:bg-green-200 transition">
                  TR
               </button>
               <button className="w-8 h-8 rounded-full text-slate-400 flex items-center justify-center font-bold text-xs hover:bg-slate-100 transition">
                  EN
               </button>
            </div>
          </div>

          {/* Mobile Menu Icon (Placeholder) */}
          <button className="md:hidden text-slate-900">
             <div className="space-y-1.5">
                <div className="w-6 h-0.5 bg-slate-900"></div>
                <div className="w-6 h-0.5 bg-slate-900"></div>
                <div className="w-6 h-0.5 bg-slate-900"></div>
             </div>
          </button>

        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 relative">
        {renderView()}
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 opacity-75 hover:opacity-100 transition-opacity">
               <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                  <Sprout size={18}/>
               </div>
               <span className="font-bold text-slate-700">Genç Turp © 2025</span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-slate-500">
               <a href="#" className="hover:text-green-600 transition">Gizlilik</a>
               <a href="#" className="hover:text-green-600 transition">Kullanım Şartları</a>
               <a href="#" className="hover:text-green-600 transition">Okul Başvurusu</a>
               <a href="#" className="hover:text-green-600 transition">İletişim</a>
            </div>
         </div>
      </footer>

    </div>
  );
}
