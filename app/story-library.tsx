import { useLanguage } from '@/src/hooks/useLanguage';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../src/context/AuthContext';
import Sidebar from '@/src/components/Sidebar';
import { Ionicons } from '@expo/vector-icons';

export default function StoryLibraryScreen() {
    const { signOut } = useAuth();
    const router = useRouter();
    const { t, isRTL } = useLanguage();
    const { width, height } = useWindowDimensions();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const categories = [
        { id: 'kuwaiti', title: 'Kuwaiti Tales' },
        { id: 'arabic', title: 'Arabic' },
        { id: 'international', title: 'International' },
        { id: 'short', title: 'Short Story' },
        { id: 'create', title: 'Create your story' },
    ];

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const CategoryCard = ({ title }: { title: string }) => (
        <TouchableOpacity style={styles.card}>
            <View style={styles.iconCircle} />
            <Text style={styles.cardText}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
                onNavigate={(screen) => {
                    if (screen === 'home') {
                        router.push('/main');
                    }
                    setIsSidebarOpen(false);
                }}
                onSignOut={handleSignOut}
            />

            {/* Top Decoration — Rainbow (Inverted/Flipped for variety or as per image) */}
            <Image
                source={isRTL ? require('@/assets/images/rainbow_to_right_side.png') : require('@/assets/images/rainbow_to_left_side.png')}
                style={[
                    styles.rainbow,
                    {
                        width: width * 0.5,
                        height: width * 0.5,
                        top: -20,
                        left: -width * 0.1,
                    }
                ]}
                resizeMode="contain"
            />

            <View style={styles.content}>
                <TouchableOpacity 
                    style={[styles.hamburgerButton, { [isRTL ? 'right' : 'left']: 20 }]} 
                    onPress={() => setIsSidebarOpen(true)}
                >
                    <Ionicons name="menu-outline" size={32} color="#000" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>STORY LIBRARY</Text>

                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {categories.map((cat) => (
                        <CategoryCard key={cat.id} title={cat.title} />
                    ))}
                </ScrollView>
            </View>

            {/* Bottom Decoration — Fox */}
            <Image
                source={require('@/assets/images/fox.png')}
                style={[
                    styles.foxImage,
                    {
                        width: 100,
                        height: 120,
                        bottom: 10,
                        right: 10,
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
                        width: width * 0.6,
                        height: width * 0.6,
                        bottom: -width * 0.15,
                        left: -width * 0.1,
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
        backgroundColor: '#FDF5E6',
    },
    rainbow: {
        position: 'absolute',
        zIndex: 0,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 60,
        zIndex: 1,
    },
    hamburgerButton: {
        position: 'absolute',
        top: 20,
        zIndex: 5,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'normal',
        fontFamily: 'System', // Use a friendly font if available, fallback to System
        color: '#000',
        marginTop: 20,
        marginBottom: 30,
        letterSpacing: 1,
    },
    scrollContent: {
        paddingHorizontal: 30,
        paddingBottom: 100, // Space for fox/star
        width: '100%',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#EAEAEA',
        width: '100%',
        maxWidth: 320,
        height: 70,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
        // Elevation/Shadow
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#A06060', // Dusty rose/maroon
        marginRight: 20,
    },
    cardText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#A06060',
        textDecorationLine: 'underline',
    },
    foxImage: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        zIndex: 2,
    },
    star: {
        position: 'absolute',
        zIndex: 0,
    },
});
