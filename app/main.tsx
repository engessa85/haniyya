import { useLanguage } from '@/src/hooks/useLanguage';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../src/context/AuthContext';

export default function MainPage() {
    const { signOut } = useAuth();
    const router = useRouter();
    const { t, isRTL } = useLanguage();
    const { width } = useWindowDimensions();

    const handleSignOut = async () => {
        try {
            await signOut();
            // AuthContext will handle redirection
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            {/* Top Decoration — Rainbow */}
            <Image
                source={isRTL ? require('@/assets/images/rainbow_to_left_side.png') : require('@/assets/images/rainbow_to_right_side.png')}
                style={[
                    styles.rainbow,
                    {
                        width: width * 0.6,
                        height: width * 0.6,
                        ...(isRTL ? { left: -width * 0.15 } : { right: -width * 0.2 })
                    }
                ]}
                resizeMode="contain"
            />

            {/* Main Content */}
            <View style={styles.content}>
                <View style={[styles.imageContainer, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                    <Image
                        source={require('@/assets/images/vital.png')}
                        style={[styles.mainImage, { width: width * 0.4, height: width * 0.4 }]}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('@/assets/images/teddy.png')}
                        style={[styles.mainImage, { width: width * 0.4, height: width * 0.4 }]}
                        resizeMode="contain"
                    />
                </View>

                <Text style={styles.title}>{t.welcome}</Text>

                <TouchableOpacity
                    style={styles.signOutButton}
                    onPress={handleSignOut}
                >
                    <Text style={styles.signOutText}>Sign Out</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Decoration — Star */}
            <Image
                source={require('@/assets/images/star.png')}
                style={[
                    styles.star,
                    {
                        width: width * 0.5,
                        height: width * 0.5,
                        left: -width * 0.05
                    }
                ]}
                resizeMode="contain"
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF5E6', // Match cream background
    },
    rainbow: {
        position: 'absolute',
        top: -10, // Adjusted for SafeAreaView
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 40,
    },
    mainImage: {
        // Dynamic width/height
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#8B5A2B',
        marginBottom: 20,
    },
    signOutButton: {
        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 15,
        borderWidth: 1.5,
        borderColor: '#000',
    },
    signOutText: {
        fontSize: 18,
        color: '#A0522D',
        fontWeight: '600',
    },
    star: {
        position: 'absolute',
        bottom: -10,
    },
});
