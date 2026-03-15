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
import Sidebar from '@/src/components/Sidebar';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function MainPage() {
    const { signOut, user } = useAuth();
    const router = useRouter();
    const { t, isRTL } = useLanguage();
    const { width } = useWindowDimensions();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

            <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
                onNavigate={(screen) => {
                    if (screen === 'story-library') {
                        router.push('/story-library');
                    } else if (screen === 'activity-report') {
                        router.push('/activity-report');
                    } else if (screen === 'notification') {
                        router.push('/notification');
                    } else if (screen === 'home') {
                        setIsSidebarOpen(false);
                    } else {
                        console.log('Navigating to:', screen);
                    }
                    setIsSidebarOpen(false);
                }}
                onSignOut={handleSignOut}
            />

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
                <TouchableOpacity 
                    style={[styles.hamburgerButton, { [isRTL ? 'right' : 'left']: 20 }]} 
                    onPress={() => setIsSidebarOpen(true)}
                >
                    <Ionicons name="menu-outline" size={32} color="#000" />
                </TouchableOpacity>

                <View style={[styles.headerRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                    <Text style={styles.title}>{t.welcome}</Text>
                    {user?.email && (
                        <Text style={styles.usernameText}>, {user.email.split('@')[0]}</Text>
                    )}
                </View>

                <View style={styles.sectionsWrapper}>
                    {/* Vital Section */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>{t.vitalRecord}</Text>
                        <View style={styles.imageBox}>
                            <Image
                                source={require('@/assets/images/vital.png')}
                                style={[styles.mainImage, { width: width * 0.4, height: width * 0.4 }]}
                                resizeMode="contain"
                            />
                        </View>
                    </View>

                    {/* Teddy Section */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>{t.teddyInformation}</Text>
                        <View style={styles.imageBox}>
                            <Image
                                source={require('@/assets/images/teddy.png')}
                                style={[styles.mainImage, { width: width * 0.4, height: width * 0.4 }]}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.signOutButton}
                    onPress={handleSignOut}
                >
                    <Text style={styles.signOutText}>Sign Out</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Decoration — Fox (Right / Left based on RTL) */}
            <Image
                source={require('@/assets/images/fox.png')}
                style={[
                    styles.foxImage,
                    {
                        width: 100,
                        height: 120,
                        bottom: 20,
                        ...(isRTL ? { left: 20 } : { right: 20 })
                    }
                ]}
                resizeMode="contain"
            />

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
        top: -10,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 60,
        zIndex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#8B5A2B',
    },
    usernameText: {
        fontSize: 20,
        color: '#A0522D',
        fontWeight: '500',
    },
    sectionsWrapper: {
        width: '100%',
        alignItems: 'center',
        gap: 25,
        marginBottom: 30,
    },
    sectionContainer: {
        alignItems: 'center',
        width: '100%',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#A0522D',
        marginBottom: 8,
    },
    imageBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 20,
        padding: 5,
        borderWidth: 1,
        borderColor: '#DEB887',
    },
    mainImage: {
        // Dynamic
    },
    signOutButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 15,
        borderWidth: 1.5,
        borderColor: '#000',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    signOutText: {
        fontSize: 16,
        color: '#A0522D',
        fontWeight: '600',
    },
    foxImage: {
        position: 'absolute',
        bottom: 80,
        zIndex: 2,
    },
    star: {
        position: 'absolute',
        bottom: -10,
    },
    hamburgerButton: {
        position: 'absolute',
        top: 20,
        zIndex: 5,
    },
});
