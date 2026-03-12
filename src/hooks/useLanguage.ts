import { useState } from 'react';

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

export function useLanguage() {
    const [language, setLanguage] = useState<Language>('en');

    const toggleLanguage = (lang: Language) => setLanguage(lang);
    const t = translations[language];
    const isRTL = language === 'ar';

    return { language, toggleLanguage, t, isRTL };
}