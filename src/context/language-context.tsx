"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { translations, Translation } from '@/lib/translations';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Translation[Language];
  isRTL: boolean;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  useEffect(() => {
    const storedLang = localStorage.getItem('barakah-lang') as Language;
    if (storedLang && (storedLang === 'en' || storedLang === 'ar')) {
      setLanguage(storedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('barakah-lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, translations: translations[language], isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};
