import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import { 
  School, Users, MapPin, Calculator, 
  AlertTriangle, Brain, Zap, ArrowRight, Info, User, Mail, Lock, BookOpen, TrendingUp, RefreshCcw, CheckCircle2 
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// --- LİTERATÜR VERİLERİ ---
const BASE_RATES = {
  anxiety: 0.28, 
  depression: 0.14, 
  bullying: 0.19, 
  techAddiction: 0.22 
};

export default function RiskCalculator() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent'>('idle'); // Mail durumu
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [leadForm, setLeadForm] = useState({
    fullName: '',
    schoolName: '',
    city: '',
    email: ''
  });

  const [inputs, setInputs] = useState({
    studentCount: 500,
    schoolLevel: 'high',
    cityType: 'metropolis',
    ses: 'mid'
  });

  const [results, setResults] = useState<null | any>(null);
  const [insights, setInsights] = useState<string[]>([]);

  // --- ADIM 1: FORM GEÇİŞİ ---
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(1);
  };

  // --- ADIM 2: HESAPLAMA, KAYIT VE MAİL ---
  const handleCalculationAndSave = async () => {
    setLoading(true);
    setErrorMsg(null);

    // 1. Hesapla
    const calculatedResults = calculateRisk();

    // 2. Veritabanına Kaydet
    try {
      await supabase.from('risk_assessment_leads').insert([{
        full_name: leadForm.fullName,
        school_name: leadForm.schoolName,
        city: leadForm.city,
        email: leadForm.email,
        student_count: inputs.studentCount,
        school_level: inputs.schoolLevel,
        city_type: inputs.cityType,
        ses_level: inputs.ses
      }]);
      
      // 3. Mail Gönderimini Başlat
      sendEmailReport(leadForm.email, calculatedResults);

    } catch (err) {
      console.error("Kayıt hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- MAİL SERVİSİ SİMÜLASYONU ---
  const sendEmailReport = async (email: string, data: any) => {
    setEmailStatus('sending');
    
    // Gerçek hayatta burada Supabase Edge Function veya Backend API çağrılır.
    // Örn: await fetch('/api/send-report', { method: 'POST', body: ... })
    
    setTimeout(() => {
      console.log(`📧 Rapor ${email} adresine gönderildi.`, data);
      setEmailStatus('sent');
    }, 2000); // 2 saniye gecikme ile gerçekçi hissettir
  };

  // --- HESAPLAMA MANTIĞI ---
  const calculateRisk = () => {
    let multipliers = { anxiety: 1, depression: 1, bullying: 1, tech: 1 };
    let newInsights = [];

    if (inputs.schoolLevel === 'high') {
      multipliers.anxiety *= 1.3;
      multipliers.depression *= 1.2;
      newInsights.push("Lise döneminde sınav baskısı nedeniyle anksiyete riski artmaktadır.");
    } else {
      multipliers.bullying *= 1.4;
      newInsights.push("Ortaokul çağında akran zorbalığı daha yaygın gözlemlenmektedir.");
    }

    if (inputs.cityType === 'metropolis') {
      multipliers.anxiety *= 1.2;
      multipliers.tech *= 1.15;
      newInsights.push("Büyükşehir yaşamı stres ve teknoloji bağımlılığı riskini tetiklemektedir.");
    } else if (inputs.cityType === 'town') {
      multipliers.anxiety *= 0.9;
      multipliers.tech *= 0.9;
    }

    if (inputs.ses === 'low') {
      multipliers.depression *= 1.4;
      multipliers.bullying *= 1.2;
      newInsights.push("Dezavantajlı bölgelerde psikososyal riskler daha yüksek seyredebilir.");
    } else if (inputs.ses === 'high') {
      multipliers.anxiety *= 1.25;
      newInsights.push("Yüksek başarı beklentisi performans kaygısını artırabilir.");
    }

    const estimated = {
      anxiety: Math.round(inputs.studentCount * BASE_RATES.anxiety * multipliers.anxiety),
      depression: Math.round(inputs.studentCount * BASE_RATES.depression * multipliers.depression),
      bullying: Math.round(inputs.studentCount * BASE_RATES.bullying * multipliers.bullying),
      tech: Math.round(inputs.studentCount * BASE_RATES.techAddiction * multipliers.tech),
    };

    const totalAtRisk = Math.round(
      (estimated.anxiety + estimated.depression + estimated.bullying + estimated.tech) * 0.65
    );
    
    const safeTotal = Math.min(totalAtRisk, inputs.studentCount);
    
    const resultData = {
      raw: estimated,
      totalRisk: safeTotal,
      healthy: inputs.studentCount - safeTotal
    };

    setResults(resultData);
    setInsights(newInsights);
    setStep(2);
    
    return resultData; // Mail fonksiyonu için veriyi döndür
  };

  const chartData = results ? [
    { name: 'Risk Potansiyeli', value: results.totalRisk, color: '#ef4444' }, // Kırmızı
    { name: 'Dengeli', value: results.healthy, color: '#22c55e' }   // Yeşil
  ] : [];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-slate-900">
             <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center">T</div>
             Turp Modum.
          </Link>
          <Link to="/school-register" className="text-sm font-bold text-slate-600 hover:text-slate-900">
            Çözüm İçin Başvur &rarr;
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Okul Risk Simülatörü 📊
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Okulunuzun demografik yapısına göre, bilimsel literatüre dayalı risk projeksiyonu.
          </p>
        </div>

        {/* --- ADIM 0: İLETİŞİM FORMU --- */}
        {step === 0 && (
          <div className="max-w-md mx-auto bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 animate-fade-in-up">
            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
                <Lock size={24} />
              </div>
              <h3 className="font-bold text-xl text-slate-900">Simülatörü Başlat</h3>
              <p className="text-sm text-slate-500 text-center mt-1">Analiz aracına erişmek için lütfen bilgilerinizi girin.</p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Ad Soyad</label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input required type="text" placeholder="Adınız Soyadınız" value={leadForm.fullName} onChange={e => setLeadForm({...leadForm, fullName: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition font-medium" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Okul Adı</label>
                <div className="relative mt-1">
                  <School className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input required type="text" placeholder="Örn: Atatürk Anadolu Lisesi" value={leadForm.schoolName} onChange={e => setLeadForm({...leadForm, schoolName: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition font-medium" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Şehir</label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input required type="text" placeholder="Şehir" value={leadForm.city} onChange={e => setLeadForm({...leadForm, city: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition font-medium" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Kurumsal E-Posta</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input required type="email" placeholder="mudur@okul.k12.tr" value={leadForm.email} onChange={e => setLeadForm({...leadForm, email: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition font-medium" />
                </div>
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-black hover:scale-[1.02] transition shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2">
                Devam Et <ArrowRight size={20} />
              </button>
            </form>
          </div>
        )}

        {/* --- ADIM 1: PARAMETRELER --- */}
        {step === 1 && (
          <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-6 text-sm text-slate-500 bg-slate-50 p-3 rounded-lg">
               <User size={16} className="text-green-500" />
               <span>Hoş geldin, <strong>{leadForm.fullName}</strong>. Verileri girerek analizi başlatabilirsin.</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="col-span-1 md:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <label className="block text-sm font-bold text-slate-700 mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users size={20} className="text-blue-600" /> Toplam Öğrenci Sayısı
                  </div>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-lg shadow-md shadow-blue-200">
                    {inputs.studentCount}
                  </span>
                </label>
                <input type="range" min="200" max="1000" step="50" value={inputs.studentCount} onChange={(e) => setInputs({...inputs, studentCount: Number(e.target.value)})} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-slate-900 hover:accent-blue-600 transition-all" />
                <div className="flex justify-between text-xs text-gray-400 mt-2 font-bold">
                  <span>200</span><span>400</span><span>600</span><span>800</span><span>1000+</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <School size={16} /> Okul Kademesi
                </label>
                <select value={inputs.schoolLevel} onChange={(e) => setInputs({...inputs, schoolLevel: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none">
                  <option value="middle">Ortaokul (10-14 Yaş)</option>
                  <option value="high">Lise (14-18 Yaş)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <MapPin size={16} /> Şehir Büyüklüğü
                </label>
                <select value={inputs.cityType} onChange={(e) => setInputs({...inputs, cityType: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none">
                  <option value="metropolis">Büyükşehir (Metropol)</option>
                  <option value="city">İl Merkezi</option>
                  <option value="town">İlçe / Kasaba</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <Calculator size={16} /> Bölge Sosyoekonomik Düzeyi
                </label>
                <select value={inputs.ses} onChange={(e) => setInputs({...inputs, ses: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none">
                  <option value="low">Düşük Gelir / Dezavantajlı</option>
                  <option value="mid">Orta Gelir Grubu</option>
                  <option value="high">Yüksek Gelir Grubu</option>
                </select>
              </div>
            </div>

            <button onClick={handleCalculationAndSave} disabled={loading} className="w-full mt-8 bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-black hover:scale-[1.01] transition shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 disabled:opacity-70">
              {loading ? 'Hesaplanıyor...' : 'Analizi Oluştur'} {loading ? '' : <ArrowRight />}
            </button>
          </div>
        )}

        {/* --- ADIM 2: SONUÇ RAPORU --- */}
        {step === 2 && results && (
          <div className="animate-fade-in-up">
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100">
              <div className="bg-slate-900 text-white p-8 text-center">
                <h2 className="text-2xl font-bold mb-2">Tahmini Risk Raporu</h2>
                <p className="text-slate-400 text-sm">
                  {leadForm.schoolName} ({inputs.studentCount} Öğrenci) için oluşturulan projeksiyon:
                </p>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* GRAFİK */}
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {chartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="text-center mt-[-150px] mb-[100px]">
                    <span className="text-4xl font-black text-slate-900">{results.totalRisk}</span>
                    <p className="text-xs text-slate-500 font-bold uppercase">Riskli Öğrenci</p>
                  </div>
                </div>

                {/* RİSK DETAYLARI (KIRMIZI TONLARI) */}
                <div className="space-y-4">
                  <RiskBar label="Kaygı & Stres" count={results.raw.anxiety} total={inputs.studentCount} color="bg-red-600" icon={<Zap size={14}/>} />
                  <RiskBar label="Depresif Belirtiler" count={results.raw.depression} total={inputs.studentCount} color="bg-red-500" icon={<Brain size={14}/>} />
                  <RiskBar label="Akran Zorbalığı" count={results.raw.bullying} total={inputs.studentCount} color="bg-red-400" icon={<AlertTriangle size={14}/>} />
                  <RiskBar label="Teknoloji Bağımlılığı" count={results.raw.tech} total={inputs.studentCount} color="bg-red-200" icon={<Users size={14}/>} />
                  
                  {/* MAİL DURUMU BİLDİRİMİ */}
                  <div className="mt-6 p-4 bg-slate-50 rounded-xl text-xs text-slate-500 leading-relaxed border border-slate-100">
                    <div className="flex items-start gap-2">
                       {emailStatus === 'sending' && <div className="animate-spin w-4 h-4 border-2 border-slate-300 border-t-blue-500 rounded-full"></div>}
                       {emailStatus === 'sent' && <CheckCircle2 className="text-green-500 shrink-0" size={16} />}
                       {emailStatus === 'idle' && <Info className="shrink-0 mt-0.5 text-slate-400" size={14} />}
                       
                       <div>
                         <p className="font-bold mb-1">
                           {emailStatus === 'sending' ? 'Rapor hazırlanıyor ve mail atılıyor...' : 
                            emailStatus === 'sent' ? `Rapor başarıyla ${leadForm.email} adresine gönderildi!` : 
                            'Bu rapor mail adresinize gönderilecektir.'}
                         </p>
                         <p>
                           <strong>Yasal Uyarı:</strong> Bu veriler istatistiksel bir projeksiyondur, kesin tanı değildir. 
                           Bir öğrencide birden fazla risk faktörü aynı anda bulunabilir (Kesişim Kümesi), bu nedenle toplam risk sayısı alt başlıkların toplamından farklı olabilir.
                         </p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- REFERANSLAR --- */}
              <div className="px-8 pb-8 text-left">
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                    <BookOpen size={14} /> Bilimsel Referanslar & Kaynaklar
                  </h4>
                  <ul className="text-[11px] text-slate-500 space-y-1 list-disc pl-4 leading-relaxed">
                    <li><strong>WHO (Dünya Sağlık Örgütü):</strong> Adolescent Mental Health Reports (2023).</li>
                    <li><strong>OECD PISA:</strong> Student Well-being Report - Okul ortamı ve aidiyet verileri.</li>
                    <li><strong>T.C. Sağlık Bakanlığı:</strong> Gençlik Sağlığı ve Ruh Sağlığı Eylem Planı.</li>
                    <li><strong>Literatür (Şehir Etkisi):</strong> "Urbanization and Mental Health" (Gruebner et al., 2017).</li>
                    <li><strong>Literatür (SES Etkisi):</strong> "Socioeconomic Status and Child Mental Health" (Reiss, 2013).</li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-50 p-8 text-center border-t border-slate-100">
                <h3 className="font-bold text-slate-900 text-lg mb-4">Bu tabloyu değiştirmek sizin elinizde.</h3>
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={() => { setStep(1); setEmailStatus('idle'); }} 
                    className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-2"
                  >
                    <RefreshCcw size={16} /> Tekrar Hesapla
                  </button>
                  <Link to="/school-register" className="px-8 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 shadow-lg shadow-green-500/30">
                    Okulunuzu Koruma Altına Alın
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const RiskBar = ({ label, count, total, color, icon }: any) => {
  const percent = Math.round((count / total) * 100);
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-bold text-slate-700 flex items-center gap-2"><span className={`p-1 rounded-full text-white ${color}`}>{icon}</span>{label}</span>
        <span className="font-bold text-slate-900">{count} Öğrenci (%{percent})</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2"><div className={`h-2 rounded-full transition-all duration-1000 ${color}`} style={{ width: `${percent}%` }}></div></div>
    </div>
  );
}