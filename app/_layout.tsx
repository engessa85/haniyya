import { LanguageProvider } from "@/src/hooks/useLanguage";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <LanguageProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </LanguageProvider>
  );
}
