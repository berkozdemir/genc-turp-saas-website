import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Activity, Shield, Zap, Music } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // 1. İçe aktar

export default function LandingPage() {
  const { t } = useTranslation(); // 2. Hook'u başlat

  return (
    <div className="min-h-screen bg-white selection:bg-green-200 selection:text-green-900 font-sans">
      
      {/* --- NAV --- */}
      <nav className="fixed w-full z-50 top-0 left-0 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center">G</div>
            GençTurp.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-sm font-semibold hover:text-green-600 transition">
              {t('login')}
            </Link>
            <Link to="/school-register" className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition shadow-lg shadow-green-500/20">
              {t('register_school')}
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Arka Plan Işıkları */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-green-200 via-purple-200 to-blue-200 rounded-full blur-[100px] opacity-50 -z-10"></div>

        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1 text-xs font-bold text-gray-600 mb-8 hover:bg-gray-100 transition cursor-pointer">
            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
            {t('v2_badge')}
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-slate-900 mb-6 leading-[0.9]">
            {t('hero_title_1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
              {t('hero_title_2')}
            </span>
          </h1>
          
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('hero_desc')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition flex items-center justify-center gap-2">
              {t('get_started')} <ArrowRight size={20} />
            </Link>
            <div className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 rounded-2xl font-bold text-lg text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2 cursor-pointer">
              <Play size={20} className="text-gray-400" />
              {t('watch_demo')}
            </div>
          </div>
        </div>
      </section>

      {/* --- BENTO GRID FEATURES --- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 tracking-tight">{t('why_gencturp')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* KART 1: Spotify */}
          <div className="md:col-span-2 bg-black rounded-[2rem] p-10 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-green-500 blur-[150px] opacity-20 group-hover:opacity-40 transition duration-700"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mb-6 text-black">
                <Music size={24} strokeWidth={3} />
              </div>
              <h3 className="text-3xl font-bold mb-2">{t('feature_music_title')}</h3>
              <p className="text-gray-400 max-w-md">{t('feature_music_desc')}</p>
            </div>
            <img 
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" 
              className="absolute bottom-8 right-8 w-24 opacity-50" alt="Spotify"
            />
          </div>

          {/* KART 2: PDR */}
          <div className="bg-gray-50 border border-gray-100 rounded-[2rem] p-8 relative hover:border-gray-300 transition duration-300">
            <div className="bg-white w-12 h-12 rounded-xl shadow-sm flex items-center justify-center mb-6 text-blue-600">
              <Activity size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-slate-800">{t('feature_risk_title')}</h3>
            <p className="text-gray-500 text-sm">{t('feature_risk_desc')}</p>
            
            {/* Mock Graph */}
            <div className="mt-6 flex items-end gap-1 h-16 opacity-50">
              <div className="w-1/5 bg-blue-200 h-[40%] rounded-t-md"></div>
              <div className="w-1/5 bg-blue-300 h-[70%] rounded-t-md"></div>
              <div className="w-1/5 bg-blue-500 h-[100%] rounded-t-md"></div>
              <div className="w-1/5 bg-blue-400 h-[60%] rounded-t-md"></div>
              <div className="w-1/5 bg-blue-200 h-[30%] rounded-t-md"></div>
            </div>
          </div>

          {/* KART 3: Gamification */}
          <div className="bg-gradient-to-b from-yellow-50 to-orange-50 rounded-[2rem] p-8 border border-orange-100 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
              <Zap size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-slate-800">{t('feature_gamification_title')}</h3>
            <p className="text-gray-600 text-sm">{t('feature_gamification_desc')}</p>
          </div>

          {/* KART 4: Privacy */}
          <div className="md:col-span-2 bg-gray-100 rounded-[2rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 group hover:bg-gray-200 transition">
            <div className="max-w-md">
               <div className="w-12 h-12 bg-white text-slate-900 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                <Shield size={24} />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-slate-900">{t('feature_privacy_title')}</h3>
              <p className="text-slate-600">{t('feature_privacy_desc')}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg rotate-3 group-hover:rotate-0 transition duration-500">
              <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-2">
                 <div className="h-2 w-32 bg-gray-100 rounded-full"></div>
                 <div className="h-2 w-24 bg-gray-100 rounded-full"></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- Footer CTA --- */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">{t('footer_cta_title')}</h2>
          <Link to="/school-register" className="inline-block bg-green-500 text-black px-10 py-5 rounded-full font-bold text-xl hover:bg-green-400 hover:scale-105 transition shadow-xl shadow-green-200">
            {t('apply_now')}
          </Link>
          <p className="mt-6 text-gray-400 text-sm">{t('footer_subtext')}</p>
        </div>
      </section>

    </div>
  );
}