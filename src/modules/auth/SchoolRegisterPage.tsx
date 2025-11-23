import { useState } from 'react';
import { supabase } from '../../services/supabase';
import { CheckCircle, Building, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SchoolRegisterPage() {
  const [formData, setFormData] = useState({
    schoolName: '',
    email: '',
    phone: '',
    city: '',
    contactPerson: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Supabase'e veri gönderimi
      const { error } = await supabase
        .from('school_applications')
        .insert([{
          school_name: formData.schoolName,
          official_email: formData.email,
          phone: formData.phone,
          city: formData.city,
          contact_person: formData.contactPerson
        }]);

      if (error) throw error;

      setStatus('success');
    } catch (error) {
      console.error('Kayıt Hatası:', error);
      setStatus('error');
    }
  };

  // --- BAŞARILI EKRANI ---
  if (status === 'success') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-xl text-center border border-green-100">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Başvurunuz Alındı!</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Turp Modum ekibi başvurunuzu inceleyip 24 saat içinde <strong>{formData.email}</strong> adresine dönüş yapacaktır.
          </p>
          <div className="bg-slate-50 p-4 rounded-xl mb-6 text-sm text-slate-500">
            Referans Kodunuz: <span className="font-mono font-bold text-slate-900">TRP-{Math.floor(Math.random() * 10000)}</span>
          </div>
          <Link to="/" className="inline-block bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="mb-8 text-center">
        <Link to="/" className="inline-flex justify-center mb-4 hover:scale-110 transition">
          <div className="bg-slate-900 p-3 rounded-xl shadow-lg shadow-slate-200">
            <Building className="text-white w-8 h-8" />
          </div>
        </Link>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Okulunuzu Geleceğe Hazırlayın</h2>
        <p className="mt-2 text-sm text-slate-500">
          Erken uyarı sistemi ve PDR destek paketi için başvuru formu.
        </p>
      </div>

      <div className="max-w-md w-full bg-white py-8 px-10 shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-100">
        
        {status === 'error' && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm">
            <AlertCircle size={16} />
            <span>Bir hata oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyin.</span>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Okul Adı</label>
            <input 
              required type="text" 
              className="block w-full border border-gray-200 rounded-xl shadow-sm py-3 px-4 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition"
              placeholder="Örn: Ankara Fen Lisesi"
              value={formData.schoolName}
              onChange={e => setFormData({...formData, schoolName: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Yetkili Ad Soyad</label>
            <input 
              required type="text" 
              className="block w-full border border-gray-200 rounded-xl shadow-sm py-3 px-4 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition"
              value={formData.contactPerson}
              onChange={e => setFormData({...formData, contactPerson: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Şehir</label>
              <input 
                required type="text" 
                className="block w-full border border-gray-200 rounded-xl shadow-sm py-3 px-4 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition"
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
              />
            </div>
            <div>
               <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Telefon</label>
               <input 
                 required type="tel" 
                 className="block w-full border border-gray-200 rounded-xl shadow-sm py-3 px-4 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition"
                 placeholder="05..."
                 value={formData.phone}
                 onChange={e => setFormData({...formData, phone: e.target.value})}
               />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Resmi E-Posta</label>
            <input 
              required type="email" 
              className="block w-full border border-gray-200 rounded-xl shadow-sm py-3 px-4 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition"
              placeholder="mudurluk@meb.k12.tr"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <p className="text-[10px] text-slate-400 mt-1.5 ml-1">Kurumsal iletişim için resmi mail giriniz.</p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-slate-900/20 text-sm font-bold text-white bg-slate-900 hover:bg-black hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Gönderiliyor...
                </span>
              ) : 'Başvuruyu Tamamla'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}