import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, School, Lock, ArrowRight, CheckCircle2, Mail, Users, Heart } from 'lucide-react'; // Users ve Heart eklendi

export default function LoginPage() {
  const navigate = useNavigate();
  // Rol tiplerine 'parent' eklendi
  const [activeTab, setActiveTab] = useState<'student' | 'school' | 'parent'>('student');
  const [isLoading, setIsLoading] = useState(false);
  
  // E-posta adresini aktif role göre ayarlama fonksiyonu
  const getInitialEmail = (tab) => {
    if (tab === 'student') return 'efe@okul.com';
    if (tab === 'school') return 'mudur@okul.com';
    if (tab === 'parent') return 'veli@okul.com';
    return '';
  };
  
  const [email, setEmail] = useState(getInitialEmail(activeTab));
  const [password, setPassword] = useState('123456');

  // Demo Giriş Fonksiyonu
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (activeTab === 'student') {
        navigate('/student/dashboard');
      } else if (activeTab === 'school') {
        navigate('/school/dashboard');
      } else if (activeTab === 'parent') { // Veli yönlendirmesi
        navigate('/parent/dashboard');
      }
    }, 1500);
  };

  // Aktif role göre buton renklerini belirleme
  const getButtonClass = () => {
    if (activeTab === 'student') {
      return 'bg-slate-900 hover:bg-black shadow-slate-900/20';
    }
    if (activeTab === 'school') {
      return 'bg-red-600 hover:bg-red-700 shadow-red-900/20'; // Okul için kırmızı (Risk vurgusu)
    }
    if (activeTab === 'parent') {
      return 'bg-blue-600 hover:bg-blue-700 shadow-blue-900/20'; // Veli için mavi (Güven vurgusu)
    }
    return 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-white flex font-sans">
      
      {/* --- SOL TARAF (GÖRSEL & VİZYON) --- */}
      <div className="hidden lg:flex w-1/2 bg-black relative overflow-hidden items-center justify-center p-12">
        {/* Arka Plan Dokusu */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        
        {/* Aurora Efekti */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-green-500 to-blue-600 rounded-full blur-[120px] opacity-40 animate-pulse"></div>

        <div className="relative z-10 text-white max-w-lg">
          <div className="w-16 h-16 bg-white text-black rounded-2xl flex items-center justify-center font-bold text-3xl mb-8 shadow-2xl">G</div>
          
          <h1 className="text-5xl font-bold mb-6 leading-tight tracking-tight">
            Geleceğin <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              Mental Sağlık
            </span> <br/> 
            Ekosistemi.
          </h1>
          
          <div className="space-y-5 text-gray-400 mb-12">
            <FeatureItem text="Yapay Zeka Destekli Risk Analizi" />
            <FeatureItem text="Spotify Entegrasyonu ile Müzik Terapisi" />
            <FeatureItem text="Anonim Akran Desteği & PDR Bildirimleri" />
          </div>

          {/* Kullanıcı Görüşü (Social Proof) */}
          <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/15 transition duration-300">
             <p className="italic text-lg text-gray-300 leading-relaxed">"Okuldaki en güvendiğim alan burası oldu. Kimse yargılamıyor, sadece dinliyor."</p>
             <div className="flex items-center gap-4 mt-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-bold text-white">Efe K.</p>
                  <p className="text-xs text-gray-400">10. Sınıf Öğrencisi</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* --- SAĞ TARAF (GİRİŞ FORMU) --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-20 relative bg-white">
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-black transition font-bold text-sm group">
           <ArrowLeft size={16} className="group-hover:-translate-x-1 transition" /> Ana Sayfaya Dön
        </Link>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Tekrar Hoş Geldin 👋</h2>
            <p className="text-gray-500">Hesabına giriş yap ve kaldığın yerden devam et.</p>
          </div>

          {/* TAB SWITCHER (Rol Seçimi) */}
          <div className="bg-gray-100 p-1.5 rounded-2xl flex mb-8">
            <button 
              onClick={() => { setActiveTab('student'); setEmail(getInitialEmail('student')); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'student' ? 'bg-white shadow-md text-slate-900 scale-[1.02]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <User size={18} /> Öğrenci
            </button>
            <button 
              onClick={() => { setActiveTab('school'); setEmail(getInitialEmail('school')); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'school' ? 'bg-white shadow-md text-slate-900 scale-[1.02]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <School size={18} /> Okul / PDR
            </button>
            <button 
              onClick={() => { setActiveTab('parent'); setEmail(getInitialEmail('parent')); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'parent' ? 'bg-white shadow-md text-slate-900 scale-[1.02]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Heart size={18} /> Veli
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">E-Posta</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-slate-900 transition" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition font-medium text-slate-900"
                  placeholder="ornek@okul.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Şifre</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-slate-900 transition" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition font-medium text-slate-900"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] shadow-xl hover:shadow-2xl ${getButtonClass()}`}
            >
              {isLoading ? (
                <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>Giriş Yap <ArrowRight size={20} /></>
              )}
            </button>
          </form>

          {/* ALT LİNKLER */}
          <div className="mt-8 text-center space-y-6">
            <p className="text-sm text-gray-500">
              Hesabın yok mu?{' '}
              <Link to="/school-register" className="text-slate-900 font-bold hover:underline">
                Kayıt Ol
              </Link>
            </p>
            
            {/* DEMO BİLGİLENDİRME */}
            <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl flex items-start gap-3 text-left">
              <div className="bg-yellow-100 p-1.5 rounded-full text-yellow-700 mt-0.5">
                <CheckCircle2 size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-yellow-800 mb-1">Demo Modu Aktif</p>
                <p className="text-xs text-yellow-700 leading-relaxed">
                  "Giriş Yap" butonuna basarak seçili role ait paneli inceleyebilirsiniz.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Özellik Listesi Bileşeni
function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 group">
      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500 transition duration-300">
        <CheckCircle2 className="text-green-400 group-hover:text-white transition duration-300" size={14} />
      </div>
      <span className="font-medium group-hover:text-white transition duration-300">{text}</span>
    </div>
  );
}