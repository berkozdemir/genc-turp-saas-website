// Anket Tipleri
export interface SurveyOption {
  text: string;
  score: number;
}

export interface SurveyQuestion {
  id: number;
  text: string;
  options: SurveyOption[];
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: SurveyQuestion[];
  reward: number; // Tamamlayınca kazanılacak Turp Puan
  color: string; // Kart rengi
}

// --- 1. DEPRESYON ÖLÇEĞİ (Basitleştirilmiş Beck) ---
export const depressionSurvey: Survey = {
  id: 'depression',
  title: 'Ruh Hali Kontrolü',
  description: 'Son iki haftadaki duygu durumunu analiz edelim.',
  reward: 150,
  color: 'bg-blue-500',
  questions: [
    {
      id: 1,
      text: "Kendini ne sıklıkla üzgün hissediyorsun?",
      options: [
        { text: "Neredeyse hiç", score: 0 },
        { text: "Bazen", score: 1 },
        { text: "Çoğu zaman", score: 2 },
        { text: "Her zaman", score: 3 }
      ]
    },
    {
      id: 2,
      text: "Geleceğe dair umutlu musun?",
      options: [
        { text: "Evet, umutluyum", score: 0 },
        { text: "Bazen karamsarım", score: 1 },
        { text: "Pek umudum yok", score: 2 },
        { text: "Hiçbir şey düzelmeyecek", score: 3 }
      ]
    },
    {
      id: 3,
      text: "Günlük işlerden zevk alıyor musun?",
      options: [
        { text: "Evet, eskisi gibi", score: 0 },
        { text: "Eskisi kadar değil", score: 1 },
        { text: "Çok az şeyden", score: 2 },
        { text: "Hiçbir şeyden", score: 3 }
      ]
    },
    {
      id: 4,
      text: "Uyku düzenin nasıl?",
      options: [
        { text: "Gayet iyi", score: 0 },
        { text: "Bazen bozuluyor", score: 1 },
        { text: "Çok uyuyorum veya hiç uyuyamıyorum", score: 2 },
        { text: "Tamamen bozuk", score: 3 }
      ]
    }
  ]
};

// --- 2. KAYGI (ANKSİYETE) ÖLÇEĞİ ---
export const anxietySurvey: Survey = {
  id: 'anxiety',
  title: 'Kaygı ve Stres Testi',
  description: 'Vücudunun ve zihninin stres tepkilerini ölçelim.',
  reward: 150,
  color: 'bg-purple-500',
  questions: [
    {
      id: 1,
      text: "Kendini gergin veya 'diken üstünde' hissediyor musun?",
      options: [
        { text: "Hayır", score: 0 },
        { text: "Bazen", score: 1 },
        { text: "Sık sık", score: 2 },
        { text: "Sürekli", score: 3 }
      ]
    },
    {
      id: 2,
      text: "Kötü bir şey olacakmış hissine kapılıyor musun?",
      options: [
        { text: "Hayır", score: 0 },
        { text: "Nadiren", score: 1 },
        { text: "Sık sık", score: 2 },
        { text: "Evet, çok korkuyorum", score: 3 }
      ]
    },
    {
      id: 3,
      text: "Rahatlamakta güçlük çekiyor musun?",
      options: [
        { text: "Kolayca rahatlarım", score: 0 },
        { text: "Bazen zorlanırım", score: 1 },
        { text: "Genelde gerginim", score: 2 },
        { text: "Asla gevşeyemiyorum", score: 3 }
      ]
    }
  ]
};

// --- 3. TEKNOLOJİ BAĞIMLILIĞI ---
export const techAddictionSurvey: Survey = {
  id: 'tech',
  title: 'Dijital Denge',
  description: 'Teknoloji seni yönetiyor mu, sen mi onu yönetiyorsun?',
  reward: 200,
  color: 'bg-red-500',
  questions: [
    {
      id: 1,
      text: "İnternette geçirdiğin zaman yüzünden uykusuz kalıyor musun?",
      options: [
        { text: "Asla", score: 0 },
        { text: "Nadiren", score: 1 },
        { text: "Sık sık", score: 2 },
        { text: "Her gece", score: 3 }
      ]
    },
    {
      id: 2,
      text: "İnternet yokken kendini boşlukta veya sinirli hissediyor musun?",
      options: [
        { text: "Hayır, umursamam", score: 0 },
        { text: "Biraz sıkılırım", score: 1 },
        { text: "Evet, gerilirim", score: 2 },
        { text: "Çıldıracak gibi olurum", score: 3 }
      ]
    },
    {
      id: 3,
      text: "Ders çalışırken veya iş yaparken sürekli telefona bakıyor musun?",
      options: [
        { text: "Hayır, odaklanırım", score: 0 },
        { text: "Arada bir", score: 1 },
        { text: "Sık sık bölünüyorum", score: 2 },
        { text: "Elimden bırakamıyorum", score: 3 }
      ]
    }
  ]
};

// --- 4. YAŞAM KALİTESİ ---
export const qualityOfLifeSurvey: Survey = {
  id: 'life',
  title: 'Yaşam Kalitesi',
  description: 'Genel mutluluk ve tatmin düzeyine bakalım.',
  reward: 100,
  color: 'bg-green-500',
  questions: [
    {
      id: 1,
      text: "Hayatından ne kadar memnunsun?",
      options: [
        { text: "Çok memnunum", score: 0 },
        { text: "Memnunum", score: 1 },
        { text: "İdare eder", score: 2 },
        { text: "Hiç memnun değilim", score: 3 }
      ]
    },
    {
      id: 2,
      text: "Kendini ne kadar sağlıklı hissediyorsun?",
      options: [
        { text: "Çok sağlıklı", score: 0 },
        { text: "Sağlıklı", score: 1 },
        { text: "Orta", score: 2 },
        { text: "Sağlıksız", score: 3 }
      ]
    }
  ]
};

// Hepsini tek bir dizide toplayalım
export const ALL_SURVEYS = [depressionSurvey, anxietySurvey, techAddictionSurvey, qualityOfLifeSurvey];