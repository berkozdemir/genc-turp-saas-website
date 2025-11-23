import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'tr' ? 'en' : 'tr';
    i18n.changeLanguage(newLang);
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-100 hover:text-black transition-all"
    >
      <span className="text-lg">{i18n.language === 'tr' ? '🇹🇷' : '🇬🇧'}</span>
      {i18n.language === 'tr' ? 'TR' : 'EN'}
    </button>
  );
}