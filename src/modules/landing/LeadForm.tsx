import { useState } from 'react';
import { supabase } from '../../services/supabase';

export default function LeadForm() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const { error } = await supabase
      .from('leads')
      .insert([{ email, role_type: role }]);

    if (error) {
      console.error(error);
      setStatus('error');
    } else {
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 max-w-md mx-auto">
      <h3 className="text-xl font-bold text-gray-800 mb-2">Genç Turp'tan Haberdar Ol 🚀</h3>
      <p className="text-sm text-gray-500 mb-4">Erken erişim ve Spotify avantajı için listeye gir.</p>
      
      {status === 'success' ? (
        <div className="text-green-600 font-medium bg-green-50 p-3 rounded">🌱 Harika! Listeye eklendin.</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Sen kimsin?</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
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
            className="block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />

          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            {status === 'loading' ? 'Gönderiliyor...' : 'Listeye Katıl'}
          </button>
        </form>
      )}
    </div>
  );
}
