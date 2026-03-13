import React, { createContext, ReactNode, useContext, useState } from 'react';

type Language = 'en' | 'ar';

const translations = {
    en: {
        welcome: 'Welcome',
        enter: 'Enter',
        english: 'English',
        arabic: 'العربية',
        login: 'Login',
        username: 'Username',
        password: 'Password',
        signIn: 'Sign in',
        forgotPassword: 'Forgot Password?',
        noAccount: 'Didn\'t have an account?',
        signUp: 'Sign Up',
        email: 'Email',
        confirmPassword: 'Confirm Password',
        alreadyHaveAccount: 'Already have an account?',
    },
    ar: {
        welcome: 'أهلاً',
        enter: 'ادخل',
        english: 'English',
        arabic: 'العربية',
        login: 'تسجيل الدخول',
        username: 'اسم المستخدم',
        password: 'كلمة المرور',
        signIn: 'تسجيل الدخول',
        forgotPassword: 'نسيت كلمة المرور؟',
        noAccount: 'ليس لديك حساب؟',
        signUp: 'إنشاء حساب',
        email: 'البريد الإلكتروني',
        confirmPassword: 'تأكيد كلمة المرور',
        alreadyHaveAccount: 'لديك حساب بالفعل؟',
    },
};

type Translations = typeof translations.en;

interface LanguageContextType {
    language: Language;
    toggleLanguage: (lang: Language) => void;
    t: Translations;
    isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const toggleLanguage = (lang: Language) => setLanguage(lang);
    const t = translations[language];
    const isRTL = language === 'ar';

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t, isRTL }}>
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