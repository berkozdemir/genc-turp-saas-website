import { useState } from 'react';
import { Link } from 'react-router-dom';
import SeoHelmet from '../../components/SeoHelmet';
import { 
    Heart, Shield, BookOpen, Clock, Zap, // Kullanılan temel ikonlar
    LayoutDashboard, Settings, LogOut, ArrowUpRight, ArrowDownRight, // KPI ve menü ikonları
    LucideIcon // Lucide bileşenlerinin tipini almak için
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

// --- MOCK DATA ---
const MOOD_TREND = [
  { name: 'Pzt', refah: 85, okul: 92 },
  { name: 'Sal', refah: 88, okul: 90 },
  { name: 'Çar', refah: 82, okul: 85 },
  { name: 'Per', refah: 75, okul: 80 },
  { name: 'Cum', refah: 80, okul: 88 },
];

// --- TİP TANIMLARI ---
interface NavItemProps {
    icon: LucideIcon;
    label: string;
    active?: boolean;
}

interface KpiCardProps {
    title: string;
    value: any;
    sub?: string;
    trend: string;
    trendUp: boolean;
    isNegative?: boolean; // Risk seviyesi için gerekli
    icon: LucideIcon;
    color: string;
    description?: string;
}

// --- YARDIMCI BİLEŞENLER ---
function NavItem({ icon: IconComponent, label, active }: NavItemProps) {
  return (
    <div className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition duration-200 group ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-500 hover:bg-blue-50 hover:text-slate-900'}`}>
      <IconComponent size={20} />
      <span className="text-sm font-bold">{label}</span>
    </div>
  );
}

function KpiCard({ title, value, sub, trend, trendUp, isNegative = false, icon: IconComponent, color }: KpiCardProps) {
  const TrendIcon = trendUp ? ArrowUpRight : ArrowDownRight;
  // Negatif trend yeşil, pozitif trend kırmızı olacak (Risk artışı kötü demek)
  const trendColor = isNegative 
    ? (trendUp ? 'text-red-600' : 'text-green-600') 
    : (trendUp ? 'text-green-600' : 'text-red-600');
  
  return (
    <div className={`p-6 rounded-2xl border bg-white shadow-sm flex items-start justify-between group hover:shadow-md transition duration-300`}>
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{title}</p>
        <div className="flex items-baseline gap-1">
          <h2 className="text-3xl font-black text-slate-900">{value}</h2>
          {sub && <span className="text-sm text-gray-400 font-medium">{sub}</span>}
        </div>
        {(trend && trend !== 'Aynı') && (
          <div className={`flex items-center gap-1 mt-2 text-xs font-bold ${trendColor} bg-slate-50 inline-flex px-2 py-1 rounded-md`}>
            <TrendIcon size={12} />
            {trend} 
          </div>
        )}
      </div>
      <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition duration-300`}>
        <IconComponent size={20} className={`text-${color.split('-')[1]}-600`} />
      </div>
    </div>
  );
}

// --- ANA DASHBOARD BİLEŞENİ ---
export default function ParentDashboard() {
  const [stats] = useState({ 
    wellbeingScore: 8.5,
    riskStatus: 'Düşük',
    activityCount: 4,
    lastCheckin: 'Bugün'
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col md:flex-row">
      
      {/* --- SEO BİLEŞENİ --- */}
      <SeoHelmet slug="parent-dashboard" localTitle="Veli Portalı - Turp Modum" />

      {/* --- SIDEBAR (SOL MENÜ) --- */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-100 p-6 flex flex-col h-screen sticky top-0 hidden md:flex">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 mb-8">
            <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center">T</div>
            Turp Modum.
        </div>
        
        <div className="mb-8 px-4 py-3 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xs font-bold text-blue-600 uppercase">Çocuğum</p>
            <p className="text-sm font-bold text-slate-900">Efe KILIÇ (10. Sınıf)</p>
        </div>

        {/* Navigasyon */}
        <nav className="flex-1 space-y-2">
            <Link to="/parent/dashboard">
              <NavItem icon={LayoutDashboard} label="Genel Durum" active={true} /> {/* Prop düzeltildi */}
            </Link>
            <Link to="/parent/academy">
              <NavItem icon={BookOpen} label="Veli Akademisi" active={false} /> {/* Prop düzeltildi */}
            </Link>
            <Link to="/parent/settings">
              <NavItem icon={Settings} label="Ayarlar" active={false} /> {/* Prop düzeltildi */}
            </Link>
        </nav>

        {/* Footer / Çıkış */}
        <div className="pt-6 border-t border-gray-100">
            <Link to="/" className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors">
              <LogOut size={20} />
              <span className="font-medium">Çıkış Yap</span>
            </Link>
        </div>
      </aside>
      
      {/* --- MOBILE BOTTOM NAV --- */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 flex justify-around shadow-lg z-10">
          <Link to="/parent/dashboard"><LayoutDashboard size={24} className="text-blue-600" /></Link>
          <Link to="/parent/academy"><BookOpen size={24} className="text-gray-400" /></Link>
          <Link to="/parent/settings"><Settings size={24} className="text-gray-400" /></Link>
      </div>


      {/* --- ANA İÇERİK ALANI --- */}
      <main className="flex-1 p-6 md:p-10 pb-24 md:pb-10">
        
        {/* HEADER */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Merhaba, Sayın Veli!</h1>
          <p className="text-xl text-slate-600">Çocuğunuzun son refah raporu.</p>
        </header>

        {/* --- KPI KARTLARI --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <KpiCard 
            title="Genel Refah Skoru" value={stats.wellbeingScore} sub="/ 10" trend="+0.3 artış" trendUp={true} 
            isNegative={false} // Refah skoru artışı pozitif
            icon={Heart} color="bg-red-50 border-red-100"
          />
          <KpiCard 
            title="Risk Seviyesi" value={stats.riskStatus} trend={stats.riskStatus === 'Düşük' ? 'Aynı' : '+1 artış'} trendUp={stats.riskStatus !== 'Düşük'} 
            isNegative={true} // Risk artışı negatif
            icon={Zap} color="bg-blue-50 border-blue-100"
          />
          <KpiCard 
            title="Tamamlanan Görev" value={stats.activityCount} sub="adet" trend="+1 artış" trendUp={true}
            isNegative={false} // Görev artışı pozitif
            icon={BookOpen} color="bg-purple-50 border-purple-100"
          />
          <KpiCard 
            title="Son Kontrol" value={stats.lastCheckin} sub="" trend="Aynı" trendUp={true} // Sabit değerler
            isNegative={false}
            icon={Clock} color="bg-green-50 border-green-100"
          />
        </div>

        {/* --- GRAFİK & BİLGİ ALANLARI --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* SOL: Haftalık Refah Trendi */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-slate-800 text-lg mb-6">Haftalık Refah Skoru (Öğrencinin Genel Ortalaması)</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOOD_TREND}>
                  <defs>
                    <linearGradient id="colorRefah" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorOkul" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} domain={[70, 100]} />
                  <Tooltip formatter={(value, name) => [`${value}/100`, name === 'refah' ? 'Çocuğunuzun Skoru' : 'Okul Ortalaması']} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                  <Area type="monotone" dataKey="refah" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRefah)" name="Çocuğunuzun Skoru" />
                  <Area type="monotone" dataKey="okul" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorOkul)" name="Okul Ortalaması" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* SAĞ: Önemli Bilgilendirme Kartı */}
          <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm flex flex-col justify-between">
            <h3 className="font-bold text-blue-900 text-lg mb-4">Önemli Bildirim</h3>
            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 mb-4">
               <p className="text-sm font-bold text-blue-800 mb-1">PDR Görüşmesi</p>
               <p className="text-xs text-blue-700 leading-relaxed">
                  Çocuğunuzun PDR servisi ile **rutin dönem değerlendirme** görüşmesi yapması planlanmıştır. Her şey yolunda.
               </p>
            </div>

            <div className="p-4 bg-yellow-50/50 rounded-xl border border-yellow-100">
               <p className="text-sm font-bold text-yellow-800 mb-1">Veli Akademisi</p>
               <p className="text-xs text-yellow-700 leading-relaxed">
                  Yeni seminer: "Ergenlerde Teknoloji Bağımlılığı ile Başa Çıkma Yolları" programına kayıt olabilirsiniz.
               </p>
            </div>
          </div>
        </div>
        
        {/* --- ALT BÖLÜM: GİZLİLİK & RİSK AÇIKLAMASI --- */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm mt-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Shield size={24} className="text-blue-600" /> Gizlilik ve Raporlama İlkemiz
            </h3>
            <p className="text-gray-600 leading-relaxed">
                Bu portal, çocuğunuzun gizliliğini %100 korumak üzere tasarlanmıştır. 
                Size sunulan skorlar, çocuğunuzun **okul genelindeki** ortalama refah seviyesine kıyasla nasıl hissettiğini gösterir. Çocuğunuzun **özel günlüğünü veya sisteme yazdığı metinleri ASLA göremezsiniz**. 
            </p>
        </div>

      </main>
    </div>
  );
}