import { useState } from 'react';
import { supabase } from '../../services/supabase';

export default function LeadForm() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error } = await supabase
        .from('leads')
        .insert([{ email, role_type: role }]);

      if (error) throw error;

      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 max-w-md mx-auto relative overflow-hidden">
      {status === 'success' && (
         <div className="absolute inset-0 bg-green-50 flex flex-col items-center justify-center text-center z-10 animate-fade-in-up">
            <div className="text-2xl mb-2">🎉</div>
            <h4 className="font-bold text-green-800">Harika!</h4>
            <p className="text-sm text-green-600 px-4">Listeye eklendin. Gelişmelerden seni haberdar edeceğiz.</p>
            <button onClick={() => setStatus('idle')} className="mt-4 text-xs font-bold text-green-700 underline">Yeni Kayıt</button>
         </div>
      )}

      <h3 className="text-xl font-bold text-gray-800 mb-2">Genç Turp'tan Haberdar Ol 🚀</h3>
      <p className="text-sm text-gray-500 mb-4">Erken erişim ve Spotify avantajı için listeye gir.</p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="block w-full rounded-lg border-gray-200 bg-gray-50 shadow-sm focus:border-slate-900 focus:ring-slate-900 p-2.5 text-sm font-medium outline-none transition"
          >
            <option value="student">Öğrenciyim 🎒</option>
            <option value="school">Okul Yöneticisiyim 🏫</option>
            <option value="pdr">PDR Uzmanıyım 🧠</option>
          </select>
        </div>
        
        <input
          type="email"
          placeholder="E-posta adresin"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full rounded-lg border-gray-200 shadow-sm p-3 border focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition"
        />

        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="w-full bg-slate-900 text-white py-3 px-4 rounded-lg font-bold hover:bg-black transition shadow-lg shadow-slate-900/20 disabled:opacity-70"
        >
          {status === 'loading' ? 'Gönderiliyor...' : 'Listeye Katıl'}
        </button>
        
        {status === 'error' && (
          <p className="text-xs text-red-500 text-center font-bold">Bir hata oluştu, tekrar dene.</p>
        )}
      </form>
    </div>
  );
}