import React, { useState } from 'react';
import { supabase } from '../../services/supabase';
import { Trophy, CheckCircle2, ArrowRight, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- TİP TANIMLAMALARI (TypeScript) ---
interface Question {
  id: number;
  text: string;
  options: string[];
}

interface Survey {
  id: string;
  title: string;
  reward: number;
  questions: Question[];
}

// Örnek Veri
const MOCK_SURVEY: Survey = {
  id: 'survey-001',
  title: 'Aylık Ruh Hali Kontrolü',
  reward: 100,
  questions: [
    { id: 1, text: "Son iki haftada kendini ne sıklıkla yorgun hissettin?", options: ["Hiç", "Bazen", "Sık Sık", "Her Gün"] },
    { id: 2, text: "Geleceğe dair umutlu musun?", options: ["Evet, Çok", "Biraz", "Pek Değil", "Hiç Umudum Yok"] }
  ]
};

export default function SurveyCard() {
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  // Cevapları { soruId: secenekIndex } şeklinde tutuyoruz
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [completed, setCompleted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleOptionSelect = (questionId: number, optionIndex: number) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
    
    // Sonraki soruya geçiş (Hafif gecikmeli - UX için)
    if (activeQuestion < MOCK_SURVEY.questions.length - 1) {
      setTimeout(() => setActiveQuestion(activeQuestion + 1), 300);
    } else {
      // Son soruysa bitir
      setTimeout(() => finishSurvey({ ...answers, [questionId]: optionIndex }), 300);
    }
  };

  const finishSurvey = async (finalAnswers: Record<number, number>) => {
    setIsSubmitting(true);

    try {
      // 1. Kullanıcıyı al
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Demo modunda user olmayabilir, sadece görseli gösterip çıkalım
        triggerSuccessEffect();
        return;
      }

      // 2. Cevapları kaydet
      await supabase.from('survey_responses').insert([{
        user_id: user.id,
        survey_id: MOCK_SURVEY.id,
        answers: finalAnswers,
        score: calculateScore(finalAnswers)
      }]);

      // 3. Puanı işle (Simülasyon)
      // Gerçekte RPC kullanılır: await supabase.rpc('increment_points', { ... })
      
      triggerSuccessEffect();

    } catch (error) {
      console.error('Anket hatası:', error);
      // Hata olsa bile demo deneyimi bozulmasın diye başarı ekranını gösteriyoruz
      triggerSuccessEffect();
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerSuccessEffect = () => {
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    setCompleted(true);
  };
  
  const calculateScore = (ans: Record<number, number>) => {
      return Object.values(ans).reduce((a, b) => a + b, 0);
  };

  // --- TAMAMLANDI EKRANI ---
  if (completed) {
    return (
      <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-[2rem] p-8 text-white text-center shadow-xl shadow-green-200 transform transition hover:scale-[1.02] duration-500 relative overflow-hidden">
        {/* Arka Plan Efekti */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="relative z-10">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
             <Trophy className="w-10 h-10 text-yellow-300" fill="currentColor" />
          </div>
          
          <h3 className="text-2xl font-bold mb-2">Harikasın!</h3>
          <p className="text-green-100 mb-6">+ {MOCK_SURVEY.reward} Turp Puan kazandın.</p>
          
          <div className="bg-white/10 rounded-xl p-4 mb-4 backdrop-blur-sm border border-white/10">
            <div className="flex justify-between text-xs font-bold text-green-100 mb-2">
              <span>Spotify Hedefi</span>
              <span>%45</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-2">
              <div className="bg-yellow-400 h-2 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.6)]" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- SORU EKRANI ---
  const currentQ = MOCK_SURVEY.questions[activeQuestion];
  const progress = ((activeQuestion) / MOCK_SURVEY.questions.length) * 100;

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 h-full flex flex-col justify-between relative overflow-hidden group">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-indigo-100 mb-2">
            <Gift size={12} /> Haftalık Görev
          </span>
          <h3 className="text-lg font-bold text-slate-900 leading-tight">{MOCK_SURVEY.title}</h3>
        </div>
        <div className="text-right">
          <div className="font-black text-green-600 flex items-center justify-end gap-1 bg-green-50 px-3 py-1 rounded-lg">
            +{MOCK_SURVEY.reward} <span className="text-[10px] uppercase">TP</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-8 overflow-hidden">
        <div 
          className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Soru */}
      <div className="mb-8 flex-1 relative z-10">
        <h4 className="text-xl font-medium text-slate-800 leading-snug">
          {currentQ.text}
        </h4>
      </div>

      {/* Seçenekler */}
      <div className="space-y-3 relative z-10">
        {currentQ.options.map((opt, index) => (
          <button
            key={index}
            disabled={isSubmitting}
            onClick={() => handleOptionSelect(currentQ.id, index)}
            className="w-full text-left p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-indigo-50 hover:border-indigo-200 transition-all duration-200 flex items-center justify-between group/btn active:scale-[0.98]"
          >
            <span className="text-gray-600 font-medium group-hover/btn:text-indigo-700">{opt}</span>
            <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover/btn:border-indigo-500 group-hover/btn:bg-indigo-500 transition-colors flex items-center justify-center">
               {answers[currentQ.id] === index && <CheckCircle2 size={12} className="text-white" />}
            </div>
          </button>
        ))}
      </div>

      {/* Background Decor */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition duration-700 pointer-events-none"></div>
    </div>
  );
}
