import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import { 
  AlertTriangle, CheckCircle, Activity, Headphones, 
  Search, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

// --- MOCK DATA (Grafikler İçin Örnek Veri) ---
// Gerçekte bu veriler Supabase'den "group by" sorgusuyla gelir.
const TREND_DATA = [
  { name: 'Pzt', risk: 45, mood: 60 },
  { name: 'Sal', risk: 52, mood: 55 },
  { name: 'Çar', risk: 38, mood: 70 },
  { name: 'Per', risk: 65, mood: 40 },
  { name: 'Cum', risk: 48, mood: 65 },
  { name: 'Cmt', risk: 25, mood: 80 }, // Hafta sonu düşer
  { name: 'Paz', risk: 30, mood: 75 },
];

const MOOD_DISTRIBUTION = [
  { name: 'Mutlu 🤩', value: 400, color: '#22c55e' }, // Green
  { name: 'Normal 😐', value: 300, color: '#94a3b8' }, // Slate
  { name: 'Kaygılı 😔', value: 200, color: '#f59e0b' }, // Orange
  { name: 'Öfkeli 😡', value: 100, color: '#ef4444' }, // Red
];

export default function SchoolDashboard() {
  const [riskyEntries, setRiskyEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ 
    totalRisk: 0, 
    urgentCases: 0, 
    avgMoodScore: 7.2 
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    
    // 1. Riskli Kayıtları Çek (Mock veya Gerçek)
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .gt('risk_score', 30) // 30 üstü riskleri getir
      .order('created_at', { ascending: false })
      .limit(10);

    if (data) {
      setRiskyEntries(data);
      // Basit istatistik güncellemesi
      setStats(prev => ({
        ...prev,
        totalRisk: data.length,
        urgentCases: data.filter(x => x.risk_score > 70).length
      }));
    } else {
      // Demo Modunda boş gelirse örnek veri koyalım
      setRiskyEntries([
        { id: 1, content: "Sınavlar beni çok geriyor, uyuyamıyorum.", risk_score: 85, ai_tags: ['anxiety', 'academic'], created_at: '2024-03-20T10:00:00Z' },
        { id: 2, content: "Okulda kimse benle konuşmuyor.", risk_score: 65, ai_tags: ['bullying', 'social'], created_at: '2024-03-19T14:30:00Z' },
        { id: 3, content: "Her şey çok anlamsız geliyor.", risk_score: 92, ai_tags: ['depression'], created_at: '2024-03-18T09:15:00Z' },
      ]);
      setStats({ totalRisk: 154, urgentCases: 12, avgMoodScore: 6.8 });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans p-6 md:p-10">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Okul Yönetim Paneli 🏫</h1>
          <p className="text-slate-500 mt-1">Anlık PDR analizleri ve risk raporları.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 flex items-center gap-2">
            <Filter size={16}/> Filtrele
          </button>
          <button className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-black shadow-lg shadow-slate-900/20 flex items-center gap-2">
            Rapor Al
          </button>
        </div>
      </div>

      {/* --- KPI KARTLARI --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <KpiCard 
          title="Toplam Risk Sinyali" 
          value={stats.totalRisk} 
          trend="+12%" 
          trendUp={true} 
          icon={<Activity className="text-orange-600" />}
          color="bg-orange-50 border-orange-100"
        />
        <KpiCard 
          title="Acil Müdahale" 
          value={stats.urgentCases} 
          trend="+2" 
          trendUp={true} 
          isNegative={true} // Kırmızı trend
          icon={<AlertTriangle className="text-red-600" />}
          color="bg-red-50 border-red-100"
        />
        <KpiCard 
          title="Okul Ortalaması" 
          value={stats.avgMoodScore} 
          sub="/ 10"
          trend="-0.4" 
          trendUp={false} // Düşüş
          icon={<CheckCircle className="text-green-600" />}
          color="bg-green-50 border-green-100"
        />
         <KpiCard 
          title="Aktif Dinlenme" 
          value="845" 
          sub="dk"
          trend="+24%" 
          trendUp={true} 
          icon={<Headphones className="text-purple-600" />}
          color="bg-purple-50 border-purple-100"
        />
      </div>

      {/* --- GRAFİKLER BÖLÜMÜ --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* SOL: Trend Grafiği (Geniş) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Haftalık Stres Analizi</h3>
            <select className="bg-gray-50 border border-gray-200 text-xs rounded-lg px-2 py-1 outline-none">
              <option>Son 7 Gün</option>
              <option>Son 30 Gün</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TREND_DATA}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Area type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorRisk)" name="Risk Skoru" />
                <Area type="monotone" dataKey="mood" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorMood)" name="Mutluluk" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SAĞ: Pasta Grafik */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-slate-800 text-lg mb-6">Duygu Dağılımı</h3>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOOD_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {MOOD_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
            {/* Ortadaki Yazı */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] text-center">
              <span className="text-2xl font-bold text-slate-800">1.000</span>
              <p className="text-[10px] text-gray-400 uppercase">Öğrenci</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- RİSK TABLOSU --- */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 text-lg">🚨 İncelenmesi Gereken Vakalar</h3>
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input type="text" placeholder="Öğrenci ara..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-slate-900 transition" />
          </div>
        </div>
        
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
            <tr>
              <th className="p-4">Öğrenci ID</th>
              <th className="p-4">Risk Skoru</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Tespit Edilen Metin</th>
              <th className="p-4 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {riskyEntries.map((entry) => (
              <tr key={entry.id} className="hover:bg-slate-50/50 transition group">
                <td className="p-4 font-mono text-sm text-slate-600">#{entry.id.toString().padStart(4, '0')}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-full max-w-[80px] h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${entry.risk_score > 80 ? 'bg-red-500' : 'bg-orange-400'}`} 
                        style={{ width: `${entry.risk_score}%` }}
                      ></div>
                    </div>
                    <span className={`text-xs font-bold ${entry.risk_score > 80 ? 'text-red-600' : 'text-orange-600'}`}>%{entry.risk_score}</span>
                  </div>
                </td>
                <td className="p-4">
                  {entry.ai_tags && entry.ai_tags.map(tag => (
                    <span key={tag} className="inline-block bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded uppercase mr-1">
                      {tag}
                    </span>
                  ))}
                </td>
                <td className="p-4 max-w-xs">
                  <p className="text-sm text-gray-500 truncate group-hover:whitespace-normal group-hover:absolute group-hover:bg-white group-hover:shadow-lg group-hover:p-3 group-hover:rounded-lg group-hover:z-10 group-hover:border group-hover:border-gray-100 transition-all">
                    "{entry.content}"
                  </p>
                </td>
                <td className="p-4 text-right">
                  <button className="text-slate-400 hover:text-slate-900 transition">
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {loading && <div className="p-8 text-center text-gray-400 text-sm">Veriler taranıyor...</div>}
      </div>

    </div>
  );
}

// --- YARDIMCI BİLEŞEN: KPI KART ---
function KpiCard({ title, value, sub, trend, trendUp, isNegative, icon, color }) {
  // Trend rengini belirle (İyi durum yeşil, kötü durum kırmızı)
  // isNegative true ise, artış kötüdür (örn: Risk arttı -> Kırmızı)
  const trendColor = isNegative 
    ? (trendUp ? 'text-red-600' : 'text-green-600') 
    : (trendUp ? 'text-green-600' : 'text-red-600');

  const TrendIcon = trendUp ? ArrowUpRight : ArrowDownRight;

  return (
    <div className={`p-6 rounded-2xl border bg-white shadow-sm flex items-start justify-between group hover:shadow-md transition duration-300`}>
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{title}</p>
        <div className="flex items-baseline gap-1">
          <h2 className="text-3xl font-black text-slate-900">{value}</h2>
          {sub && <span className="text-sm text-gray-400 font-medium">{sub}</span>}
        </div>
        <div className={`flex items-center gap-1 mt-2 text-xs font-bold ${trendColor} bg-slate-50 inline-flex px-2 py-1 rounded-md`}>
          <TrendIcon size={12} />
          {trend} 
          <span className="text-gray-400 font-normal ml-1">geçen haftaya göre</span>
        </div>
      </div>
      <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition duration-300`}>
        {icon}
      </div>
    </div>
  );
}