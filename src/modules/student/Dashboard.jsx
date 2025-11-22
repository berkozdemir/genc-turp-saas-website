import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Music, ShoppingBag, LogOut } from 'lucide-react';

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* SIDEBAR */}
      <div className="w-20 md:w-64 bg-white border-r border-gray-200 flex flex-col justify-between fixed h-full z-10">
        <div className="p-6">
          <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center font-bold text-xl mb-10">G</div>
          <nav className="space-y-2">
            <NavItem icon={<Home />} label="Ana Sayfa" active />
            <Link to="/student/marketplace">
               <NavItem icon={<ShoppingBag />} label="Turp Bazaar" />
            </Link>
            <NavItem icon={<Music />} label="Spotify Modu" />
          </nav>
        </div>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 text-gray-500 hover:text-red-500 transition font-medium">
            <LogOut size={20} />
            <span className="hidden md:block">Çıkış</span>
          </Link>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-20 md:ml-64 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Selam, Efe 👋</h1>
            <p className="text-gray-500">Bugün nasıl hissediyorsun?</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-bold text-sm">
              💎 1.250 TP
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
            </div>
          </div>
        </header>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mood Card */}
          <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-lg mb-4">Duygu Durumu</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {['😔','😐','🙂','🤩','😡'].map(emoji => (
                <button key={emoji} className="text-4xl p-4 bg-gray-50 rounded-2xl hover:bg-green-50 hover:scale-110 transition border border-gray-100">
                  {emoji}
                </button>
              ))}
            </div>
            <textarea className="w-full mt-6 p-4 bg-gray-50 rounded-xl resize-none h-32 outline-none focus:ring-2 focus:ring-green-500 transition" placeholder="İçinden geçenleri yaz..."></textarea>
            <div className="mt-4 flex justify-end">
                <button className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:opacity-80">Kaydet</button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-xl mb-2">Müzik Modu</h3>
              <p className="text-green-100 text-sm mb-6">Moduna göre çalma listesi hazır.</p>
              <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-bold text-sm">Spotify'da Aç</button>
            </div>
            <Music className="absolute bottom-[-20px] right-[-20px] w-40 h-40 text-white opacity-20 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${active ? 'bg-gray-100 text-slate-900' : 'text-gray-500 hover:bg-gray-50'}`}>
      {icon}
      <span className="hidden md:block font-medium">{label}</span>
    </div>
  );
}
