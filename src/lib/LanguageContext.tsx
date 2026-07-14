import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ms';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

  const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.tools': 'Tools',
    'nav.blog': 'Blog',
    'nav.openHire': 'Open Hire',
    'hero.greeting': "Hello, I'm",
    'hero.role': 'Web Developer & Designer',
    'hero.description': "I build pixel-perfect, engaging, and accessible digital experiences.",
    'hero.viewWork': 'View My Work',
    'hero.contactMe': 'Contact Me',
    'portfolio.title': 'Featured Works',
    'portfolio.viewAll': 'View All Projects',
    'blog.title': 'Latest Writing',
    'blog.viewAll': 'Read All Articles',
    'footer.rights': 'All rights reserved.',
  },
  ms: {
    'nav.home': 'Utama',
    'nav.about': 'Tentang',
    'nav.services': 'Servis',
    'nav.portfolio': 'Portfolio',
    'nav.tools': 'Alatan',
    'nav.blog': 'Blog',
    'nav.openHire': 'Buka Pekerjaan',
    'hero.greeting': "Sesiapa, Saya",
    'hero.role': 'Pembangun & Perekabentuk Web',
    'hero.description': "Saya membina pengalaman digital yang sempurna, menarik dan mudah diakses.",
    'hero.viewWork': 'Lihat Hasil Kerja',
    'hero.contactMe': 'Hubungi Saya',
    'portfolio.title': 'Hasil Kerja Pilihan',
    'portfolio.viewAll': 'Lihat Semua Projek',
    'blog.title': 'Penulisan Terkini',
    'blog.viewAll': 'Baca Semua Artikel',
    'footer.rights': 'Hak cipta terpelihara.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Check local storage for saved language preference
    const savedLang = localStorage.getItem('site_language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'ms')) {
      setLanguageState(savedLang);
    } else {
      // Check browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('ms')) {
        setLanguageState('ms');
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('site_language', lang);
  };

  const t = (key: string): string => {
    // @ts-ignore
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
