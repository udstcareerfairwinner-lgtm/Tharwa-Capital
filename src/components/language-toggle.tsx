"use client";

import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      aria-label="Toggle language"
    >
      <Globe className="h-5 w-5" />
    </Button>
  );
}

export function LanguageTogglePill() {
    const { language, setLanguage, translations } = useLanguage();
  
    const toggleLanguage = () => {
      setLanguage(language === "en" ? "ar" : "en");
    };
  
    return (
        <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur rounded-full shadow-sm"
        >
            <Globe size={16} />
            <span className="text-sm font-medium">{language === 'en' ? 'العربية' : 'English'}</span>
        </button>
    );
  }