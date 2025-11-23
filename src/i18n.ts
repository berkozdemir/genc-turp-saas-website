import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // --- GENEL ---
      login: "Login",
      register_school: "Register School",
      v2_badge: "v2.0 Live: Spotify Integration",
      get_started: "Get Started",
      watch_demo: "Watch Demo",
      
      // --- HERO SECTION ---
      hero_title_1: "Digital Frequency",
      hero_title_2: "of Your Mood.",
      hero_desc: "A hidden sanctuary for students, an AI-powered early warning system for schools. We turn bullying and anxiety into data.",

      // --- PERSONA TABS ---
      tab_student: "Student",
      tab_school: "School Admin",
      tab_pdr: "Counselor (PDR)",
      tab_parent: "Parent",
      
      role_student_title: "Gamified Support",
      role_student_desc: "No boring forms. Select your mood, earn points, listen to AI-curated music. Your secrets remain yours.",
      role_school_title: "Risk Management",
      role_school_desc: "Monitor bullying and stress heatmaps in real-time. Make data-driven decisions for a safer school climate.",
      role_pdr_title: "Digital Assistant",
      role_pdr_desc: "Automate routine screenings. Catch silent signals early and focus your energy on students who really need help.",
      role_parent_title: "Peace of Mind",
      role_parent_desc: "Ensure your child is in a safe environment. Receive general wellbeing reports without violating student privacy.",

      // --- NASIL ÇALIŞIR ---
      how_it_works: "How It Works?",
      step_1_title: "Check-in",
      step_1_desc: "Student selects daily mood.",
      step_2_title: "AI Analysis",
      step_2_desc: "Risk signals are detected.",
      step_3_title: "Action",
      step_3_desc: "Music plays or PDR is alerted.",

      // --- FOOTER CTA ---
      footer_cta_title: "Ready to Transform Your School?",
      apply_now: "Apply Now",
      footer_subtext: "No credit card required. 14-day free demo.", // <-- BURADAKİ VİRGÜL ÖNEMLİ

      // --- FOOTER (YENİ EKLENENLER) ---
      footer_contact_title: "Contact Us",
      footer_form_name: "Name Surname",
      footer_form_email: "E-mail",
      footer_form_message: "Your Message",
      footer_form_send: "Send Message",
      footer_address_title: "Headquarters",
      footer_social_title: "Social Media",
      footer_rights: "All rights reserved.",

      // --- DİĞER ---
      dashboard: "Dashboard",
      mood_journal: "Mood Journal",
      marketplace: "Turp Bazaar",
      save: "Save",
      logout: "Logout",
      analysis_result: "Analysis Result",
      why_gencturp: "Why Turp Modum?",
      feature_music_title: "Music Therapy",
      feature_music_desc: "AI analyzes your mood and opens the frequency that will heal you via Spotify.",
      feature_risk_title: "Risk Radar",
      feature_risk_desc: "See depression and bullying trends across the school on a heat map.",
      feature_gamification_title: "Reward System",
      feature_gamification_desc: "Earn Turp Points as you solve surveys, grab cinema tickets.",
      feature_privacy_title: "Secrets Stay Secret.",
      feature_privacy_desc: "Data is end-to-end encrypted."
    }
  },
  tr: {
    translation: {
      // --- GENEL ---
      login: "Giriş Yap",
      register_school: "Okulunu Kaydet",
      v2_badge: "v2.0 Yayında: Spotify Entegrasyonu",
      get_started: "Hemen Başla",
      watch_demo: "Demoyu İzle",

      // --- HERO SECTION ---
      hero_title_1: "Ruh Halinin",
      hero_title_2: "Dijital Frekansı.",
      hero_desc: "Öğrenciler için gizli bir sığınak, okullar için yapay zeka destekli erken uyarı sistemi. Zorbalığı ve kaygıyı veriye dönüştürüyoruz.",

      // --- PERSONA TABS ---
      tab_student: "Öğrenci",
      tab_school: "Okul Yönetimi",
      tab_pdr: "PDR Uzmanı",
      tab_parent: "Veli",
      
      role_student_title: "Oyunlaştırılmış Destek",
      role_student_desc: "Sıkıcı formlar yok. Modunu seç, puanları topla, yapay zeka destekli müzik dinle. Sırların seninle güvende.",
      role_school_title: "Risk Yönetimi",
      role_school_desc: "Zorbalık ve stres haritalarını canlı izleyin. Veriye dayalı kararlarla okul iklimini iyileştirin.",
      role_pdr_title: "Dijital Asistan",
      role_pdr_desc: "Rutin taramaları otomatize edin. Sessiz çığlıkları erkenden duyun ve enerjinizi gerçekten ihtiyacı olana harcayın.",
      role_parent_title: "Gönül Rahatlığı",
      role_parent_desc: "Çocuğunuzun güvenli bir ortamda olduğundan emin olun. Gizliliği ihlal etmeden genel refah raporlarını görün.",

      // --- NASIL ÇALIŞIR ---
      how_it_works: "Nasıl Çalışır?",
      step_1_title: "Bildirim",
      step_1_desc: "Öğrenci günlük modunu seçer.",
      step_2_title: "AI Analiz",
      step_2_desc: "Risk sinyalleri taranır.",
      step_3_title: "Aksiyon",
      step_3_desc: "Müzik açılır veya PDR uyarılır.",

      // --- FOOTER CTA ---
      footer_cta_title: "Okulunuzu Dönüştürmeye Hazır mısınız?",
      apply_now: "Hemen Başvurun",
      footer_subtext: "Kredi kartı gerekmez. 14 gün ücretsiz demo.", // <-- BURADAKİ VİRGÜL ÖNEMLİ

      // --- FOOTER (YENİ EKLENENLER) ---
      footer_contact_title: "Bize Ulaşın",
      footer_form_name: "Ad Soyad",
      footer_form_email: "E-posta",
      footer_form_message: "Mesajınız",
      footer_form_send: "Mesajı Gönder",
      footer_address_title: "Merkez Ofis",
      footer_social_title: "Sosyal Medya",
      footer_rights: "Tüm hakları saklıdır.",

      // --- DİĞER ---
      dashboard: "Kontrol Paneli",
      mood_journal: "Duygu Günlüğü",
      marketplace: "Turp Bazaar",
      save: "Kaydet",
      logout: "Çıkış Yap",
      analysis_result: "Analiz Sonucu",
      why_gencturp: "Neden Turp Modum?",
      feature_music_title: "Müzik Terapisi.",
      feature_music_desc: "Yapay zeka ruh halini analiz eder, Spotify üzerinden seni iyileştirecek frekansı açar.",
      feature_risk_title: "Risk Radarı",
      feature_risk_desc: "Okul genelindeki depresyon ve zorbalık eğilimlerini ısı haritasında görün.",
      feature_gamification_title: "Ödül Sistemi",
      feature_gamification_desc: "Anketleri çözdükçe Turp Puan kazan, sinema bileti ve kahve ödüllerini kap.",
      feature_privacy_title: "Sırlar, Sır Kalır.",
      feature_privacy_desc: "Veriler uçtan uca şifrelenir."
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