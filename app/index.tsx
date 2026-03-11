import { useLanguage } from '@/src/hooks/useLanguage';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const { language, toggleLanguage, t, isRTL } = useLanguage();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Top Right — Rainbow */}
      <Image
        source={require('@/assets/images/rainbow.png')}
        style={styles.rainbow}
        resizeMode="contain"
      />

      {/* Middle — Fox + Welcome */}
      <View style={styles.welcomeRow}>
        <Image
          source={require('@/assets/images/fox.png')}
          style={styles.foxImage}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>WELCOME</Text>
      </View>

      {/* Enter Button */}
      <TouchableOpacity
        style={styles.enterButton}
        onPress={() => router.push('/login')}
        activeOpacity={0.7}
      >
        <Text style={styles.enterText}>ENTER</Text>
      </TouchableOpacity>

      {/* Language Switcher */}
      <View style={styles.languageRow}>
        <TouchableOpacity onPress={() => toggleLanguage('en')}>
          <Text style={[
            styles.langText,
            language === 'en' && styles.langActive
          ]}>
            English
          </Text>
        </TouchableOpacity>

        <Text style={styles.divider}>|</Text>

        <TouchableOpacity onPress={() => toggleLanguage('ar')}>
          <Text style={[
            styles.langText,
            language === 'ar' && styles.langActive
          ]}>
            العربية
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Left — Star */}
      <Image
        source={require('@/assets/images/star.png')}
        style={styles.star}
        resizeMode="contain"
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF5E6', // MATCH MOCKUP CREAM COLOR
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Decorations
  rainbow: {
    position: 'absolute',
    top: -10,
    right: -60,
    width: width * 0.6,
    height: width * 0.6,
  },
  star: {
    position: 'absolute',
    bottom: -10,
    left: -10,
    width: width * 0.5,
    height: width * 0.5,
  },

  // Top section
  topSection: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -40,
  },
  appName: {
    fontSize: 50,
    color: '#8B5A2B', // Brownish color from mockup
    marginBottom: -15,
    zIndex: 1,
  },
  bookImage: {
    width: width * 0.7,
    height: width * 0.5,
  },

  // Welcome row
  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    gap: 10,
    justifyContent: 'center',
    width: '100%',
  },
  foxImage: {
    width: 80,
    height: 100,
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: '400',
    color: '#000',
    marginTop: 20,
  },

  // Button
  enterButton: {
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 15,
    paddingVertical: 12,
    width: '80%',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'transparent',
  },
  enterText: {
    fontSize: 20,
    color: '#A0522D', // Brown color for button text
    letterSpacing: 1,
  },

  // Language
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  langText: {
    fontSize: 16,
    color: '#E2725B', // Reddish color for language switcher
  },
  langActive: {
    fontWeight: 'bold',
  },
  divider: {
    color: '#E2725B',
    fontSize: 20,
  },
});


