import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx' 
import './index.css'
import './i18n' 
import { HelmetProvider } from 'react-helmet-async';

// --- DEBUG 1: Başlangıç ---
console.log("🚀 [main.tsx] Başlatılıyor...");

// --- 1. HATA YAKALAYICI (KOD HATALARI İÇİN) ---
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    // --- DEBUG 2: Hata Yakalandı ---
    console.error("🔥 [ErrorBoundary] getDerivedStateFromError:", error);
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // --- DEBUG 3: Hata Detayı ---
    console.error("🔥 [ErrorBoundary] Kritik Hata Detayı:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
          <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-red-100 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Uygulama Hatası</h2>
            <div className="bg-slate-100 p-3 rounded text-left text-xs font-mono text-red-600 overflow-auto max-h-32 mb-6">
                {this.state.error?.message || "Bilinmeyen Hata"}
            </div>
            <button onClick={() => window.location.reload()} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800">Yenile</button>
          </div>
        </div>
      );
    }
    return this.props.children; 
  }
}

// --- 2. YÜKLENİYOR EKRANI ---
const LoadingScreen = () => {
  console.log("⏳ [LoadingScreen] Gösteriliyor...");
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-rose-600 rounded-full animate-spin"></div>
        <div className="text-slate-400 font-medium text-sm tracking-wide">SİSTEM YÜKLENİYOR...</div>
      </div>
    </div>
  );
};

// --- 3. BAŞLATMA MANTIĞI ---
try {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const rootElement = document.getElementById('root');

  // --- DEBUG 4: Değişkenleri Kontrol Et ---
  console.log("🔍 [main.tsx] Ortam Değişkenleri:", {
    URL_Var_Mi: !!supabaseUrl,
    Key_Var_Mi: !!supabaseKey,
    Root_Var_Mi: !!rootElement
  });

  if (!rootElement) throw new Error("Root elementi bulunamadı!");

  if (!supabaseUrl || !supabaseKey) {
    console.warn("⚠️ [main.tsx] Supabase anahtarları EKSİK!");
    ReactDOM.createRoot(rootElement).render(
      <div className="p-10 text-center">
        <h1 className="text-red-600 font-bold text-xl">Yapılandırma Hatası</h1>
        <p>Supabase anahtarları (.env) bulunamadı.</p>
      </div>
    );
  } else {
    console.log("✅ [main.tsx] Anahtarlar tam, uygulama mount ediliyor...");
    
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <HelmetProvider>
          <ErrorBoundary>
            <React.Suspense fallback={<LoadingScreen />}>
              <App />
            </React.Suspense>
          </ErrorBoundary>
        </HelmetProvider>
      </React.StrictMode>,
    );
    
    console.log("🏁 [main.tsx] render() komutu gönderildi.");
  }

} catch (err) {
  console.error("💣 [main.tsx] ÇÖKME HATASI:", err);
}