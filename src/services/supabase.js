import { createClient } from '@supabase/supabase-js';

// Ortam değişkenlerini al
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseInstance = null;

// Sadece url ve key DOLU ise createClient'ı çalıştır
if (supabaseUrl && supabaseAnonKey) {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.warn("Supabase bağlantı hatası, Mock moduna geçiliyor.");
  }
}

// --- MOCK (SAHTE) İSTEMCİ ---
// Anahtarlar yoksa veya hata oluşursa bu devreye girer ve uygulamanın çökmesini önler.
const mockSupabase = {
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: [], error: null }),
    update: () => Promise.resolve({ data: [], error: null }),
    delete: () => Promise.resolve({ data: [], error: null }),
    eq: function() { return this; },
    gt: function() { return this; },
    order: function() { return this; },
    limit: function() { return this; },
    single: () => Promise.resolve({ data: null, error: null })
  }),
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signInWithPassword: () => Promise.resolve({ data: {}, error: "Demo Modu: Giriş devre dışı" }),
    signOut: () => Promise.resolve()
  }
};

// Dışa aktarırken kontrol et: Gerçek bağlantı yoksa Mock'u kullan
export const supabase = supabaseInstance || mockSupabase;