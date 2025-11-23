import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Çeviri Kaynakları
const resources = {
  en: {
    translation: {
      welcome: "Welcome to Genç Turp",
      login: "Login",
      student_mode: "Student Mode",
      school_mode: "School Mode",
      dashboard: "Dashboard",
      mood_journal: "Mood Journal",
      marketplace: "Turp Bazaar",
      spotify_mode: "Spotify Mode",
      save: "Save",
      logout: "Logout"
    }
  },
  tr: {
    translation: {
      welcome: "Genç Turp'a Hoş Geldiniz",
      login: "Giriş Yap",
      student_mode: "Öğrenci Modu",
      school_mode: "Okul Modu",
      dashboard: "Kontrol Paneli",
      mood_journal: "Duygu Günlüğü",
      marketplace: "Turp Bazaar",
      spotify_mode: "Spotify Modu",
      save: "Kaydet",
      logout: "Çıkış Yap"
    }
  }
};

i18n
  .use(initReactI18next) // i18n'i React'e bağla
  .init({
    resources,
    lng: "tr", // Varsayılan dil Türkçe
    fallbackLng: "en", // Türkçe bulunamazsa İngilizce kullan
    
    interpolation: {
      escapeValue: false // React zaten XSS koruması sağlıyor
    }
  });

export default i18n;
```

### 3. Adım: `src/main.tsx` Dosyanı Kontrol Et

Eğer az önce `main.tsx` içinden `import "./i18n";` satırını sildiysen, şimdi **geri eklemelisin**.

**`src/main.tsx`** dosyanın son hali şöyle olmalı:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "./i18n"; // <-- BU SATIR ARTIK HATA VERMEYECEK
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)