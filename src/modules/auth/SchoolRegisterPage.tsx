import { useState } from 'react';
import { supabase } from '../../services/supabase';
import { CheckCircle, Building } from 'lucide-react';
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

    const { error } = await supabase
      .from('school_applications')
      .insert([{
        school_name: formData.schoolName,
        official_email: formData.email,
        phone: formData.phone,
        city: formData.city,
        contact_person: formData.contactPerson
      }]);

    if (error) {
      console.error(error);
      setStatus('error');
    } else {
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-xl text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Başvurunuz Alındı!</h2>
          <p className="text-gray-600 mb-6">
            Genç Turp ekibi başvurunuzu inceleyip 24 saat içinde <strong>{formData.email}</strong> adresine dönüş yapacaktır.
            <br /><br />
            Okulunuz için özel aktivasyon kodu bu mailde yer alacaktır.
          </p>
          <Link to="/" className="text-green-600 font-bold hover:underline">Ana Sayfaya Dön</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-slate-900 p-3 rounded-xl">
            <Building className="text-white w-8 h-8" />
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900">Okulunuzu Geleceğe Hazırlayın</h2>
        <p className="mt-2 text-sm text-gray-600">
          Erken uyarı sistemi ve PDR destek paketi için başvurun.
        </p>
      </div>

      <div className="max-w-md w-full bg-white py-8 px-10 shadow rounded-xl">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Okul Adı</label>
            <input 
              required type="text" 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-slate-500 focus:border-slate-500"
              placeholder="Örn: Ankara Fen Lisesi"
              onChange={e => setFormData({...formData, schoolName: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Yetkili Ad Soyad</label>
            <input 
              required type="text" 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-slate-500 focus:border-slate-500"
              onChange={e => setFormData({...formData, contactPerson: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Şehir</label>
              <input 
                required type="text" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-slate-500 focus:border-slate-500"
                onChange={e => setFormData({...formData, city: e.target.value})}
              />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700">Telefon</label>
               <input 
                 required type="tel" 
                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-slate-500 focus:border-slate-500"
                 placeholder="05..."
                 onChange={e => setFormData({...formData, phone: e.target.value})}
               />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Resmi E-Posta</label>
            <input 
              required type="email" 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-slate-500 focus:border-slate-500"
              placeholder="mudurluk@meb.k12.tr"
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <p className="text-xs text-gray-400 mt-1">Kurumsal iletişim için resmi mail giriniz.</p>
          </div>

          <div>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition"
            >
              {status === 'submitting' ? 'Gönderiliyor...' : 'Başvuruyu Tamamla'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
