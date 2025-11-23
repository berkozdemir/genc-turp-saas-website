import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, Music, ShoppingBag, LogOut, 
  Play, Settings, Bell 
} from 'lucide-react';
import MoodJournal from './MoodJournal';
import SurveyCard from './SurveyCard';
import SpotifyPlayer from '../../components/SpotifyPlayer'; // <--- YENİ: Player'ı içe aktardık

export default function StudentDashboard() {
  const [showSpotify, setShowSpotify] = useState(false); // <--- YENİ: Popup durumu

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col md:flex-row relative">
      
      {/* --- SIDEBAR (SOL MENÜ) --- */}
      <aside className="w-full md:w-72 bg-white border-r border-gray-100 flex flex-col justify-between fixed bottom-0 md:relative z-30 md:h-screen order-2 md:order-1 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-8 hidden md:block">
          <div className="flex items-center gap-3 font-bold text-2xl tracking-tight mb-12 text-slate-900">
            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg shadow-slate-200">G</div>
            GençTurp.
          </div>
          
          <nav className="space-y-2">
            <NavItem icon={<Home size={20} />} label="Ana Sayfa" active />
            <Link to="/student/marketplace">
              <NavItem icon={<ShoppingBag size={20} />} label="Turp Bazaar" />
            </Link>
            {/* Spotify menüsüne de tıklama özelliği ekleyebiliriz */}
            <div onClick={() => setShowSpotify(true)}>
              <NavItem icon={<Music size={20} />} label="Spotify Modu" />
            </div>
            <NavItem icon={<Settings size={20} />} label="Ayarlar" />
          </nav>
        </div>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden flex justify-around items-center p-4 bg-white border-t border-gray-200 pb-safe safe-area-pb">
          <Home size={24} className="text-green-600" />
          <Link to="/student/marketplace"><ShoppingBag size={24} className="text-gray-400" /></Link>
          <button onClick={() => setShowSpotify(true)}>
            <Music size={24} className="text-gray-400" />
          </button>
          <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" />
          </div>
        </div>

        <div className="p-8 hidden md:block">
          {/* Premium Banner */}
          <div 
            onClick={() => setShowSpotify(true)}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 text-white mb-6 relative overflow-hidden group cursor-pointer"
          >
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Okul Hediyesi</p>
              <div className="flex justify-between items-end">
                <p className="font-bold text-lg leading-tight">Spotify <br/>Premium Aktif</p>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black">
                  <Music size={16} fill="currentColor" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white opacity-5 rounded-full group-hover:scale-150 transition duration-700"></div>
          </div>

          <Link to="/" className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition font-medium px-2 group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition" />
            Çıkış Yap
          </Link>
        </div>
      </aside>

      {/* --- ANA İÇERİK ALANI --- */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto pb-24 md:pb-10 order-1 md:order-2">
        
        {/* HEADER */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Selam, Efe 👋</h1>
            <p className="text-gray-500 mt-1 font-medium">Bugün modun nasıl?</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white border border-gray-100 rounded-full text-gray-400 hover:text-slate-900 hover:shadow-md transition relative">
               <Bell size={20} />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            
            <Link to="/student/marketplace" className="hidden md:flex bg-white border border-gray-200 pl-4 pr-2 py-1.5 rounded-full shadow-sm hover:border-green-400 hover:shadow-md transition items-center gap-3 cursor-pointer group">
              <div className="flex flex-col items-end leading-none">
                 <span className="text-[10px] text-gray-400 font-bold uppercase">Bakiye</span>
                 <span className="font-bold text-slate-700 group-hover:text-green-600 transition">2.500 TP</span>
              </div>
              <div className="w-8 h-8 bg-yellow-50 rounded-full flex items-center justify-center text-lg border border-yellow-100">
                💎
              </div>
            </Link>

            <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer hover:scale-105 transition hidden md:block">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
            </div>
          </div>
        </header>

        {/* --- BENTO GRID LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 auto-rows-min">
          
          {/* SOL KOLON (Geniş): MoodJournal */}
          <div className="lg:col-span-2 h-full">
            <MoodJournal />
          </div>

          {/* SAĞ KOLON (Dar): Widget'lar */}
          <div className="space-y-6">
            
            {/* WIDGET 1: Anket Kartı */}
            <SurveyCard />

            {/* WIDGET 2: Spotify Teaser (TIKLANABİLİR) */}
            <div 
              onClick={() => setShowSpotify(true)} // <--- YENİ: Tıklayınca açılır
              className="bg-black rounded-[2rem] p-6 text-white relative overflow-hidden shadow-xl shadow-gray-300 group cursor-pointer hover:-translate-y-1 transition duration-300"
            >
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">AI Önerisi</span>
                  </div>
                  <h3 className="font-bold text-xl leading-none mb-1">Sakinleşme <br/>Listesi</h3>
                  <p className="text-xs text-gray-500 mt-2">Duygu durumuna göre hazırlandı.</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black group-hover:scale-110 transition shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                  <Play size={20} fill="currentColor" className="ml-1" />
                </div>
              </div>
              {/* Background Decor */}
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-green-500 opacity-20 blur-2xl rounded-full"></div>
            </div>

             {/* WIDGET 3: Marketplace Teaser */}
             <Link to="/student/marketplace" className="block bg-white p-6 rounded-[2rem] border border-gray-100 hover:border-orange-200 hover:shadow-lg transition group relative overflow-hidden">
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="bg-orange-50 p-3 rounded-2xl text-orange-600 group-hover:scale-110 transition border border-orange-100">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 leading-none">Turp Bazaar</h4>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Yeni Ödüller</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 relative z-10">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Sinema Bileti</span>
                    <span className="font-bold text-orange-600">1.500 TP</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 text-right">Almak üzeresin!</p>
                </div>
             </Link>

          </div>
        </div>
      </main>

      {/* --- SPOTIFY PLAYER POPUP --- */}
      {showSpotify && (
        <SpotifyPlayer onClose={() => setShowSpotify(false)} />
      )}
      
    </div>
  );
}

// --- YARDIMCI BİLEŞENLER ---

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
}

function NavItem({ icon, label, active, badge }: NavItemProps) {
  return (
    <div className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition duration-200 group ${active ? 'bg-slate-50 text-slate-900 font-bold' : 'text-gray-500 hover:bg-white hover:shadow-sm hover:text-slate-900'}`}>
      <div className="flex items-center gap-3">
        <span className={`transition ${active ? 'text-slate-900' : 'text-gray-400 group-hover:text-slate-900'}`}>
          {icon}
        </span>
        <span>{label}</span>
      </div>
      {badge && (
        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm group-hover:scale-110 transition">{badge}</span>
      )}
    </div>
  );
}