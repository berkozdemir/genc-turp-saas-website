import { useState } from 'react';
import { analyzeSentiment } from '../../services/aiService';
import { supabase } from '../../services/supabase';

export default function MoodJournal() {
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState('neutral');
  const [analyzing, setAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handlePost = async () => {
    if (!entry) return;
    setAnalyzing(true);

    try {
      // 1. Vertex AI ile analiz et
      const aiResult = await analyzeSentiment(entry, mood);

      // 2. Supabase'e kaydet
      // (Burada gerçek user_id auth'tan gelmeli)
      const { error } = await supabase.from('journal_entries').insert([
        {
          content: entry,
          mood_selected: mood,
          ai_risk_score: aiResult.risk_score,
          ai_tags: [aiResult.category],
          is_flagged: aiResult.action_needed
        }
      ]);

      if (error) throw error;

      // 3. Öğrenciye geri bildirim (Spotify önerisi vb.)
      setFeedback(aiResult);
      
    } catch (err) {
      console.error("Hata:", err);
    } finally {
      setAnalyzing(false);
      setEntry('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Bugün İçinde Neler Var? 🌪️</h2>
      
      {/* Mood Selector */}
      <div className="flex gap-4 mb-4">
        {['😔', '😐', '😡', '🙂', '🤩'].map((m) => (
          <button 
            key={m} 
            onClick={() => setMood(m)}
            className={`text-3xl p-2 rounded-full ${mood === m ? 'bg-green-100 ring-2 ring-green-500' : 'hover:bg-gray-100'}`}
          >
            {m}
          </button>
        ))}
      </div>

      <textarea
        className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
        placeholder="Aklındakileri dök. Burası senin güvenli alanın..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />

      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-400">🔒 PDR öğretmeninle paylaşılabilir (Risk durumunda)</span>
        <button
          onClick={handlePost}
          disabled={analyzing}
          className="bg-black text-white px-6 py-2 rounded-full font-bold hover:bg-gray-800 transition"
        >
          {analyzing ? 'Turp Düşünüyor...' : 'Gönder'}
        </button>
      </div>

      {/* AI Sonuç & Spotify Önerisi */}
      {feedback && (
        <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200 animate-fade-in">
          <h4 className="font-bold text-green-800">Senin için analiz ettik:</h4>
          <p className="text-sm text-green-700 mt-1">{feedback.summary}</p>
          
          <div className="mt-4 flex items-center gap-3 bg-black text-white p-3 rounded-lg cursor-pointer hover:bg-gray-900">
            <span className="text-2xl">🎧</span>
            <div>
              <p className="text-xs text-green-400 font-bold">SPOTIFY PREMIUM ÖNERİSİ</p>
              <p className="text-sm font-medium">Bu moda özel: "Sakinleş ve Odaklan" Listesi</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
