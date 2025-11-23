import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      login: "Login",
      register_school: "Register School",
      v2_badge: "v2.0 Live: Spotify Integration",
      hero_title_1: "Digital Frequency",
      hero_title_2: "of Your Mood.",
      hero_desc: "A hidden sanctuary for students, an AI-powered early warning system for schools. We turn bullying and anxiety into data.",
      get_started: "Get Started",
      watch_demo: "Watch Demo",
      why_gencturp: "Why Genç Turp?",
      feature_music_title: "Music Therapy",
      feature_music_desc: "AI analyzes your mood and opens the frequency that will heal you via Spotify. Plus, Premium is a school gift.",
      feature_risk_title: "Risk Radar",
      feature_risk_desc: "See depression and bullying trends across the school on a heat map.",
      feature_gamification_title: "Reward System",
      feature_gamification_desc: "Earn Turp Points as you solve surveys, grab cinema tickets and coffee rewards.",
      feature_privacy_title: "Secrets Stay Secret.",
      feature_privacy_desc: "Data is end-to-end encrypted. Parents or teachers cannot read the student's private journal. Only risk signals are transmitted.",
      footer_cta_title: "Ready to Transform Your School?",
      apply_now: "Apply Now",
      footer_subtext: "No credit card required. 14-day free demo."
    }
  },
  tr: {
    translation: {
      login: "Giriş Yap",
      register_school: "Okulunu Kaydet",
      v2_badge: "v2.0 Yayında: Spotify Entegrasyonu",
      hero_title_1: "Ruh Halinin",
      hero_title_2: "Dijital Frekansı.",
      hero_desc: "Öğrenciler için gizli bir sığınak, okullar için yapay zeka destekli erken uyarı sistemi. Zorbalığı ve kaygıyı veriye dönüştürüyoruz.",
      get_started: "Hemen Başla",
      watch_demo: "Demoyu İzle",
      why_gencturp: "Neden Genç Turp?",
      feature_music_title: "Müzik Terapisi.",
      feature_music_desc: "Yapay zeka ruh halini analiz eder, Spotify üzerinden seni iyileştirecek frekansı açar. Üstelik Premium okul hediyesi.",
      feature_risk_title: "Risk Radarı",
      feature_risk_desc: "Okul genelindeki depresyon ve zorbalık eğilimlerini ısı haritasında görün.",
      feature_gamification_title: "Ödül Sistemi",
      feature_gamification_desc: "Anketleri çözdükçe Turp Puan kazan, sinema bileti ve kahve ödüllerini kap.",
      feature_privacy_title: "Sırlar, Sır Kalır.",
      feature_privacy_desc: "Veriler uçtan uca şifrelenir. Aileler veya öğretmenler, öğrencinin özel günlüğünü okuyamaz. Sadece risk sinyalleri iletilir.",
      footer_cta_title: "Okulunuzu Dönüştürmeye Hazır mısınız?",
      apply_now: "Hemen Başvurun",
      footer_subtext: "Kredi kartı gerekmez. 14 gün ücretsiz demo."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "tr",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;