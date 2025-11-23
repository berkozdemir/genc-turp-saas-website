import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import { 
  AlertTriangle, CheckCircle, Activity, Headphones, Play, // <--- Play EKLENDİ
  Search, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight,
  LayoutDashboard, Users, FileText, Settings, LogOut, Bell, Building
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

// --- MOCK DATA (Trend Grafiği İçin) ---
const TREND_DATA = [
  { name: 'Pzt', risk: 45, mood: 60 },
  { name: 'Sal', risk: 52, mood: 55 },
  { name: 'Çar', risk: 38, mood: 70 },
  { name: 'Per', risk: 65, mood: 40 },
  { name: 'Cum', risk: 48, mood: 65 },
  { name: 'Cmt', risk: 25, mood: 80 },
  { name: 'Paz', risk: 30, mood: 75 },
];

export default function SchoolDashboard() {
  const [riskyEntries, setRiskyEntries] = useState([]);
  const [peerAlerts, setPeerAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // İstatistikler
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
    
    try {
      // 1. AI RİSKLERİ
      const { data: aiData } = await supabase
        .from('journal_entries')
        .select('id, content, ai_risk_score, ai_tags, created_at')
        .gt('ai_risk_score', 30)
        .order('created_at', { ascending: false })
        .limit(10);

      // 2. AKRAN BİLDİRİMLERİ
      const { data: alertData } = await supabase
        .from('peer_interactions')
        .select('*')
        .eq('interaction_type', 'alert')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (aiData) setRiskyEntries(aiData);
      if (alertData) setPeerAlerts(alertData);

      setStats({
        totalRisk: (aiData?.length || 0) + (alertData?.length || 0),
        urgentCases: (aiData?.filter(x => x.ai_risk_score > 70).length || 0) + (alertData?.filter(x => x.message_content === 'self_harm').length || 0),
        avgMoodScore: 7.2
      });

    } catch (error) {
      console.error("Veri çekme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col md:flex-row">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-full md:w-72 bg-white border-r border-gray-100 flex flex-col justify-between fixed bottom-0 md:relative z-30 md:h-screen order-2 md:order-1 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-8 hidden md:block">
          <div className="flex items-center gap-3 font-bold text-2xl tracking-tight mb-12 text-slate-900">
            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg shadow-slate-200">T</div> {/* 'G' yerine 'T' oldu */}
            Turp Modum. {/* GençTurp. yerine Turp Modum. */}
          </div>
          
          <div className="mb-8 px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <Building size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Kurum</p>
                <p className="text-sm font-bold text-slate-900">Atatürk Lisesi</p>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            <Link to="/school/dashboard">
              <NavItem icon={<LayoutDashboard size={20} />} label="Kontrol Merkezi" active />
            </Link>
            <Link to="/school/students">
              <NavItem icon={<Users size={20} />} label="Öğrenci Listesi" />
            </Link>
            <Link to="/school/reports">
              <NavItem icon={<FileText size={20} />} label="Raporlar" />
            </Link>
            <Link to="/school/settings">
              <NavItem icon={<Settings size={20} />} label="Okul Ayarları" />
            </Link>
          </nav>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex justify-around items-center p-4 bg-white border-t border-gray-200 pb-safe safe-area-pb">
          <Link to="/school/dashboard"><LayoutDashboard size={24} className="text-slate-900" /></Link>
          <Link to="/school/students"><Users size={24} className="text-gray-400" /></Link>
          <Link to="/school/reports"><FileText size={24} className="text-gray-400" /></Link>
          <Link to="/school/settings"><Settings size={24} className="text-gray-400" /></Link>
        </div>

        <div className="p-8 hidden md:block">
          <Link to="/" className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition font-medium px-2 group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition" />
            Çıkış Yap
          </Link>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto pb-24 md:pb-10 order-1 md:order-2">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Yönetim Paneli 🏫</h1>
            <p className="text-slate-500 mt-1">Anlık PDR analizleri ve risk raporları.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 bg-white border border-gray-200 rounded-full text-slate-400 hover:text-slate-900 transition relative">
               <Bell size={20} />
               {(stats.totalRisk > 0) && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>}
            </button>
            <button className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-black shadow-lg shadow-slate-900/20 flex items-center gap-2" onClick={fetchDashboardData}>
              Rapor Al
            </button>
          </div>
        </div>

        {/* KPI Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <KpiCard 
            title="Toplam Risk Sinyali" value={stats.totalRisk} trend="+12%" trendUp={true} 
            icon={<Activity className="text-orange-600" />} color="bg-orange-50 border-orange-100"
          />
          <KpiCard 
            title="Acil Müdahale" value={stats.urgentCases} trend="+2" trendUp={true} isNegative={true}
            icon={<AlertTriangle className="text-red-600" />} color="bg-red-50 border-red-100"
          />
          <KpiCard 
            title="Okul Ortalaması" value={stats.avgMoodScore} sub="/ 10" trend="-0.4" trendUp={false}
            icon={<CheckCircle className="text-green-600" />} color="bg-green-50 border-green-100"
          />
           <KpiCard 
            title="Aktif Dinlenme" value="845" sub="dk" trend="+24%" trendUp={true} 
            icon={<Headphones className="text-purple-600" />} color="bg-purple-50 border-purple-100"
          />
        </div>

        {/* Grafikler & Bildirimler */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Sol: Trend Grafiği */}
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
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                  <Area type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorRisk)" name="Risk Skoru" />
                  <Area type="monotone" dataKey="mood" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorMood)" name="Mutluluk" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sağ: Akran Bildirimleri */}
          <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-red-900 text-lg flex items-center gap-2">
                <AlertTriangle size={20} className="text-red-600" /> Akran Bildirimleri
              </h3>
              <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">
                {peerAlerts.length} Yeni
              </span>
            </div>

            <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
              {peerAlerts.length === 0 ? (
                <div className="text-center text-slate-400 py-10 text-sm flex flex-col items-center">
                  <CheckCircle size={32} className="mb-2 text-green-200" />
                  Temiz! Yeni bildirim yok.
                </div>
              ) : (
                peerAlerts.map((alert) => (
                  <div key={alert.id} className="bg-red-50 p-3 rounded-xl border border-red-100 hover:shadow-md transition cursor-pointer group">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-red-400 font-bold uppercase mb-1">Hedef Öğrenci</p>
                        <p className="font-bold text-slate-900">{alert.target_name}</p>
                      </div>
                      <span className="text-[10px] bg-white text-slate-500 px-2 py-1 rounded border border-slate-100">
                        {new Date(alert.created_at).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs font-bold text-red-700">Sebep:</span>
                      <span className={`text-xs px-2 py-0.5 rounded font-bold ${alert.message_content === 'self_harm' ? 'bg-red-600 text-white animate-pulse' : 'bg-white text-red-800 border border-red-100'}`}>
                        {alert.message_content === 'self_harm' ? 'ACİL: Kendine Zarar' : 
                         alert.message_content === 'bullying' ? 'Zorbalık' : 
                         alert.message_content === 'isolation' ? 'İçe Kapanma' : 
                         alert.message_content === 'depression' ? 'Depresyon' : alert.message_content}
                      </span>
                    </div>
                    <div className="hidden group-hover:block mt-3 pt-3 border-t border-red-200 animate-fade-in-up">
                      <p className="text-[10px] text-slate-500 font-bold mb-1">ÖNERİLEN GÖRÜŞME:</p>
                      <p className="text-xs text-slate-700 italic leading-relaxed">
                        "{alert.message_content === 'self_harm' 
                          ? 'Acil bir evrak imzası bahanesiyle hemen odana çağır. Yalnız bırakma.' 
                          : 'Dönem değerlendirmesi veya ders programı bahanesiyle rutin görüşmeye davet et.'}"
                      </p>
                      <button className="w-full mt-2 bg-red-600 text-white text-xs py-1.5 rounded hover:bg-red-700 transition font-bold">
                        İncelendi Olarak İşaretle
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* --- Risk Tablosu --- */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-lg">🚨 AI Tespitli Risk Sinyalleri</h3>
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
                  <td className="p-4 font-mono text-sm text-slate-600">#{entry.id.toString().substring(0,8)}...</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full max-w-[80px] h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${entry.ai_risk_score > 80 ? 'bg-red-500' : 'bg-orange-400'}`} style={{ width: `${entry.ai_risk_score}%` }}></div>
                      </div>
                      <span className={`text-xs font-bold ${entry.ai_risk_score > 80 ? 'text-red-600' : 'text-orange-600'}`}>%{entry.ai_risk_score}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {entry.ai_tags && entry.ai_tags.map(tag => (
                      <span key={tag} className="inline-block bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded uppercase mr-1">{tag}</span>
                    ))}
                  </td>
                  <td className="p-4 max-w-xs">
                    <p className="text-sm text-gray-500 truncate group-hover:whitespace-normal group-hover:absolute group-hover:bg-white group-hover:shadow-lg group-hover:p-3 group-hover:rounded-lg group-hover:z-10 group-hover:border group-hover:border-gray-100 transition-all">"{entry.content}"</p>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-slate-400 hover:text-slate-900 transition"><MoreHorizontal size={20} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <div className="p-8 text-center text-gray-400 text-sm">Veriler taranıyor...</div>}
        </div>

      </main>
    </div>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <div className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition duration-200 group ${active ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
      <span>{icon}</span><span className="text-sm font-bold">{label}</span>
    </div>
  );
}

function KpiCard({ title, value, sub, trend, trendUp, isNegative, icon, color }) {
  const trendColor = isNegative ? (trendUp ? 'text-red-600' : 'text-green-600') : (trendUp ? 'text-green-600' : 'text-red-600');
  const TrendIcon = trendUp ? ArrowUpRight : ArrowDownRight;
  return (
    <div className={`p-6 rounded-2xl border bg-white shadow-sm flex items-start justify-between group hover:shadow-md transition duration-300`}>
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{title}</p>
        <div className="flex items-baseline gap-1"><h2 className="text-3xl font-black text-slate-900">{value}</h2>{sub && <span className="text-sm text-gray-400 font-medium">{sub}</span>}</div>
        <div className={`flex items-center gap-1 mt-2 text-xs font-bold ${trendColor} bg-slate-50 inline-flex px-2 py-1 rounded-md`}><TrendIcon size={12} />{trend} <span className="text-gray-400 font-normal ml-1">geçen haftaya göre</span></div>
      </div>
      <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition duration-300`}>{icon}</div>
    </div>
  );
}