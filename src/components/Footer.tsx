import { useState, useEffect } from 'react'; // useEffect eklendi
import { supabase } from '../services/supabase';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Instagram, Twitter, Linkedin, Send, CheckCircle2 } from 'lucide-react';

// Veri Tipi Tanımı
interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  instagram_url: string;
  twitter_url: string;
  linkedin_url: string;
  map_url: string;
}

export default function Footer() {
  const { t } = useTranslation();
  
  // Form State'i
  const [form, setForm] = useState({ fullName: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // İletişim Bilgileri State'i (Veritabanından gelecek)
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  // --- VERİ ÇEKME (ON MOUNT) ---
  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single(); // Tek satır çekiyoruz

      if (error) throw error;
      if (data) setContactInfo(data);
    } catch (err) {
      console.error("Ayar çekme hatası:", err);
      // Hata olursa boş kalmasın diye fallback verisi (isteğe bağlı)
      setContactInfo({
        address: 'Yükleniyor...',
        email: '...',
        phone: '...',
        instagram_url: '#',
        twitter_url: '#',
        linkedin_url: '#',
        map_url: ''
      });
    }
  };

  // --- MESAJ GÖNDERME ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{ 
          full_name: form.fullName, 
          email: form.email, 
          message: form.message 
        }]);

      if (error) throw error;
      
      setStatus('success');
      setForm({ fullName: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);

    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 rounded-t-[3rem] mt-20 relative overflow-hidden">
      
      {/* Arka Plan Efekti */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          
          {/* SOL KOLON: İletişim Bilgileri (DİNAMİK) */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-2 font-bold text-2xl tracking-tight mb-6">
                <div className="w-10 h-10 bg-white text-slate-900 rounded-xl flex items-center justify-center">T</div>
                Turp Modum.
              </div>
              <p className="text-slate-400 max-w-md leading-relaxed">
                Öğrencilerin ruh halini anlayan, okulların güvenliğini artıran yeni nesil yapay zeka platformu.
              </p>
            </div>

            {/* İletişim Kartları - ARTIK SUPABASE'DEN GELİYOR */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ContactItem 
                icon={<MapPin className="text-green-400" />} 
                title={t('footer_address_title')} 
                desc={contactInfo?.address || 'Yükleniyor...'} 
              />
              <ContactItem 
                icon={<Mail className="text-blue-400" />} 
                title="E-Posta" 
                desc={contactInfo?.email || '...'} 
              />
              <ContactItem 
                icon={<Phone className="text-purple-400" />} 
                title="Telefon" 
                desc={contactInfo?.phone || '...'} 
              />
              
              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                 <h4 className="font-bold text-sm mb-3 flex items-center gap-2 text-slate-300">
                    {t('footer_social_title')}
                 </h4>
                 <div className="flex gap-3">
                    <SocialBtn href={contactInfo?.instagram_url} icon={<Instagram size={18} />} />
                    <SocialBtn href={contactInfo?.twitter_url} icon={<Twitter size={18} />} />
                    <SocialBtn href={contactInfo?.linkedin_url} icon={<Linkedin size={18} />} />
                 </div>
              </div>
            </div>

            {/* Harita (Dinamik URL) */}
            <div className="h-64 w-full rounded-3xl overflow-hidden border border-slate-700 shadow-2xl grayscale hover:grayscale-0 transition duration-500 bg-slate-800">
              {contactInfo?.map_url ? (
                <iframe 
                  src={contactInfo.map_url} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  title="Location Map"
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500">Harita Yükleniyor...</div>
              )}
            </div>
          </div>

          {/* SAĞ KOLON: İletişim Formu (Aynı Kaldı) */}
          <div className="bg-white text-slate-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
             {status === 'success' && (
                <div className="absolute inset-0 bg-green-50 flex flex-col items-center justify-center z-20 animate-fade-in-up">
                  <CheckCircle2 size={64} className="text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-green-900">Mesaj İletildi!</h3>
                  <p className="text-green-700">En kısa sürede dönüş yapacağız.</p>
                </div>
             )}

            <h3 className="text-3xl font-bold mb-2">{t('footer_contact_title')} 💬</h3>
            <p className="text-slate-500 mb-8">Sorularınız veya iş birliği için bize yazın.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="group">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1 group-focus-within:text-slate-900 transition">{t('footer_form_name')}</label>
                <input 
                  required type="text" 
                  value={form.fullName}
                  onChange={e => setForm({...form, fullName: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 mt-1 outline-none focus:ring-2 focus:ring-slate-900 transition font-medium"
                />
              </div>

              <div className="group">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1 group-focus-within:text-slate-900 transition">{t('footer_form_email')}</label>
                <input 
                  required type="email" 
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 mt-1 outline-none focus:ring-2 focus:ring-slate-900 transition font-medium"
                />
              </div>

              <div className="group">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1 group-focus-within:text-slate-900 transition">{t('footer_form_message')}</label>
                <textarea 
                  required rows={4}
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 mt-1 outline-none focus:ring-2 focus:ring-slate-900 transition font-medium resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" disabled={status === 'loading'}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-black hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20 disabled:opacity-70"
              >
                {status === 'loading' ? '...' : (
                  <>
                    {t('footer_form_send')} <Send size={20} />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Alt Telif Alanı */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
           <p>© 2025 Omega CRO. {t('footer_rights')}</p>
           <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">Gizlilik Politikası</a>
              <a href="#" className="hover:text-white transition">Kullanım Şartları</a>
           </div>
        </div>

      </div>
    </footer>
  );
}

// Yardımcı Bileşenler (Props Güncellendi)
const ContactItem = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 flex items-start gap-4">
    <div className="bg-slate-900 p-2.5 rounded-xl">{icon}</div>
    <div>
      <h4 className="font-bold text-slate-300 text-sm">{title}</h4>
      <p className="text-slate-400 text-sm break-all">{desc}</p> {/* break-all: uzun mailler taşmasın */}
    </div>
  </div>
);

// Link ekledik
const SocialBtn = ({ icon, href }: { icon: any, href?: string }) => (
  <a 
    href={href || '#'} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white hover:bg-green-500 hover:scale-110 transition duration-300"
  >
    {icon}
  </a>
);