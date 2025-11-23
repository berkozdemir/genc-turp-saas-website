import { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import { AlertTriangle, CheckCircle, Activity, Headphones } from 'lucide-react'; // İkonlar

export default function SchoolDashboard() {
  const [riskyEntries, setRiskyEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, highRisk: 0, bullying: 0 });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    
    // 1. Riskli Kayıtları Çek (Son 7 gün, Skoru 50 üstü olanlar)
    // Gerçek hayatta 'school_id' ile filtrelemeliyiz.
    const { data, error } = await supabase
      .from('journal_entries')
      .select(`
        id, 
        content, 
        risk_score, 
        ai_tags, 
        created_at,
        profiles:user_id (full_name, avatar_url) -- İlişkili tablodan isim çekme
      `)
      .gt('risk_score', 50) // Sadece riskli olanlar
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) console.error("Veri çekme hatası:", error);
    else {
      setRiskyEntries(data);
      calculateStats(data);
    }
    setLoading(false);
  };

  const calculateStats = (data) => {
    // Basit istatistik hesaplama
    const bullyingCount = data.filter(d => d.ai_tags.includes('bullying')).length;
    setStats({
      total: data.length,
      highRisk: data.filter(d => d.risk_score > 80).length,
      bullying: bullyingCount
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">PDR Kontrol Merkezi</h1>
          <p className="text-gray-500">Genç Turp Erken Uyarı Sistemi - Aktif İzleme</p>
        </div>
        <button onClick={fetchDashboardData} className="bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">
          Yenile 🔄
        </button>
      </div>

      {/* --- İSTATİSTİK KARTLARI (KPIs) --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={<AlertTriangle className="text-red-500" />} 
          title="Yüksek Risk (Acil)" 
          value={stats.highRisk} 
          color="bg-red-50 border-red-200"
        />
        <StatCard 
          icon={<Activity className="text-orange-500" />} 
          title="Aktif Sinyaller" 
          value={stats.total} 
          color="bg-orange-50 border-orange-200"
        />
        <StatCard 
          icon={<Headphones className="text-blue-500" />} 
          title="Zorbalık Şüphesi" 
          value={stats.bullying} 
          color="bg-blue-50 border-blue-200"
        />
        <StatCard 
          icon={<CheckCircle className="text-green-500" />} 
          title="Çözülen Vakalar" 
          value="12" 
          color="bg-green-50 border-green-200"
        />
      </div>

      {/* --- RİSK LİSTESİ (Tablo) --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-800">🚨 İncelenmesi Gereken Sinyaller</h3>
        </div>
        
        {loading ? (
          <div className="p-10 text-center text-gray-400">Veriler taranıyor...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="p-4">Öğrenci</th>
                <th className="p-4">Risk Skoru</th>
                <th className="p-4">AI Kategorisi</th>
                <th className="p-4">Tespit Edilen Metin (Özet)</th>
                <th className="p-4">Aksiyon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {riskyEntries.map((entry) => (
                <RiskRow key={entry.id} entry={entry} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// --- YARDIMCI BİLEŞENLER ---

function StatCard({ icon, title, value, color }) {
  return (
    <div className={`p-6 rounded-xl border ${color} flex items-center gap-4`}>
      <div className="p-3 bg-white rounded-full shadow-sm">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function RiskRow({ entry }) {
  // Skora göre renk belirleme
  const scoreColor = entry.risk_score > 80 ? 'text-red-600 bg-red-100' : 'text-orange-600 bg-orange-100';
  
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
            {/* Avatar yoksa baş harf */}
            {entry.profiles?.full_name?.charAt(0) || '?'}
          </div>
          <span className="font-medium text-gray-700">{entry.profiles?.full_name || 'Anonim Öğrenci'}</span>
        </div>
      </td>
      <td className="p-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${scoreColor}`}>
          %{entry.risk_score}
        </span>
      </td>
      <td className="p-4">
        {entry.ai_tags && entry.ai_tags.map(tag => (
          <span key={tag} className="inline-block bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded mr-1 border border-blue-100 uppercase">
            {tag}
          </span>
        ))}
      </td>
      <td className="p-4 max-w-xs">
        <p className="text-sm text-gray-500 truncate" title={entry.content}>
          "{entry.content}"
        </p>
      </td>
      <td className="p-4">
        <button className="text-sm text-green-600 font-medium hover:underline">
          Detayı Gör &rarr;
        </button>
      </td>
    </tr>
  );
}
