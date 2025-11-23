import { X } from 'lucide-react';

interface SpotifyPlayerProps {
  playlistId?: string; // Hangi listeyi çalacağını dışarıdan alabiliriz
  onClose: () => void; // Kapatma fonksiyonu
}

export default function SpotifyPlayer({ playlistId = "37i9dQZF1DWVlYsZIXq8fz", onClose }: SpotifyPlayerProps) {
  // Varsayılan ID: "Peaceful Piano" listesi (Örnek)
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
      <div className="bg-black rounded-3xl w-full max-w-md overflow-hidden relative shadow-2xl shadow-green-900/50 border border-green-500/20">
        
        {/* Kapat Butonu */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition"
        >
          <X size={18} />
        </button>

        {/* Başlık */}
        <div className="p-6 pb-2 text-center">
          <h3 className="text-white font-bold text-lg">Müzik Terapisi 🎧</h3>
          <p className="text-gray-400 text-xs">Senin için seçilen frekans.</p>
        </div>

        {/* Spotify Iframe */}
        <div className="p-4">
          <iframe 
            style={{ borderRadius: '12px' }} 
            src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`} 
            width="100%" 
            height="352" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            title="Spotify Player"
          ></iframe>
        </div>

      </div>
    </div>
  );
}