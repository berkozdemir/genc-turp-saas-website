import { useState } from 'react';
import { supabase } from '../../services/supabase';
import { 
  Heart, AlertTriangle, Send, Shield, User, CheckCircle2, Star, ThumbsUp, ShieldCheck, XCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PeerSupport() {
  const [activeTab, setActiveTab] = useState<'support' | 'alert'>('support');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null); // Hata Mesajı State'i

  // Form Verileri
  const [targetName, setTargetName] = useState('');
  const [selectedSticker, setSelectedSticker] = useState('');
  const [alertType, setAlertType] = useState('bullying');
  const [isSerious, setIsSerious] = useState(false);

  // GÜNCELLENMİŞ ÇIKARTMALAR (Ciddi ve Destekleyici)
  const stickers = [
    { id: 'star', label: 'Harikasın!', icon: <Star size={24} />, color: 'bg-yellow-500' },
    { id: 'shield', label: 'Güçlüsün', icon: <ShieldCheck size={24} />, color: 'bg-blue-500' },
    { id: 'hug', label: 'Yanındayım', icon: <Heart size={24} />, color: 'bg-rose-500' },
    { id: 'thumb', label: 'Başarabilirsin', icon: <ThumbsUp size={24} />, color: 'bg-green-500' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null); // Hatayı sıfırla

    // Validasyonlar
    if (activeTab === 'alert' && !isSerious) {
      setErrorMsg("Lütfen beyan kutucuğunu işaretleyerek bildirimin ciddiyetini onaylayın.");
      return;
    }
    if (activeTab === 'support' && !selectedSticker) {
      setErrorMsg("Lütfen bir destek mesajı/çıkartması seçin.");
      return;
    }
    if (!targetName.trim()) {
      setErrorMsg("Lütfen arkadaşınızın ismini yazın.");
      return;
    }

    setLoading(true);

    try {
      // Risk seviyesini belirle
      let severity = 'low';
      if (alertType === 'self_harm') severity = 'critical';
      if (alertType === 'bullying') severity = 'high';

      const payload = {
        target_name: targetName,
        interaction_type: activeTab,
        message_content: activeTab === 'support' ? selectedSticker : alertType,
        is_anonymous: true, // Risk bildirimleri her zaman anonim
        status: severity // PDR ekranında filtrelemek için
      };

      const { error } = await supabase.from('peer_interactions').insert([payload]);

      if (error) throw error;

      // Başarı Efekti
      if (activeTab === 'support') {
        confetti({ particleCount: 150, spread: 60, origin: { y: 0.7 }, colors: ['#FF69B4', '#FFD700'] });
      }
      
      setSuccess(true);
      
      // Formu Temizle
      setTimeout(() => {
        setSuccess(false);
        setTargetName('');
        setSelectedSticker('');
        setIsSerious(false);
        setErrorMsg(null);
      }, 3000);

    } catch (err: any) {
      console.error("Hata Detayı:", err);
      setErrorMsg("Sunucuyla iletişim kurulurken bir hata oluştu. Lütfen internet bağlantınızı kontrol edin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up pb-20 p-6">
      
      {/* Header */}
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Kanka Alanı 🤛</h1>
          <p className="text-slate-500">Arkadaşına güç ver veya sessizce yardım iste.</p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-full">
          <button 
            onClick={() => { setActiveTab('support'); setSuccess(false); setErrorMsg(null); }}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'support' ? 'bg-white shadow-md text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Heart size={18} className={activeTab === 'support' ? 'text-rose-500' : ''} /> Destek Ol
          </button>
          <button 
            onClick={() => { setActiveTab('alert'); setSuccess(false); setErrorMsg(null); }}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'alert' ? 'bg-white shadow-md text-red-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <AlertTriangle size={18} /> Risk Bildir
          </button>
        </div>
      </div>

      {/* --- HATA KUTUSU (Error Handler) --- */}
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl flex items-center gap-3 animate-pulse">
          <XCircle size={24} />
          <span className="font-bold">{errorMsg}</span>
        </div>
      )}

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Sol Bilgi Kartı */}
        <div className={`md:col-span-1 p-8 rounded-[2rem] text-white flex flex-col justify-between shadow-lg ${activeTab === 'support' ? 'bg-gradient-to-br from-rose-500 to-orange-400' : 'bg-gradient-to-br from-slate-800 to-black'}`}>
          <div>
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
              {activeTab === 'support' ? <Heart size={28} fill="currentColor" /> : <Shield size={28} />}
            </div>
            <h3 className="text-2xl font-bold mb-3">
              {activeTab === 'support' ? 'İyilik Yap' : 'Güvenli Alan'}
            </h3>
            <p className="text-white/90 text-sm leading-relaxed">
              {activeTab === 'support' 
                ? "Arkadaşının gününü güzelleştir. Ona yalnız olmadığını hissettir."
                : "Bir arkadaşın zorbalığa mı uğruyor veya kendine zarar vermesinden mi korkuyorsun? Bize bildir. Kimliğin %100 gizli kalacak."}
            </p>
          </div>
          
          {activeTab === 'alert' && (
            <div className="mt-8 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-xs font-medium">
              🛑 <strong>Yasal Uyarı:</strong> Bu alanı gereksiz yere kullanmak veya şaka amaçlı bildirim yapmak okul disiplin yönetmeliğine aykırıdır.
            </div>
          )}
        </div>

        {/* Sağ Form */}
        <div className="md:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
          
          {success ? (
            <div className="absolute inset-0 bg-white flex flex-col items-center justify-center z-10 animate-fade-in-up">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">İletildi!</h3>
              <p className="text-slate-500 mt-2">Sorumluluğun için teşekkürler.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Kimin İçin?</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Öğrenci Adı Soyadı"
                    value={targetName}
                    onChange={(e) => setTargetName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-slate-200 rounded-xl outline-none font-medium transition"
                  />
                </div>
              </div>

              {activeTab === 'support' ? (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Mesajın</label>
                  <div className="grid grid-cols-2 gap-3">
                    {stickers.map((s) => (
                      <div 
                        key={s.id}
                        onClick={() => setSelectedSticker(s.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition flex items-center gap-3 ${
                          selectedSticker === s.id 
                            ? 'border-slate-900 bg-slate-50' 
                            : 'border-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${s.color}`}>
                          {s.icon}
                        </div>
                        <span className="font-bold text-slate-700 text-sm">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Risk Durumu</label>
                    <select 
                      value={alertType}
                      onChange={(e) => setAlertType(e.target.value)}
                      className="w-full p-4 bg-red-50 border-2 border-red-100 rounded-xl outline-none focus:border-red-300 text-red-800 font-bold"
                    >
                      <option value="bullying">Akran Zorbalığı (Sözel/Fiziksel)</option>
                      <option value="depression">Aşırı Mutsuzluk / İçe Kapanma</option>
                      <option value="self_harm">Kendine Zarar Verme Riski (ACİL)</option>
                      <option value="isolation">Yeme Bozukluğu / Madde Şüphesi</option>
                    </select>
                  </div>

                  {/* CİDDİYET ONAYI */}
                  <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition border border-slate-200">
                    <div className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition shrink-0 ${isSerious ? 'bg-red-600 border-red-600' : 'border-slate-400'}`}>
                      {isSerious && <CheckCircle2 size={14} className="text-white" />}
                    </div>
                    <input type="checkbox" checked={isSerious} onChange={(e) => setIsSerious(e.target.checked)} className="hidden" />
                    <span className="text-xs text-slate-600 leading-relaxed">
                      <strong>Beyan Ediyorum:</strong> Bu bildirimi arkadaşımın güvenliği için yapıyorum. Yalan beyanın okul disiplin suçu olduğunu biliyorum ve kabul ediyorum.
                    </span>
                  </label>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-white text-lg flex items-center justify-center gap-2 shadow-lg transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
                  ${activeTab === 'support' 
                    ? 'bg-slate-900 hover:bg-black shadow-slate-200' 
                    : 'bg-red-600 hover:bg-red-700 shadow-red-200'}`}
              >
                {loading ? 'İşleniyor...' : activeTab === 'support' ? 'Gönder' : 'PDR\'ye İlet'} <Send size={20} />
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}