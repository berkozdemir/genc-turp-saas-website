import { createClient } from '@supabase/supabase-js';

// Ortam değişkenlerini güvenli bir şekilde alalım
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseInstance = null;

// Eğer anahtarlar varsa gerçek bağlantıyı kur
if (supabaseUrl && supabaseAnonKey) {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error("Supabase başlatma hatası:", error);
  }
} else {
  // Anahtarlar yoksa konsola uyarı bas ama uygulamayı ÇÖKERTME
  console.warn(
    "⚠️ DİKKAT: Supabase anahtarları bulunamadı. Veritabanı bağlantısı çalışmayacak." +
    "\nLütfen .env dosyasını kontrol edin."
  );
}

// Supabase nesnesini dışa aktar (Eğer null ise, bunu kullanan yerlerde kontrol etmemiz gerekebilir)
// Ancak uygulamanın çökmemesi için sahte (mock) bir yapı da dönebiliriz.
export const supabase = supabaseInstance || {
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: [], error: null }),
    update: () => Promise.resolve({ data: [], error: null }),
    delete: () => Promise.resolve({ data: [], error: null }),
    eq: function() { return this; },
    order: function() { return this; },
    limit: function() { return this; },
    single: function() { return Promise.resolve({ data: null, error: null }); }
  }),
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signInWithPassword: () => Promise.resolve({ data: {}, error: "Demo Modu: Giriş devre dışı" }),
    signOut: () => Promise.resolve()
  }
};