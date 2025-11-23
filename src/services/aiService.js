// src/services/aiService.js

export const analyzeSentiment = async (text, mood) => {
  // 1. Yerel Geliştirme Ortamı Kontrolü (Localhost)
  // Eğer localhost'taysak API'ye gitme, direkt sahte cevap dön.
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  if (isLocalhost) {
    console.log("🛠️ Localhost tespit edildi: AI API yerine simülasyon kullanılıyor.");
    
    // 1.5 saniye bekle (Gerçekçilik için)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Sahte AI Cevabı (Mood'a göre değişebilir)
    return {
      risk_score: Math.floor(Math.random() * 30) + 10, // 10-40 arası rastgele risk
      category: 'general',
      summary: `Yazdıklarına göre ${mood} modundasın. Endişelenme, her şey yoluna girecek. (Demo Analiz)`,
      recommendation: 'Senin için seçtiğimiz Spotify listesini dinleyerek rahatlayabilirsin.',
      action_needed: false
    };
  }

  // 2. Gerçek API İsteği (Sadece Vercel'e yüklendiğinde çalışır)
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, mood }),
    });

    if (!response.ok) {
      throw new Error('Analiz servisi yanıt vermedi');
    }

    const result = await response.json();
    return result; 

  } catch (error) {
    console.error("Analiz Hatası (API Erişilemedi):", error);
    
    // Hata durumunda Fallback (Uygulama çökmesin diye)
    return {
      risk_score: 0,
      category: 'none',
      summary: 'Bağlantı sorunu, ancak notun güvenle kaydedildi.',
      recommendation: 'Biraz müzik dinlemeye ne dersin?',
      action_needed: false
    };
  }
};