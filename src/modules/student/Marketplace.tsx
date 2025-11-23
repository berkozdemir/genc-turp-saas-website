import React, { useState } from 'react';
import { 
  Music, Film, Coffee, Ticket, Gift, 
  ShoppingBag, Heart, Lock, CheckCircle, Sprout, GraduationCap, Stethoscope 
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- TİP TANIMLAMALARI ---
type CategoryType = 'all' | 'music' | 'movie' | 'food' | 'social' | 'event';

interface RewardItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: CategoryType;
  imageGradient: string; // Kartın arka plan rengi
  icon: React.ReactNode;
}

interface PurchasedItem extends RewardItem {
  purchaseDate: string;
  code: string;
}

// --- MOCK DATA (Ürün Kataloğu) ---
const REWARDS: RewardItem[] = [
  {
    id: '1',
    title: 'Spotify Premium (1 Ay)',
    description: 'Reklamsız müzik keyfi. Ruhunun gıdası, okulun hediyesi.',
    price: 2500,
    category: 'music',
    imageGradient: 'from-green-500 to-emerald-700',
    icon: <Music className="text-white" size={32} />,
  },
  {
    id: '4',
    title: 'Petcheck: Can Dostlara Sağlık 🐾',
    description: 'Sokak Hayvanlarına Sağlıkla Dokunun! Senin katkınla barınaklara sağlık testleri gönderiyoruz. "Bir Test Senden, Bir Test Petcheck’ten!"',
    price: 1000,
    category: 'social',
    imageGradient: 'from-blue-400 to-cyan-600',
    icon: <Stethoscope className="text-white" size={32} />,
  },
  {
    id: '7',
    title: 'TEMA Fidan Bağışı 🌱',
    description: 'Geleceğe nefes ol. Puanlarınla senin adına bir fidan dikiyor, doğayı yeşertiyoruz.',
    price: 800,
    category: 'social',
    imageGradient: 'from-emerald-600 to-green-800',
    icon: <Sprout className="text-white" size={32} />,
  },
  {
    id: '8',
    title: 'TEV Eğitim Bursu 🎓',
    description: 'Bir gencin eğitim yolculuğuna ışık tut. Türk Eğitim Vakfı bağışınla geleceği aydınlat.',
    price: 1200,
    category: 'social',
    imageGradient: 'from-orange-500 to-red-600',
    icon: <GraduationCap className="text-white" size={32} />,
  },
  {
    id: '2',
    title: 'Paribu Cineverse Bileti',
    description: 'Haftasonu istediğin filme git. Mısır bizden değil ama bilet bizden.',
    price: 1500,
    category: 'movie',
    imageGradient: 'from-pink-500 to-rose-600',
    icon: <Film className="text-white" size={32} />,
  },
  {
    id: '3',
    title: 'Kahve Dünyası Çeki',
    description: 'Bir orta boy Latte ile kendine gel. Ders çalışırken iyi gider.',
    price: 800,
    category: 'food',
    imageGradient: 'from-amber-700 to-orange-900',
    icon: <Coffee className="text-white" size={32} />,
  },
  {
    id: '6',
    title: 'Gençlik Festivali Girişi',
    description: 'Yıl sonu okul festivaline VIP giriş hakkı ve sahne arkası turu.',
    price: 5000,
    category: 'event',
    imageGradient: 'from-purple-600 to-indigo-900',
    icon: <Ticket className="text-white" size={32} />,
  },
];

export default function Marketplace() {
  const [userPoints, setUserPoints] = useState<number>(2500); // Demo için puanı artırdım
  const [activeFilter, setActiveFilter] = useState<CategoryType>('all');
  const [purchasedItems, setPurchasedItems] = useState<PurchasedItem[]>([]);

  // Satın Alma İşlemi
  const handlePurchase = (item: RewardItem) => {
    if (userPoints < item.price) return;

    let confirmMsg = `${item.title} ürününü ${item.price} TP karşılığında almak istiyor musun?`;
    
    if (item.category === 'social') {
      confirmMsg = `Harika bir kalbin var! ❤️\n\n${item.title} için ${item.price} TP bağışlamak istediğine emin misin?`;
    }

    if (!window.confirm(confirmMsg)) return;

    // 1. Puanı düş
    setUserPoints((prev) => prev - item.price);

    // 2. Envantere ekle
    const newItem: PurchasedItem = {
      ...item,
      purchaseDate: new Date().toLocaleDateString('tr-TR'),
      code: item.category === 'social' ? 'BAĞIŞ-ONAYLANDI' : `TRP-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
    };
    setPurchasedItems([newItem, ...purchasedItems]);

    // 3. Efekt
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
    
    if (item.category === 'social') {
      alert(`Tebrikler! Bağışın başarıyla gerçekleşti. Sertifikan e-posta adresine gönderildi.`);
    } else {
      alert(`Hayırlı olsun! Kodun: ${newItem.code}`);
    }
  };

  // Filtreleme Mantığı
  const filteredRewards = activeFilter === 'all' 
    ? REWARDS 
    : REWARDS.filter(r => r.category === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      
      {/* --- STICKY HEADER (CÜZDAN) --- */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-slate-900" />
            <h1 className="text-xl font-bold text-slate-900">Turp Bazaar</h1>
          </div>
          
          <div className="bg-slate-900 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg shadow-slate-200">
            <span className="text-yellow-400 text-xl">💎</span>
            <span className="font-bold text-lg">{userPoints}</span>
            <span className="text-xs text-gray-400 font-medium">TP</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        
        {/* --- KATEGORİ FİLTRESİ --- */}
        <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar mb-6">
          {[
            { id: 'all', label: 'Tümü', icon: null },
            { id: 'social', label: 'İyilik Hareketi', icon: '❤️' },
            { id: 'music', label: 'Müzik', icon: '🎵' },
            { id: 'movie', label: 'Sinema & Dizi', icon: '🎬' },
            { id: 'food', label: 'Yeme İçme', icon: '🍔' },
            { id: 'event', label: 'Etkinlik', icon: '🎟️' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id as CategoryType)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition border ${
                activeFilter === cat.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* --- ÜRÜN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredRewards.map((item) => {
            const canAfford = userPoints >= item.price;
            
            return (
              <div key={item.id} className={`bg-white rounded-[2rem] p-2 shadow-sm border border-gray-100 group hover:shadow-xl transition duration-300 flex flex-col ${!canAfford ? 'opacity-80' : ''}`}>
                
                {/* Resim Alanı */}
                <div className={`h-40 rounded-[1.5rem] bg-gradient-to-br ${item.imageGradient} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                  <div className="relative z-10 transform group-hover:scale-110 transition duration-500">
                    {item.icon}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-white/20">
                    {item.price} TP
                  </div>
                </div>

                {/* İçerik */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-6 flex-1 leading-relaxed line-clamp-4">
                    {item.description}
                  </p>

                  <button
                    onClick={() => handlePurchase(item)}
                    disabled={!canAfford}
                    className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95
                      ${canAfford 
                        ? 'bg-slate-900 text-white hover:bg-green-600 shadow-lg shadow-slate-200' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                  >
                    {canAfford ? (
                      <>
                        {item.category === 'social' ? <Heart size={18} className="fill-current" /> : <ShoppingBag size={18} />} 
                        {item.category === 'social' ? 'Bağış Yap' : 'Satın Al'}
                      </>
                    ) : (
                      <>
                        <Lock size={18} /> {item.price - userPoints} TP Eksik
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- CÜZDANIM (GEÇMİŞ) --- */}
        {purchasedItems.length > 0 && (
          <div className="border-t border-gray-200 pt-10 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Gift className="text-green-600" /> Cüzdanım & Bağışlarım
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {purchasedItems.map((item, index) => (
                <div key={index} className="bg-white p-5 rounded-2xl border border-gray-200 flex items-center gap-4 shadow-sm">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.imageGradient} flex items-center justify-center text-white shrink-0`}>
                    {item.category === 'social' ? <Heart size={20} /> : <CheckCircle size={20} />}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className="font-bold text-slate-800 truncate">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.purchaseDate} tarihinde işlem yapıldı</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Durum</p>
                    <code className={`px-2 py-1 rounded text-sm font-mono font-bold border border-gray-300 ${item.category === 'social' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-slate-700'}`}>
                      {item.category === 'social' ? '❤️ BAĞIŞLANDI' : item.code}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Basit SVG Icon
function PlayIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 3L19 12L5 21V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
