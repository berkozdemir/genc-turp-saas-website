import { useState } from 'react';
import { supabase } from '../services/supabase';
import { X, ChevronRight, CheckCircle2, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Survey, SurveyOption } from '../data/surveys';

interface SurveyModalProps {
  survey: Survey;
  onClose: () => void;
}

export default function SurveyModal({ survey, onClose }: SurveyModalProps) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, SurveyOption>>({});
  const [totalScore, setTotalScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const currentQuestion = survey.questions[currentQIndex];
  const progress = ((currentQIndex + 1) / survey.questions.length) * 100;

  // Cevap seçildiğinde
  const handleSelect = async (option: SurveyOption) => {
    // Cevabı kaydet
    const newAnswers = { ...answers, [currentQuestion.id]: option };
    setAnswers(newAnswers);
    setTotalScore(prev => prev + option.score);

    // Sonraki soruya geç veya bitir
    if (currentQIndex < survey.questions.length - 1) {
      setTimeout(() => setCurrentQIndex(prev => prev + 1), 250);
    } else {
      await finishSurvey(newAnswers, totalScore + option.score);
    }
  };

  // Anketi bitir ve veritabanına yaz
  const finishSurvey = async (finalAnswers: any, finalScore: number) => {
    setSubmitting(true);
    
    // Risk Seviyesi Belirle (Basit mantık: %'lik dilim)
    const maxPossible = survey.questions.length * 3;
    const ratio = finalScore / maxPossible;
    let riskLevel = 'Düşük';
    if (ratio > 0.33) riskLevel = 'Orta';
    if (ratio > 0.66) riskLevel = 'Yüksek';

    try {
      // 1. Kullanıcı ID'sini al (Varsa)
      const { data: { user } } = await supabase.auth.getUser();
      
      // 2. Supabase'e Kaydet
      await supabase.from('survey_results').insert([{
        user_id: user?.id || null, // Demo modda null olabilir
        survey_type: survey.id,
        total_score: finalScore,
        max_score: maxPossible,
        risk_level: riskLevel,
        answers: finalAnswers
      }]);

      // 3. Efektler
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      setCompleted(true);

    } catch (error) {
      console.error("Anket kayıt hatası:", error);
      // Hata olsa bile kullanıcıya tamamlandı göster (Demo deneyimi için)
      setCompleted(true);
    } finally {
      setSubmitting(false);
    }
  };

  // --- SONUÇ EKRANI ---
  if (completed) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
          
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy size={40} />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Tebrikler!</h2>
          <p className="text-slate-500 mb-6">Anketi tamamladın ve puanlarını kaptın.</p>
          
          <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
            <p className="text-sm text-slate-400 uppercase font-bold mb-1">Kazanılan Ödül</p>
            <p className="text-3xl font-black text-slate-900">+{survey.reward} TP</p>
          </div>

          <button onClick={onClose} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-black transition">
            Panele Dön
          </button>
        </div>
      </div>
    );
  }

  // --- SORU EKRANI ---
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] max-w-lg w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className={`p-6 text-white ${survey.color} flex justify-between items-start`}>
          <div>
            <h3 className="font-bold text-xl">{survey.title}</h3>
            <p className="text-white/80 text-sm mt-1">Soru {currentQIndex + 1} / {survey.questions.length}</p>
          </div>
          <button onClick={onClose} className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition">
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-1.5">
          <div className={`h-1.5 ${survey.color.replace('bg-', 'bg-')} transition-all duration-500`} style={{ width: `${progress}%`, backgroundColor: 'currentColor' }}></div>
        </div>

        {/* Soru Alanı */}
        <div className="p-8 overflow-y-auto">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 leading-snug">
            {currentQuestion.text}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((opt, idx) => (
              <button
                key={idx}
                disabled={submitting}
                onClick={() => handleSelect(opt)}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-slate-900 hover:bg-slate-50 transition-all duration-200 flex items-center justify-between group"
              >
                <span className="font-medium text-slate-600 group-hover:text-slate-900">{opt.text}</span>
                <ChevronRight className="text-gray-300 group-hover:text-slate-900 opacity-0 group-hover:opacity-100 transition" size={20} />
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-center text-xs text-gray-400">
          Turp Modum Bilimsel Ölçek Sistemi v1.0
        </div>

      </div>
    </div>
  );
}