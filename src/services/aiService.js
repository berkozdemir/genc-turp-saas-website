// src/services/aiService.js

export const analyzeSentiment = async (text, mood) => {
  try {
    // Vercel üzerindeki kendi API'mize istek atıyoruz
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
    return result; // { risk_score, category, summary, recommendation }

  } catch (error) {
    console.error("Analiz Hatası:", error);
    // Hata durumunda fallback (Uygulama çökmesin diye)
    return {
      risk_score: 0,
      category: 'none',
      summary: 'Bağlantı sorunu, ancak notun kaydedildi.',
      recommendation: 'Biraz müzik dinlemeye ne dersin?'
    };
  }
};
