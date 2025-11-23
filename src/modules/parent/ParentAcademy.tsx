import { Link } from 'react-router-dom';
import { 
    Home, Users, Heart, GraduationCap, Settings, LogOut, 
    MessageSquare, BookOpen, Clock, Zap, Target 
} from 'lucide-react';
import SeoHelmet from '../../components/SeoHelmet';

// Yan Menü Bileşeni (ParentDashboard'dan kopyalandı)
const ParentSidebar = () => {
    const navItems = [
      { name: 'Genel Durum', icon: Home, link: '/parent/dashboard' },
      { name: 'Veli Akademisi', icon: BookOpen, link: '/parent/academy' },
      { name: 'İletişim', icon: MessageSquare, link: '/parent/messages' },
      { name: 'Ayarlar', icon: Settings, link: '/parent/settings' },
    ];
  
    return (
      <div className="w-64 bg-white border-r border-gray-100 p-6 flex flex-col h-full sticky top-0 hidden md:flex">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 mb-8">
          <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center">T</div>
          Turp Modum.
        </div>
        
        {/* Navigasyon */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                item.link === '/parent/academy' // Şu an Academy'yi aktif kabul ediyoruz
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-gray-100'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
  
        {/* Footer / Çıkış */}
        <div className="pt-6 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Çıkış Yap</span>
          </button>
        </div>
      </div>
    );
  };

// Makale Kartı Bileşeni
const ArticleCard = ({ title, category, readingTime, image, link }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transform transition duration-300 hover:shadow-xl hover:-translate-y-0.5">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-6">
            <div className="flex justify-between items-center text-xs font-semibold uppercase text-gray-500 mb-2">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-slate-700">{category}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {readingTime}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">{title}</h3>
            <Link to={link} className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition">
                Makaleyi Oku <ArrowLeft className="rotate-180 ml-1" size={16} />
            </Link>
        </div>
    </div>
);

// Ana Akademi Bileşeni
export default function ParentAcademy() {
    const articles = [
        { 
            title: "Ergenlik Döneminde Pozitif İletişim Kurmanın 5 Anahtarı", 
            category: "Ergenlik", 
            readingTime: "7 dakika", 
            image: "https://images.unsplash.com/photo-1517404215738-15263e9f9178?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4ODdfMHwxfHNlYXJjaHwyMHx8YWRvbGVzY2VudHxlbnwwfHx8fDE3MTgxODcyMTF8&ixlib=rb-4.0.3&q=80&w=600",
            link: "#" 
        },
        { 
            title: "Sınav Kaygısı: Çocuğuma Nasıl Destek Olabilirim?", 
            category: "Sınav Süreci", 
            readingTime: "10 dakika", 
            image: "https://images.unsplash.com/photo-1542810634-71277d95ae51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4ODdfMHwxfHNlYXJjaHwyMHx8ZXhhbSUyMGFueng3fGVufDB8fHx8MTcxODE4NzIxMXww&ixlib=rb-4.0.3&q=80&w=600",
            link: "#" 
        },
        { 
            title: "Dijital Çağda Teknoloji Bağımlılığı ve Sınırlar", 
            category: "Dijital Refah", 
            readingTime: "8 dakika", 
            image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4ODdfMHwxfHNlYXJjaHwyMHx8ZGlnaXRhbCUyMG5hdGl2ZXN8ZW58MHx8fHwxNzE4MTg3MjExfDA&ixlib=rb-4.0.3&q=80&w=600",
            link: "#" 
        },
        { 
            title: "Uyku Düzeni: Ergenlikte Başarısızlığın Gizli Düşmanı", 
            category: "Fiziksel Sağlık", 
            readingTime: "6 dakika", 
            image: "https://images.unsplash.com/photo-1512496014459-3d02b9e69f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4ODdfMHwxfHNlYXJjaHwyMHx8c2xlZXAlMjB0ZWVuYWdlcnxlbnwwfHx8fDE3MTgxODcyMTF8&ixlib=rb-4.0.3&q=80&w=600",
            link: "#" 
        },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col md:flex-row">
            
            {/* --- SEO BİLEŞENİ --- */}
            <SeoHelmet slug="parent-academy" localTitle="Veli Akademisi - Turp Modum" />

            {/* Yan Menü */}
            <ParentSidebar />

            {/* Ana İçerik Alanı */}
            <main className="flex-1 p-6 md:p-10">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Veli Akademisi</h1>
                    <p className="text-xl text-slate-600">
                        Uzman rehberlik birimimizden size özel hazırlanmış makale ve kaynaklar.
                    </p>
                </header>

                {/* Öne Çıkan Başlıklar */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow border border-gray-100">
                        <Zap size={20} className="text-red-500" />
                        <span className="text-sm font-medium">Sınav Kaygısı</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow border border-gray-100">
                        <Users size={20} className="text-blue-500" />
                        <span className="text-sm font-medium">Akran İlişkileri</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow border border-gray-100">
                        <Target size={20} className="text-green-500" />
                        <span className="text-sm font-medium">Odaklanma Sorunları</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow border border-gray-100">
                        <Heart size={20} className="text-rose-500" />
                        <span className="text-sm font-medium">Ergenlik Dönemi</span>
                    </div>
                </div>

                {/* Makale Listesi */}
                <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-2">Tüm Rehberlik İçerikleri</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {articles.map((article, index) => (
                        <ArticleCard key={index} {...article} />
                    ))}
                </div>
                
                {/* Sayfalama (Mock) */}
                <div className="text-center mt-12">
                    <button className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-black transition">
                        Daha Fazla Göster
                    </button>
                </div>
            </main>
        </div>
    );
}