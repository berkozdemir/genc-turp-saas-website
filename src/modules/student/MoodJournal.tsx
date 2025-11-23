import React, { useState } from 'react';
import { analyzeSentiment } from '../../services/aiService';
import { supabase } from '../../services/supabase';
import { Shield, Zap } from 'lucide-react'; // İkonları ekledim (Tasarım bütünlüğü için)

// AI Servisinden dönen verinin tipini tanımlıyoruz
interface AIAnalysisResult {
  risk_score: number;
  category: string;
  summary: string;
  action_needed: boolean;
}

export default function MoodJournal() {
  const [entry, setEntry] = useState<string>('');
  const [mood, setMood] = useState<string>('😐');
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<AIAnalysisResult | null>(null);

  const handlePost = async () => {
    if (!entry) return;
    setAnalyzing(true);

    try {
      // 1. Vertex AI / DeepSeek ile analiz et
      // (Gelen verinin tipini AIAnalysisResult olarak belirtiyoruz)
      const aiResult = await analyzeSentiment(entry, mood) as AIAnalysisResult;

      // 2. Supabase'e kaydet
      // Not: Gerçek uygulamada user_id'yi auth context'ten almalısın.
      // Şimdilik veritabanı RLS politikası auth.uid() kullanıyorsa user_id göndermene gerek kalmayabilir.
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
      alert("Bir hata oluştu, lütfen tekrar dene.");
    } finally {
      setAnalyzing(false);
      setEntry('');
    }
  };

  const moodOptions = ['😔', '😐', '😡', '🙂', '🤩'];

  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 h-full flex flex-col relative overflow-hidden">
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Bugün İçinde Neler Var? 🌪️</h2>
          <p className="text-sm text-gray-400">Aklındakileri dök, burası senin güvenli alanın.</p>
        </div>
      </div>
      
      {/* Mood Selector */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {moodOptions.map((m) => (
          <button 
            key={m} 
            onClick={() => setMood(m)}
            className={`text-3xl p-3 rounded-2xl transition border-2 flex-shrink-0 ${
              mood === m 
                ? 'bg-green-50 border-green-500 scale-110 shadow-sm' 
                : 'border-transparent hover:bg-gray-50'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <textarea
        className="w-full flex-1 min-h-[140px] p-5 border-0 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-green-500 focus:bg-white transition resize-none outline-none text-gray-700"
        placeholder="Neler hissediyorsun?.."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />

      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full">
            <Shield size={12} />
            <span>PDR ile güvenli paylaşım</span>
        </div>
        <button
          onClick={handlePost}
          disabled={analyzing || !entry}
          className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-gray-200"
        >
          {analyzing ? 'Analiz Ediliyor...' : 'Kaydet'}
        </button>
      </div>

      {/* AI Sonuç & Spotify Önerisi (Feedback) */}
      {feedback && (
        <div className="mt-6 p-5 bg-green-50 rounded-2xl border border-green-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-2 rounded-lg text-green-600">
              <Zap size={20} fill="currentColor" />
            </div>
            <div>
              <h4 className="font-bold text-green-900 text-sm">Analiz Sonucu</h4>
              <p className="text-sm text-green-700 mt-1 leading-relaxed">{feedback.summary}</p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-4 bg-black text-white p-4 rounded-xl cursor-pointer hover:scale-[1.02] transition shadow-xl shadow-green-900/10">
            <span className="text-2xl">🎧</span>
            <div>
              <p className="text-[10px] text-green-400 font-bold uppercase tracking-wider">Spotify Önerisi</p>
              <p className="text-sm font-bold">Bu moda özel: "Sakinleş ve Odaklan"</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
