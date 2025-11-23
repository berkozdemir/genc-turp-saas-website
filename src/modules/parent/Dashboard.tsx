import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Home, Users, Heart, GraduationCap, Settings, LogOut, 
    Zap, TrendingUp, TrendingDown, Clock, MessageSquare, BookOpen 
} from 'lucide-react';
import SeoHelmet from '../../components/SeoHelmet';

// Yan Menü Bileşeni (ParentDashboard'a özel)
const ParentSidebar = () => {
  const navItems = [
    { name: 'Genel Durum', icon: Home, link: '/parent/dashboard' },
    { name: 'Veli Akademisi', icon: BookOpen, link: '/parent/academy' },
    { name: 'İletişim', icon: MessageSquare, link: '/parent/messages' },
    { name: 'Ayarlar', icon: Settings, link: '/parent/settings' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-100 p-6 flex flex-col h-full sticky top-0 hidden md:flex">
      {/* Logo */}
      <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 mb-8">
        <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center">T</div>
        Turp Modum.
      </div>
      
      {/* Navigasyon */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.link}
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
              item.link === '/parent/dashboard' // Şu an sadece Dashboard'u aktif kabul ediyoruz
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-gray-100'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Footer / Çıkış */}
      <div className="pt-6 border-t border-gray-100">
        <button className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Çıkış Yap</span>
        </button>
      </div>
    </div>
  );
};

// Ana Kart Bileşeni
const StatCard = ({ title, value, icon: Icon, color, trend, description }) => (
    <div className={`bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transform transition duration-300 hover:scale-[1.02] ${color}`}>
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-semibold text-gray-500 uppercase">{title}</h3>
        <Icon size={24} className={`text-${color.split('-')[1]}-500`} />
      </div>
      <p className="text-4xl font-extrabold text-slate-900 mt-2">{value}</p>
      {trend && (
        <div className={`flex items-center mt-3 text-sm font-medium ${
            trend.includes('artış') ? 'text-green-600' : trend.includes('azalma') ? 'text-red-600' : 'text-slate-600'
        }`}>
          {trend.includes('artış') ? <TrendingUp size={16} className="mr-1" /> : trend.includes('azalma') ? <TrendingDown size={16} className="mr-1" /> : null}
          {trend}
        </div>
      )}
      <p className="text-xs text-gray-400 mt-2">{description}</p>
    </div>
);

// Ana Dashboard Bileşeni
export default function ParentDashboard() {
  const mockData = {
    childName: 'Ayşe Yılmaz',
    wellbeingScore: 85,
    riskLevel: 'Düşük Risk',
    monthlyTrend: '+5 puan artış',
    avgScreenTime: '3 saat 15 dk',
    pdrMeeting: 'Yok',
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col md:flex-row">
        
      {/* --- SEO BİLEŞENİ --- */}
      <SeoHelmet slug="parent-dashboard" localTitle="Veli Portalı - Turp Modum" />

      {/* Yan Menü */}
      <ParentSidebar />

      {/* Ana İçerik Alanı */}
      <main className="flex-1 p-6 md:p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Merhaba, Sayın Veli!</h1>
          <p className="text-xl text-slate-600">
            **{mockData.childName}** adlı çocuğunuzun genel refah durumuna hoş geldiniz.
          </p>
        </header>

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard 
            title="Refah Skoru" 
            value={mockData.wellbeingScore} 
            icon={Heart} 
            color="text-rose-500" 
            trend={mockData.monthlyTrend} 
            description="Geçen aya göre değişim"
          />
          <StatCard 
            title="Risk Seviyesi" 
            value={mockData.riskLevel} 
            icon={Zap} 
            color={mockData.riskLevel.includes('Düşük') ? 'text-green-500' : 'text-yellow-500'} 
            description="Genel mental sağlık projeksiyonu"
          />
          <StatCard 
            title="Ort. Ekran Süresi" 
            value={mockData.avgScreenTime} 
            icon={Clock} 
            color="text-indigo-500" 
            description="Son 7 günlük ortalama süre"
          />
          <StatCard 
            title="PDR Randevusu" 
            value={mockData.pdrMeeting === 'Yok' ? 'Gerek Yok' : mockData.pdrMeeting} 
            icon={MessageSquare} 
            color="text-slate-500" 
            description="Okul rehberlik birimi bildirimi"
          />
        </div>

        {/* Detaylı Raporlar Alanı */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Sol: Duygusal İklim Özeti */}
            <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2">Duygusal İklim Özeti</h2>
                
                <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-400">
                        <p className="font-semibold text-blue-800">Sınav Kaygısı:</p>
                        <p className="text-slate-600 text-sm mt-1">
                            Geçen hafta, önemli bir sınav öncesinde Ayşe'nin kaygı seviyesinde hafif bir yükseliş gözlemlenmiştir. 
                            Ancak bu seviye normal sınırlar içindedir.
                        </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-400">
                        <p className="font-semibold text-green-800">Akran Etkileşimi:</p>
                        <p className="text-slate-600 text-sm mt-1">
                            Ayşe, sınıf içi ve dışı etkileşimlerinde yüksek bir pozitiflik ve katılım sergilemektedir. 
                            Sosyal refah skoru stabildir.
                        </p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-400">
                        <p className="font-semibold text-yellow-800">Uyku Düzeni:</p>
                        <p className="text-slate-600 text-sm mt-1">
                            Hafta içi ortalama uyku süresi 7.5 saat olup, zaman zaman düşüşler gözlenmektedir. 
                            PDR birimi, sağlıklı uyku alışkanlıkları için bir kaynak önerdi.
                        </p>
                    </div>
                </div>

                <Link to="/parent/academy" className="mt-6 inline-flex items-center text-blue-600 font-bold hover:text-blue-700 transition">
                    Detaylı Rapor ve Destek İçerikleri <ArrowLeft className="rotate-180 ml-1" size={16} />
                </Link>
            </div>

            {/* Sağ: Hızlı Eylem Alanı */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 h-fit">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2">Hızlı Eylemler</h2>
                <div className="space-y-4">
                    <button className="w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition shadow-lg shadow-green-500/30">
                        PDR'ye Mesaj Gönder
                    </button>
                    <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition shadow-lg shadow-blue-500/30">
                        Veli Akademisine Git
                    </button>
                    <button className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-200 transition">
                        Sistem Ayarları
                    </button>
                </div>
            </div>

        </div>
      </main>
    </div>
  );
}