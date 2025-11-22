import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import { User, School, Lock, Mail, ArrowRight, Music } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('student'); // 'student' | 'school'
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(''); // Sadece kayıt için
  const [schoolCode, setSchoolCode] = useState(''); // Sadece öğrenci kaydı için

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegistering) {
        // --- KAYIT OLMA (REGISTER) ---
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        if (data.user) {
          // Profil oluştur
          await supabase.from('profiles').insert([{
            id: data.user.id,
            full_name: fullName,
            role: mode === 'student' ? 'student' : 'pdr',
            // Öğrenciyse okul koduyla okulu bulup eşleştirmek gerekir (Backend işi)
            // Şimdilik placeholder
          }]);
          alert("Kayıt başarılı! Lütfen e-postanı onayla.");
        }
      } else {
        // --- GİRİŞ YAPMA (LOGIN) ---
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        // Başarılı giriş sonrası yönlendirme
        navigate(mode === 'student' ? '/student/dashboard' : '/school/dashboard');
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${mode === 'student' ? 'bg-green-50' : 'bg-slate-50'}`}>
      
      {/* Ana Kart */}
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* SOL TARAF: Görsel ve Mesaj */}
        <div className={`md:w-1/2 p-10 text-white flex flex-col justify-between transition-colors duration-500 ${mode === 'student' ? 'bg-green-600' : 'bg-slate-800'}`}>
          <div>
            <h1 className="text-3xl font-bold mb-2">Genç Turp 🌱</h1>
            <p className="opacity-90">
              {mode === 'student' 
                ? "Duygularını anlayan, seni yargılamayan dijital alan." 
                : "Okulunuz için veriye dayalı psikolojik danışmanlık asistanı."}
            </p>
          </div>

          {mode === 'student' && (
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 mt-8">
              <div className="flex items-center gap-3 mb-2">
                <Music className="w-6 h-6 text-green-300" />
                <span className="font-bold text-sm">Spotify Premium Fırsatı</span>
              </div>
              <p className="text-xs opacity-80">Okul kodunla giriş yap, 3 ay ücretsiz müzik keyfini kaçırma.</p>
            </div>
          )}

          {mode === 'school' && (
             <div className="mt-8">
               <p className="text-sm font-medium mb-2">Henüz üye değil misiniz?</p>
               <button 
                 onClick={() => navigate('/school-register')}
                 className="bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-bold w-full hover:bg-slate-100 transition"
               >
                 Okul Başvurusu Yap &rarr;
               </button>
             </div>
          )}
        </div>

        {/* SAĞ TARAF: Form */}
        <div className="md:w-1/2 p-10 relative">
          {/* Mod Değiştirici (Switch) */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
            <button 
              onClick={() => setMode('student')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition ${mode === 'student' ? 'bg-white shadow text-green-700' : 'text-gray-500'}`}
            >
              <User size={16} /> Öğrenci
            </button>
            <button 
              onClick={() => setMode('school')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition ${mode === 'school' ? 'bg-white shadow text-slate-800' : 'text-gray-500'}`}
            >
              <School size={16} /> Okul / PDR
            </button>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {isRegistering ? 'Hesap Oluştur' : 'Tekrar Hoş Geldin'}
          </h2>

          <form onSubmit={handleAuth} className="space-y-4">
            {isRegistering && (
              <>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Ad Soyad</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Adın Soyadın"
                  />
                </div>
                {mode === 'student' && (
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Okul Aktivasyon Kodu</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                      value={schoolCode}
                      onChange={e => setSchoolCode(e.target.value)}
                      placeholder="Örn: TR-34-LİSE"
                    />
                  </div>
                )}
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">E-Posta</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input 
                  type="email" 
                  className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="ornek@okul.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input 
                  type="password" 
                  className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-bold shadow-lg transition transform active:scale-95 flex justify-center items-center gap-2 ${mode === 'student' ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-800 hover:bg-slate-900'}`}
            >
              {loading ? 'İşleniyor...' : (isRegistering ? 'Kayıt Ol' : 'Giriş Yap')} <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-sm text-gray-500 hover:underline"
            >
              {isRegistering ? 'Zaten hesabın var mı? Giriş Yap' : 'Hesabın yok mu? Kayıt Ol'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
