import { useState } from 'react';
import { supabase } from '../../services/supabase';
import { Trophy } from 'lucide-react';
import confetti from 'canvas-confetti'; // Efekt için: npm install canvas-confetti

// Örnek Veri (Gerçekte Supabase 'surveys' tablosundan gelecek)
const MOCK_SURVEY = {
  id: 'survey-001',
  title: 'Aylık Ruh Hali Kontrolü',
  reward: 100,
  questions: [
    { id: 1, text: "Son iki haftada kendini ne sıklıkla yorgun hissettin?", options: ["Hiç", "Bazen", "Sık Sık", "Her Gün"] },
    { id: 2, text: "Geleceğe dair umutlu musun?", options: ["Evet, Çok", "Biraz", "Pek Değil", "Hiç Umudum Yok"] }
  ]
};

export default function SurveyCard() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);

  const handleOptionSelect = (questionId, optionIndex) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
    
    if (activeQuestion < MOCK_SURVEY.questions.length - 1) {
      setTimeout(() => setActiveQuestion(activeQuestion + 1), 300); // Akıcı geçiş
    } else {
      finishSurvey();
    }
  };

  const finishSurvey = async () => {
    // 1. Efekt patlat
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setCompleted(true);

    // 2. Puanı Kaydet & Cevapları Yolla
    const { data: { user } } = await supabase.auth.getUser();
    
    // Cevapları kaydet
    await supabase.from('survey_responses').insert([{
      user_id: user.id,
      survey_id: MOCK_SURVEY.id,
      answers: answers,
      score: calculateScore(answers) // Basit bir skorlama fonksiyonu
    }]);

    // Puanı güncelle (RPC/Stored Procedure kullanmak daha güvenli ama şimdilik direct update)
    // Not: Gerçekte 'increment_points' gibi bir SQL fonksiyonu yazarız.
    // Burada basit simülasyon:
    await supabase.rpc('increment_points', { user_id: user.id, amount: MOCK_SURVEY.reward });
  };
  
  const calculateScore = (ans) => {
      // Basit toplama mantığı (Demo)
      return Object.values(ans).reduce((a, b) => a + b, 0);
  };

  if (completed) {
    return (
      <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-2xl p-8 text-white text-center shadow-lg transform transition hover:scale-105">
        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
        <h3 className="text-2xl font-bold">Tebrikler! +{MOCK_SURVEY.reward} Turp Puan</h3>
        <p className="mt-2 opacity-90">Spotify Premium hedefine bir adım daha yaklaştın.</p>
        <div className="mt-4 w-full bg-green-800 rounded-full h-2.5">
          <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: '45%' }}></div>
        </div>
        <p className="text-xs mt-1 text-green-100">%45 Tamamlandı</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 max-w-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
            Aylık Görev
          </span>
          <h3 className="text-xl font-bold mt-1">{MOCK_SURVEY.title}</h3>
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-500">Ödül</span>
          <div className="font-bold text-green-600 flex items-center gap-1">
            +{MOCK_SURVEY.reward} <span className="text-xs">Puan</span>
          </div>
        </div>
      </div>

      {/* İlerleme Çubuğu */}
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
        <div 
          className="bg-green-500 h-1.5 rounded-full transition-all duration-500" 
          style={{ width: `${((activeQuestion) / MOCK_SURVEY.questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Soru Alanı */}
      <div className="mb-6 min-h-[100px]">
        <h4 className="text-lg font-medium text-gray-800">
          {MOCK_SURVEY.questions[activeQuestion].text}
        </h4>
      </div>

      {/* Seçenekler */}
      <div className="space-y-3">
        {MOCK_SURVEY.questions[activeQuestion].options.map((opt, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(MOCK_SURVEY.questions[activeQuestion].id, index)}
            className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-green-500 hover:bg-green-50 transition flex items-center justify-between group"
          >
            <span className="text-gray-600 group-hover:text-green-700">{opt}</span>
            <div className="w-4 h-4 rounded-full border border-gray-300 group-hover:border-green-500 group-hover:bg-green-500"></div>
          </button>
        ))}
      </div>
    </div>
  );
}
