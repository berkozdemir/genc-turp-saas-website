// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { 
  Sprout, ChevronDown, ArrowRight, Play, 
  Headphones, BarChart3, ShieldCheck, Sparkles 
} from 'lucide-react';

// --- ALT BİLEŞENLER (Tasarım Dili Güncellendi) ---

// 1. Feature Kartı: Minimalist ve Glow Efektli
const FeatureCard = ({ icon, title, desc, delay }) => (
  <div 
    className={`p-6 rounded-3xl bg-white border border-slate-100 hover:border-green-200 hover:shadow-xl hover:shadow-green-500/5 transition-all duration-300 group animate-fade-in-up`}
    style={{ animationDelay: delay }}
  >
    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 text-slate-900 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

// 2. Navbar Butonu: Hap şeklinde, yumuşak
const NavButton = ({ active, onClick, children }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      active 
        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
    }`}
  >
    {children}
  </button>
);

// --- ANA UYGULAMA ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('student');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-green-200 selection:text-green-900 overflow-x-hidden font-sans">
      
      {/* --- NAVBAR (Glass Effect) --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'py-3 glass shadow-sm' : 'py-6 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-green-500 rounded-xl rotate-3 group-hover:rotate-12 transition-transform duration-300 opacity-20"></div>
              <div className="absolute inset-0 bg-green-600 rounded-xl -rotate-3 group-hover:-rotate-6 transition-transform duration-300 shadow-lg shadow-green-500/30 flex items-center justify-center text-white">
                <Sprout size={20} />
              </div>
            </div>
            <span className="text-lg font-bold tracking-tighter text-slate-900">Genç Turp</span>
          </div>

          {/* Menü */}
          <div className="hidden md:flex items-center gap-2 bg-white/60 backdrop-blur-sm p-1.5 rounded-full border border-white/50 shadow-sm">
            <NavButton active={true} onClick={() => {}}>Ana Sayfa</NavButton>
            <NavButton active={false} onClick={() => {}}>
              <span className="flex items-center gap-1">Modüller <ChevronDown size={14} /></span>
            </NavButton>
            <NavButton active={false} onClick={() => {}}>İletişim</NavButton>
          </div>

          {/* Sağ Butonlar */}
          <div className="flex items-center gap-3">
            <button className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-4">Giriş Yap</button>
            <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 hover:scale-105 transition-all shadow-xl shadow-slate-900/20">
              Demo Başlat
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="pt-40 pb-20 px-6 relative">
        
        {/* Arka Plan Blob Efektleri (Lovable Havası İçin Kritik) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-gradient-to-r from-green-200 via-teal-200 to-purple-200 rounded-full blur-3xl opacity-30 animate-blob -z-10 mix-blend-multiply"></div>
        <div className="absolute top-40 right-0 w-72 h-72 bg-yellow-200 rounded-full blur-3xl opacity-30 animate-blob animation-delay-2000 -z-10 mix-blend-multiply"></div>
        <div className="absolute top-40 left-0 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-30 animate-blob animation-delay-4000 -z-10 mix-blend-multiply"></div>

        <div className="max-w-5xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-slate-200 px-4 py-1.5 rounded-full shadow-sm mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">v2.0: Spotify Entegrasyonu</span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-slate-900 mb-6 leading-[1.1] animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            Mental Sağlık <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
              Veriye Dönüşüyor.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Öğrenciler için yargısız bir alan, okullar için yapay zeka destekli erken uyarı sistemi.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <button className="group bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl shadow-slate-900/30 hover:bg-slate-800 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
              Okulunuz İçin İsteyin 
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
            </button>
            <button className="group bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
              <Play size={20} className="fill-slate-900"/> Tanıtım Videosu
            </button>
          </div>
        </div>

        {/* --- DASHBOARD MOCKUP (Glass Card) --- */}
        <div className="mt-24 relative max-w-6xl mx-auto animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-teal-400 rounded-[2rem] blur opacity-20"></div>
          <div className="relative bg-slate-900 rounded-[2rem] p-2 shadow-2xl overflow-hidden border border-slate-800">
            
            {/* Mockup Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="mx-auto bg-slate-800/50 px-3 py-1 rounded-md text-[10px] text-slate-400 font-mono">gencturp.app/dashboard</div>
            </div>

            {/* Mockup Content Image */}
            <div className="relative">
               <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80" 
                alt="Dashboard UI" 
                className="w-full opacity-80"
              />
              {/* Floating Notification Cards */}
              <div className="absolute top-10 left-10 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white shadow-2xl animate-float">
                 <div className="flex items-center gap-3">
                    <div className="bg-green-500 p-2 rounded-lg"><Headphones size={18}/></div>
                    <div>
                       <p className="text-xs text-green-300 font-bold">Spotify Modu</p>
                       <p className="font-bold text-sm">Odaklanma Listesi Çalıyor</p>
                    </div>
                 </div>
              </div>

              <div className="absolute bottom-10 right-10 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white shadow-2xl animate-float animation-delay-2000">
                 <div className="flex items-center gap-3">
                    <div className="bg-red-500 p-2 rounded-lg"><BarChart3 size={18}/></div>
                    <div>
                       <p className="text-xs text-red-300 font-bold">Risk Uyarısı</p>
                       <p className="font-bold text-sm">2 Öğrenci Tespit Edildi</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- FEATURES SECTION --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Tek Platform, İki Perspektif</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            İster öğrenci ol, ister okul yöneticisi. Genç Turp herkesin ihtiyacına göre şekillenir.
          </p>
          
          {/* Switcher */}
          <div className="mt-8 inline-flex bg-white p-1.5 rounded-full border border-slate-200 shadow-sm">
             <button 
               onClick={() => setActiveTab('student')}
               className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === 'student' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
             >
               Öğrenci Modu
             </button>
             <button 
               onClick={() => setActiveTab('school')}
               className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === 'school' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
             >
               Okul Modu
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {activeTab === 'student' ? (
             <>
                <FeatureCard 
                  icon={<Sparkles />}
                  title="Oyunlaştırılmış Deneyim"
                  desc="Sıkıcı anketler yok. Modunu gir, puanları topla, karakterini geliştir ve ödülleri kazan."
                  delay="0.1s"
                />
                <FeatureCard 
                  icon={<Headphones />}
                  title="Müzik Terapisi"
                  desc="Ruh haline en uygun şarkılar anında kulağında. Spotify Premium entegrasyonuyla kesintisiz keyif."
                  delay="0.2s"
                />
                <FeatureCard 
                  icon={<ShieldCheck />}
                  title="Gizli & Güvenli"
                  desc="Burada 'ispiyonculuk' yok. Yazdıkların şifreli, sadece seninle sistem arasında."
                  delay="0.3s"
                />
             </>
           ) : (
             <>
                <FeatureCard 
                  icon={<BarChart3 />}
                  title="Risk Haritası"
                  desc="Okulun hangi sınıflarında stres yüksek? Veriye dayalı kararlar alarak önleyici müdahale yapın."
                  delay="0.1s"
                />
                 <FeatureCard 
                  icon={<ShieldCheck />}
                  title="Zorbalık Tespiti"
                  desc="Sessiz çığlıkları duyun. Akran zorbalığını yapay zeka analizleriyle erken aşamada fark edin."
                  delay="0.2s"
                />
                 <FeatureCard 
                  icon={<Play />}
                  title="PDR Verimliliği"
                  desc="Rehberlik servisinin yükünü azaltın. Manuel tarama yerine otomatik risk raporları alın."
                  delay="0.3s"
                />
             </>
           )}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-200 bg-white pt-20 pb-10 px-6">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                 <Sprout size={16}/>
              </div>
              <span className="font-bold text-slate-900 tracking-tight">Genç Turp</span>
            </div>
            <p className="text-slate-400 text-sm">© 2025 Tüm Hakları Saklıdır.</p>
         </div>
      </footer>
    </div>
  );
}
