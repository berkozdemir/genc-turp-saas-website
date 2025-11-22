import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Shield, Headphones, Activity, 
  Users, BarChart3, Lock, Zap, CheckCircle 
} from 'lucide-react';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('student'); // 'student' | 'school'

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* --- 1. NAVBAR (Glassmorphism) --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-green-200">
                GT
              </div>
              <span className="font-bold text-xl tracking-tight">Genç Turp</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium hover:text-green-600 transition">Özellikler</a>
              <a href="#how-it-works" className="text-sm font-medium hover:text-green-600 transition">Nasıl Çalışır?</a>
              <Link to="/login" className="text-sm font-bold text-slate-900">Giriş Yap</Link>
              <Link 
                to="/school-register" 
                className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition shadow-lg"
              >
                Okul Başvurusu
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* --- 2. HERO SECTION (Dinamik Başlık) --- */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative overflow-hidden">
        {/* Arkaplan Süsleri */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 px-4 py-1.5 rounded-full text-green-700 text-xs font-bold mb-8 animate-fade-in-up">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Yeni: Spotify Entegrasyonu Yayında! 🎧
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900">
            Okulda Mental Sağlık <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">
              Veriye Dönüşüyor.
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            Öğrenciler için <strong>gizli bir sığınak</strong>, okullar için yapay zeka destekli bir <strong>erken uyarı sistemi</strong>. Zorbalığı, depresyonu ve kaygıyı kriz olmadan yakalayın.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/school-register" 
              className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Okulunuz İçin İsteyin <ArrowRight size={20} />
            </Link>
            <Link 
              to="/login" 
              className="px-8 py-4 bg-white text-slate-900 border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              Öğrenci Girişi
            </Link>
          </div>

          {/* Hero Image Mockup */}
          <div className="mt-16 relative mx-auto max-w-5xl">
            <div className="bg-slate-900 rounded-2xl p-2 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" 
                alt="Dashboard Preview" 
                className="rounded-xl opacity-90"
              />
              {/* Floating Cards (Süsleme) */}
              <div className="absolute -left-8 top-20 bg-white p-4 rounded-xl shadow-xl border border-gray-100 hidden md:block animate-float">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 p-2 rounded-lg text-red-600"><Activity size={20} /></div>
                  <div>
                    <p className="text-xs text-gray-500">Risk Analizi</p>
                    <p className="font-bold text-sm">%85 Doğruluk</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-8 bottom-20 bg-white p-4 rounded-xl shadow-xl border border-gray-100 hidden md:block animate-float animation-delay-2000">
                 <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg text-green-600"><Headphones size={20} /></div>
                  <div>
                    <p className="text-xs text-gray-500">Spotify Modu</p>
                    <p className="font-bold text-sm">Aktif 🎵</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. PROBLEM & ÇÖZÜM (İstatistikler) --- */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-green-600 font-bold uppercase tracking-wider text-sm mb-2">Neden Şimdi?</p>
          <h2 className="text-3xl font-bold mb-12">Rakamlar Alarm Veriyor</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard 
              number="%40" 
              text="Lise öğrencilerinde kaygı bozukluğu görülme oranı." 
              source="TÜİK & Akademik Veriler"
            />
            <StatCard 
              number="1/3" 
              text="Her 3 öğrenciden biri siber veya fiziksel zorbalığa uğruyor." 
              source="MEB Raporları"
            />
            <StatCard 
              number="%70" 
              text="Gençlerin %70'i sorunlarını yetişkinlere anlatmaktan çekiniyor." 
              source="Pedagojik Araştırmalar"
            />
          </div>
        </div>
      </section>

      {/* --- 4. İKİLİ PERSPEKTİF (Switch Tab) --- */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">Herkes İçin Tasarlandı</h2>
          {/* Toggle */}
          <div className="inline-flex bg-gray-100 p-1 rounded-full">
            <button 
              onClick={() => setActiveTab('student')}
              className={`px-8 py-3 rounded-full text-sm font-bold transition ${activeTab === 'student' ? 'bg-white shadow-md text-slate-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              🎒 Öğrenciler İçin
            </button>
            <button 
              onClick={() => setActiveTab('school')}
              className={`px-8 py-3 rounded-full text-sm font-bold transition ${activeTab === 'school' ? 'bg-white shadow-md text-slate-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              🏫 Okullar & PDR İçin
            </button>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {activeTab === 'student' ? (
            <>
              <div className="space-y-8 animate-fade-in">
                <FeatureRow 
                  icon={<Lock className="text-green-600" />}
                  title="Tamamen Gizli & Güvenli"
                  desc="Yazdıklarını ailen veya arkadaşların göremez. Burası senin dijital günlüğün."
                />
                <FeatureRow 
                  icon={<Headphones className="text-green-600" />}
                  title="Spotify Premium Hediye"
                  desc="Genç Turp'u kullanan anlaşmalı okullarda 3 ay müzik bizden. Ruh haline göre listeler hazır."
                />
                <FeatureRow 
                  icon={<Zap className="text-green-600" />}
                  title="Oyunlaştırılmış Puan Sistemi"
                  desc="Anket çöz, modunu gir, puanları topla. Sinema bileti ve ödülleri kap."
                />
              </div>
              <div className="bg-green-50 rounded-3xl p-8 animate-fade-in relative overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80" className="rounded-2xl shadow-lg transform rotate-2 hover:rotate-0 transition duration-500" alt="Student App" />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-8 animate-fade-in">
                <FeatureRow 
                  icon={<BarChart3 className="text-blue-600" />}
                  title="Erken Uyarı Paneli"
                  desc="Yapay zeka, öğrenci metinlerindeki riskli kelimeleri (intihar, zorbalık) tarar ve PDR'ye raporlar."
                />
                <FeatureRow 
                  icon={<Users className="text-blue-600" />}
                  title="PDR İş Yükü Yönetimi"
                  desc="Binlerce öğrenciyi tek tek taramak yerine, sadece riskli olanlara odaklanın. Veriye dayalı rehberlik."
                />
                <FeatureRow 
                  icon={<Shield className="text-blue-600" />}
                  title="Akran Zorbalığı Tespiti"
                  desc="Sessiz kalan mağdurları, arkadaşlarının 'Dost Sinyali' ve duygu analizleriyle tespit edin."
                />
              </div>
              <div className="bg-blue-50 rounded-3xl p-8 animate-fade-in">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" className="rounded-2xl shadow-lg transform -rotate-2 hover:rotate-0 transition duration-500" alt="School Dashboard" />
              </div>
            </>
          )}
        </div>
      </section>

      {/* --- 5. SPOTIFY CAMPAIGN (Dark Mode) --- */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <div className="flex items-center gap-3 mb-6">
               <span className="bg-green-500 text-black px-3 py-1 rounded-md font-bold text-xs uppercase tracking-wider">Partner</span>
               <Headphones size={24} className="text-green-500" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Müzik, En İyi <br /> <span className="text-green-500">Terapi Aracıdır.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Genç Turp, ruh halini analiz eder ve seni iyileştirecek frekansı Spotify üzerinden sunar. Üstelik Premium üyeliğin okul paketiyle hediye.
            </p>
            <button className="bg-green-500 text-black px-8 py-4 rounded-full font-bold hover:bg-green-400 transition flex items-center gap-2">
              Okulunu Kontrol Et <ArrowRight size={20} />
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            {/* Phone Mockup CSS ile */}
            <div className="w-64 h-[500px] bg-black border-8 border-gray-800 rounded-[3rem] overflow-hidden shadow-2xl relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-20"></div>
              <img src="https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover opacity-80" alt="Spotify UI" />
              <div className="absolute bottom-10 left-4 right-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                 <p className="text-xs text-green-400 font-bold mb-1">Şu an Çalıyor</p>
                 <p className="font-bold text-sm">Kaygı Giderici Frekanslar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. CTA (Eylem Çağrısı) --- */}
      <section className="py-24 max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6 text-slate-900">Hazır mısınız?</h2>
        <p className="text-xl text-slate-600 mb-10">Okulunuzu güvenli bir limana dönüştürün.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 border border-gray-200 rounded-2xl hover:shadow-xl transition text-left group">
            <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Okul Yönetimi İçin</h3>
            <p className="text-gray-500 mb-6">Demo talep edin, PDR sisteminizi dijitalleştirin.</p>
            <Link to="/school-register" className="text-blue-600 font-bold flex items-center gap-2 group-hover:gap-3 transition">
              Formu Doldur <ArrowRight size={16} />
            </Link>
          </div>

          <div className="p-8 border border-gray-200 rounded-2xl hover:shadow-xl transition text-left group">
            <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Öğrenci & Veli İçin</h3>
            <p className="text-gray-500 mb-6">Okul kodunla hemen kayıt ol, avantajları kaçırma.</p>
            <Link to="/login" className="text-green-600 font-bold flex items-center gap-2 group-hover:gap-3 transition">
              Giriş Yap <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">GT</div>
             <span className="font-bold text-slate-700">Genç Turp © 2025</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-slate-900">Gizlilik Politikası</a>
            <a href="#" className="hover:text-slate-900">KVKK Aydınlatma</a>
            <a href="#" className="hover:text-slate-900">İletişim</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Alt Bileşenler ---

function StatCard({ number, text, source }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <h3 className="text-4xl font-black text-slate-900 mb-2">{number}</h3>
      <p className="text-gray-600 font-medium mb-4">{text}</p>
      <p className="text-xs text-gray-400 uppercase tracking-wide">{source}</p>
    </div>
  );
}

function FeatureRow({ icon, title, desc }) {
  return (
    <div className="flex gap-4 items-start p-4 hover:bg-gray-50 rounded-xl transition">
      <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
