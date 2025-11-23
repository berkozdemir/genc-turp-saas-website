import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../services/supabase';

// Tanım Tipi
interface SeoData {
  title: string;
  description: string;
  keywords: string;
  og_image_url: string;
}

// Yeni marka adına uygun varsayılan (Fallback) SEO verisi
const DEFAULT_SEO: SeoData = {
  title: 'Turp Modum | Akıllı Duygu Takipçim - Okul Mental Sağlık Platformu',
  description: 'Akıllı Duygu Takipçim Turp Modum, öğrencilerin ruh halini analiz eden, yapay zeka destekli erken uyarı ve PDR/Veli iletişimini sağlayan kapsamlı okul refah sistemidir.',
  keywords: 'turp modum, akıllı duygu takipçim, mental sağlık, okul, PDR, yapay zeka, öğrenci takibi',
  og_image_url: 'https://www.turpmodum.com/logo.png', // Yeni isme uygun yer tutucu URL
};

interface SeoHelmetProps {
  slug: string; // Hangi sayfanın verisi çekilecek? (Örn: 'home', 'login')
  localTitle?: string; // Sadece koddan gelen başlık (DB'de yoksa veya dinamikse)
}

export default function SeoHelmet({ slug, localTitle }: SeoHelmetProps) {
  const [seo, setSeo] = useState<SeoData>(DEFAULT_SEO);

  useEffect(() => {
    fetchSeoData(slug);
  }, [slug]);

  const fetchSeoData = async (pageSlug: string) => {
    try {
      const { data } = await supabase
        .from('seo_meta')
        .select('*')
        .eq('page_slug', pageSlug)
        .single();

      if (data) {
        setSeo({
          title: data.title,
          description: data.description || DEFAULT_SEO.description,
          keywords: data.keywords || DEFAULT_SEO.keywords,
          og_image_url: data.og_image_url || DEFAULT_SEO.og_image_url,
        });
      } else {
        // DB'de bulunamazsa veya hata olursa default/fallback kullanır
        setSeo({ ...DEFAULT_SEO, title: localTitle || DEFAULT_SEO.title });
      }
    } catch (err) {
      console.error("SEO verisi çekilemedi. Varsayılan kullanılıyor.", err);
      // Hata durumunda sadece yerel başlığı kullan (Örn: "Giriş Yap - Turp Modum")
      setSeo({ ...DEFAULT_SEO, title: localTitle || DEFAULT_SEO.title });
    }
  };

  return (
    <Helmet>
      {/* Temel Etiketler */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* OG (Open Graph) / Sosyal Medya Etiketleri */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.og_image_url} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card Etiketleri */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.og_image_url} />
    </Helmet>
  );
}