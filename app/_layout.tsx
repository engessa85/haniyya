import { AuthProvider, useAuth } from "@/src/context/AuthContext";
import { LanguageProvider } from "@/src/hooks/useLanguage";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

function RootLayoutNavigation() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const s = segments as string[];
    const inAuthGroup = s[0] === '(auth)' || s.length === 0 || s[0] === 'login' || s[0] === 'signup';

    if (!user && !inAuthGroup) {
      // Redirect to welcome/login if not logged in
      router.replace('/');
    } else if (user && inAuthGroup) {
      // Redirect to main if logged in
      router.replace('/main');
    }
  }, [user, loading, segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <RootLayoutNavigation />
      </AuthProvider>
    </LanguageProvider>
  );
}
