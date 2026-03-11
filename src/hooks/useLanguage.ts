import { useState } from 'react';

type Language = 'en' | 'ar';

const translations = {
    en: {
        welcome: 'Welcome',
        enter: 'Enter',
        english: 'English',
        arabic: 'العربية',
    },
    ar: {
        welcome: 'أهلاً',
        enter: 'ادخل',
        english: 'English',
        arabic: 'العربية',
    },
};

export function useLanguage() {
    const [language, setLanguage] = useState<Language>('en');

    const toggleLanguage = (lang: Language) => setLanguage(lang);
    const t = translations[language];
    const isRTL = language === 'ar';

    return { language, toggleLanguage, t, isRTL };
}