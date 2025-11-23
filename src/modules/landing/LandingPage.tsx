import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Play, Zap, Music, 
  Users, School, Heart, GraduationCap, CheckCircle2, Activity 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import SeoHelmet from '../../components/SeoHelmet';
import Footer from '../../components/Footer';

export default function LandingPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'student' | 'school' | 'pdr' | 'parent'>('student');

  // Persona Verileri
  const personas = {
    student: {
      title: t('role_student_title'),
      desc: t('role_student_desc'),
      icon: <Music className="w-8 h-8 text-white" />,
      color: "bg-black",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000",
      features: ["Spotify Premium Modu", "Anonim Günlük", "Turp Bazaar Ödülleri"]
    },
    school: {
      title: t('role_school_title'),
      desc: t('role_school_desc'),
      icon: <School className="w-8 h-8 text-white" />,
      color: "bg-blue-600",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000",
      features: ["Kurumsal Risk Paneli", "Zorbalık Haritası", "Otomatik Raporlama"]
    },
    pdr: {
      title: t('role_pdr_title'),
      desc: t('role_pdr_desc'),
      icon: <Heart className="w-8 h-8 text-white" />,
      color: "bg-rose-500",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000",
      features: ["Vaka Önceliklendirme", "Öğrenci Geçmişi", "Güvenli Mesajlaşma"]
    },
    parent: {
      title: t('role_parent_title'),
      desc: t('role_parent_desc'),
      icon: <Users className="w-8 h-8 text-white" />,
      color: "bg-indigo-600",
      image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=1000",
      features: ["Genel İklim Raporu", "Güvenli Okul Onayı", "Veli Akademisi"]
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-green-200 selection:text-green-900 font-sans">
      
      {/* --- SEO BİLEŞENİ --- */}
      <SeoHelmet slug="home" localTitle="Turp Modum - Akıllı Duygu Takipçim" />

      {/* --- NAV --- */}
      <nav className="fixed w-full z-50 top-0 left-0 border-b border-gray-100 bg-white/80 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
            <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center shadow-lg shadow-slate-200">T</div>
            Turp Modum.
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <div className="w-px h-6 bg-gray-200 mx-2 hidden sm:block"></div>
            <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition">
              {t('login')}
            </Link>
            <Link to="/school-register" className="hidden sm:block bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-black hover:scale-105 transition shadow-lg shadow-slate-900/20">
              {t('register_school')}
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        {/* Arka Plan Dekorları */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-green-200 via-teal-200 to-indigo-200 rounded-full blur-[120px] opacity-40 -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-100 rounded-full blur-[100px] opacity-30 -z-10"></div>

        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-bold text-slate-600 mb-8 hover:border-green-400 hover:text-green-700 transition cursor-pointer shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {t('v2_badge')}
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-slate-900 mb-8 leading-[0.95]">
            {t('hero_title_1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-teal-500 to-blue-600">
              {t('hero_title_2')}
            </span>
          </h1>
          
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            {t('hero_desc')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-black hover:shadow-2xl hover:-translate-y-1 transition flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20">
              {t('get_started')} <ArrowRight size={20} />
            </Link>
            <div className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 rounded-2xl font-bold text-lg text-slate-700 hover:bg-gray-50 hover:border-gray-300 transition flex items-center justify-center gap-2 cursor-pointer shadow-sm">
              <Play size={20} className="text-slate-400 fill-slate-400" />
              {t('watch_demo')}
            </div>
          </div>
        </div>
      </section>

      {/* --- YENİ: GENİŞ ALAN GÖRSELİ (FIXED) --- */}
      <div className="relative max-w-7xl mx-auto px-6 -mt-10 mb-20">
        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-green-200/50 border-4 border-white">
          <img 
            src="https://images.unsplash.com/photo-1546410531-bb443916968e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4ODdfMHwxfHNlYXJjaHw1NXx8aGlnaCUyMHNjaG9vbCUyMHN0dWRlbnRzfGVufDB8fHx8MTcxODE4NjU5NXww&ixlib=rb-4.0.3&q=80&w=1800" 
            alt="Mutlu Lise Öğrencileri" 
            className="w-full h-[500px] object-cover object-center" /* <-- class yerine className kullanıldı */
          />
          {/* Görsel üzerine hafif bir degrade efekti */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <div className="absolute bottom-8 left-8 text-white text-3xl font-bold drop-shadow-lg">
            "Birlikte daha mutlu ve bilinçli bir gelecek inşa ediyoruz."
          </div>
        </div>
      </div>
      
      {/* --- PERSONA TABS SECTION --- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Tek Platform, Dört Perspektif</h2>
          <p className="text-slate-500 text-lg">Turp Modum, okul ekosistemindeki herkes için özel olarak tasarlandı.</p>
        </div>

        {/* Tab Butonları */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: 'student', label: t('tab_student'), icon: GraduationCap },
            { id: 'school', label: t('tab_school'), icon: School },
            { id: 'pdr', label: t('tab_pdr'), icon: Heart },
            { id: 'parent', label: t('tab_parent'), icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-slate-900 text-white shadow-lg scale-105' 
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Aktif İçerik Kartı */}
        <div className="bg-slate-50 rounded-[3rem] p-4 md:p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
            
            {/* Sol: Metin */}
            <div className="flex-1 relative z-10">
              <div className={`w-16 h-16 ${personas[activeTab].color} rounded-2xl flex items-center justify-center shadow-lg mb-8 rotate-3 transition-colors duration-500`}>
                {personas[activeTab].icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 transition-all duration-300">
                {personas[activeTab].title}
              </h3>
              <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                {personas[activeTab].desc}
              </p>

              {/* --- RİSK HESAPLAMA BUTONU (Sadece Okul Yönetimi için) --- */}
              {activeTab === 'school' && (
                <Link 
                  to="/school-risk-simulator" 
                  className="inline-flex items-center gap-2 text-blue-600 font-bold border border-blue-200 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 mb-8 transition"
                >
                  <Activity size={18} />
                  Okulunuzun Riskini Hesaplayın
                </Link>
              )}
              
              <ul className="space-y-4">
                {personas[activeTab].features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700 font-bold">
                    <CheckCircle2 className="text-green-500" size={20} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sağ: Görsel */}
            <div className="flex-1 w-full max-w-md md:max-w-none relative">
              <div className={`absolute inset-0 ${personas[activeTab].color} blur-[100px] opacity-20 rounded-full`}></div>
              <img 
                src={personas[activeTab].image} 
                alt={personas[activeTab].title} 
                className="relative rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition duration-500 border-4 border-white object-cover h-[400px] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('how_it_works')}</h2>
            <div className="h-1 w-20 bg-green-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {/* Adım 1 */}
            <div className="relative group">
              <div className="w-20 h-20 mx-auto bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-700 group-hover:border-green-500 group-hover:text-green-500 transition-all duration-300 mb-6">
                <span className="text-2xl font-black">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('step_1_title')}</h3>
              <p className="text-gray-400">{t('step_1_desc')}</p>
            </div>

            {/* Adım 2 */}
            <div className="relative group">
              <div className="hidden md:block absolute top-10 -left-1/2 w-full h-0.5 bg-slate-800 -z-10"></div>
              <div className="w-20 h-20 mx-auto bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-700 group-hover:border-blue-500 group-hover:text-blue-500 transition-all duration-300 mb-6">
                <span className="text-2xl font-black">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('step_2_title')}</h3>
              <p className="text-gray-400">{t('step_2_desc')}</p>
            </div>

            {/* Adım 3 */}
            <div className="relative group">
              <div className="hidden md:block absolute top-10 -left-1/2 w-full h-0.5 bg-slate-800 -z-10"></div>
              <div className="w-20 h-20 mx-auto bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-700 group-hover:border-rose-500 group-hover:text-rose-500 transition-all duration-300 mb-6">
                <span className="text-2xl font-black">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('step_3_title')}</h3>
              <p className="text-gray-400">{t('step_3_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer CTA --- */}
      <section className="py-24 text-center bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-8 rotate-12">
            <Zap size={32} fill="currentColor" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900">{t('footer_cta_title')}</h2>
          <p className="text-xl text-slate-500 mb-10">{t('footer_subtext')}</p>
          <Link to="/school-register" className="inline-flex items-center gap-2 bg-slate-900 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-black hover:scale-105 transition shadow-2xl shadow-slate-900/30">
            {t('apply_now')} <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <Footer />

    </div>
  );
}