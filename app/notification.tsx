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

export default function NotificationScreen() {
    const { signOut } = useAuth();
    const router = useRouter();
    const { t, isRTL } = useLanguage();
    const { width } = useWindowDimensions();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const notifications = [
        {
            id: '1',
            title: 'Baby',
            message: 'inside the Haniyyah Smart Tent',
            time: 'Today at 01.52 PM',
        },
        {
            id: '2',
            title: 'Baby',
            message: 'just start the story',
            time: 'Today at 1.45 PM',
        },
        {
            id: '3',
            title: 'Story',
            message: 'has upload to the teddy successful',
            time: 'Today at 1.23 PM',
        },
    ];

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const NotificationItem = ({ title, message, time }: { title: string, message: string, time: string }) => (
        <View style={styles.notificationItem}>
            <View style={styles.iconContainer}>
                <View style={styles.iconCircle}>
                    <Ionicons name="person" size={24} color="#FFF" />
                </View>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.messageText}>
                    <Text style={styles.boldText}>{title}</Text> {message}
                </Text>
                <Text style={styles.timeText}>{time}</Text>
            </View>
        </View>
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
                    } else if (screen === 'story-library') {
                        router.push('/story-library');
                    } else if (screen === 'activity-report') {
                        router.push('/activity-report');
                    }
                    setIsSidebarOpen(false);
                }}
                onSignOut={handleSignOut}
            />

            {/* Top Decoration — Rainbow */}
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

                <Text style={styles.headerTitle}>NOTIFICATION</Text>

                <View style={styles.unReadRow}>
                    <Text style={styles.unReadText}>Un Read (3)</Text>
                    <TouchableOpacity>
                        <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                <ScrollView 
                    style={styles.list}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {notifications.map((notif) => (
                        <NotificationItem 
                            key={notif.id} 
                            title={notif.title} 
                            message={notif.message} 
                            time={notif.time} 
                        />
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
        color: '#000',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    unReadRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        marginBottom: 20,
    },
    unReadText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#000',
    },
    list: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 30,
        paddingBottom: 150,
    },
    notificationItem: {
        flexDirection: 'row',
        marginBottom: 30,
        alignItems: 'flex-start',
    },
    iconContainer: {
        marginRight: 15,
    },
    iconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#A06060', // Dusty rose
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        paddingTop: 5,
    },
    messageText: {
        fontSize: 18,
        color: '#333',
        lineHeight: 24,
    },
    boldText: {
        fontWeight: 'bold',
        color: '#000',
    },
    timeText: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
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
