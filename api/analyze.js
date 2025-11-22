// api/analyze.js
// Bu kod Vercel sunucularında çalışır, kullanıcı göremez.

export default async function handler(req, res) {
  // Sadece POST isteği kabul et
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { text, mood } = req.body;
  const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

  if (!DEEPSEEK_API_KEY) {
    return res.status(500).json({ error: 'Server config error: Missing API Key' });
  }

  try {
    // DeepSeek API Çağrısı
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat", // Veya "deepseek-coder"
        messages: [
          {
            role: "system",
            content: `Sen uzman bir okul psikolojik danışman asistanısın (AI). 
            Görevin: Bir lise öğrencisinin yazdığı metni ve ruh halini analiz edip JSON formatında çıktı vermek.
            
            Kurallar:
            1. 'risk_score': 0-100 arası bir sayı ver. (80 üstü acil durum/kriz).
            2. 'category': Şunlardan birini seç: 'bullying', 'depression', 'anxiety', 'family', 'academic', 'none'.
            3. 'summary': Durumu açıklayan tek cümlelik Türkçe özet.
            4. 'recommendation': Öğrenciye iyi gelecek kısa bir öneri (şarkı dinle, uyu, konuş vb.).
            
            Sadece saf JSON döndür. Markdown kullanma.`
          },
          {
            role: "user",
            content: `Öğrenci Modu: ${mood}. Öğrenci Metni: "${text}"`
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    // DeepSeek bazen markdown (```json ... ```) dönebilir, onu temizleyelim
    let aiContent = data.choices[0].message.content;
    aiContent = aiContent.replace(/```json/g, '').replace(/```/g, '').trim();

    const parsedResult = JSON.parse(aiContent);

    return res.status(200).json(parsedResult);

  } catch (error) {
    console.error("DeepSeek Error:", error);
    return res.status(500).json({ error: 'AI Analysis Failed', details: error.message });
  }
}
