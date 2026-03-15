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

export default function ActivityReportScreen() {
    const { signOut } = useAuth();
    const router = useRouter();
    const { t, isRTL } = useLanguage();
    const { width } = useWindowDimensions();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const BarChart = ({ title, data, color, unit, icon }: { title: string, data: number[], color: string, unit: string, icon: any }) => (
        <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
                <Ionicons name={icon} size={16} color={color} />
                <Text style={styles.chartTitle}>{title}</Text>
            </View>
            <View style={styles.barContainer}>
                {data.map((val, i) => (
                    <View key={i} style={[styles.bar, { height: val * 1.5, backgroundColor: color }]} />
                ))}
            </View>
            <Text style={styles.chartFooter}>OCT 26, 09:30AM</Text>
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

                <Text style={styles.headerTitle}>ACTIVITY REPORT</Text>

                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.sectionTitle}>VITAL RECORD</Text>
                    
                    <View style={styles.vitalsRow}>
                        <BarChart 
                            title="PULSE (BPM)" 
                            data={[15, 25, 40, 15, 20, 35, 20, 10, 15, 30, 10]} 
                            color="#E67E7E" 
                            unit="BPM"
                            icon="heart"
                        />
                        <BarChart 
                            title="TEMP °C" 
                            data={[10, 20, 25, 15, 30, 15, 20, 10, 15, 20, 35]} 
                            color="#F39C12" 
                            unit="°C"
                            icon="thermometer"
                        />
                    </View>
                    
                    <View style={styles.vitalsSingle}>
                         <BarChart 
                            title="BREATH (BRPM)" 
                            data={[15, 25, 10, 15, 10, 15, 30, 20, 15, 10, 20, 15]} 
                            color="#5CCF92" 
                            unit="BRPM"
                            icon="fitness-outline"
                        />
                    </View>

                    <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Time per story</Text>
                    
                    <View style={styles.pieContainer}>
                        <View style={styles.pieChart}>
                            {/* Simplified Pie Representation using Views */}
                            <View style={[styles.pieSegment, { backgroundColor: '#AED6F1', flex: 0.42 }]} />
                            <View style={[styles.pieSegment, { backgroundColor: '#ABEBC6', flex: 0.58 }]} />
                        </View>
                        <View style={styles.pieLabels}>
                            <View style={styles.pieLabelItem}>
                                <Text style={styles.pieText}>The little prince</Text>
                                <Text style={styles.piePercent}>42%</Text>
                            </View>
                            <View style={styles.pieLabelItem}>
                                <Text style={styles.pieText}>حمارة القايلة</Text>
                                <Text style={styles.piePercent}>58%</Text>
                            </View>
                        </View>
                    </View>
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
        color: '#000',
        marginTop: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
        marginBottom: 15,
        alignSelf: 'center',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 120,
        width: '100%',
        alignItems: 'center',
    },
    vitalsRow: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 15,
    },
    vitalsSingle: {
        width: '60%',
    },
    chartCard: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 4, // More rectangle look from image
        flex: 1,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        alignItems: 'center',
    },
    chartHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginBottom: 10,
    },
    chartTitle: {
        fontSize: 10,
        fontWeight: '600',
        color: '#333',
    },
    barContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 4,
        height: 60,
        paddingHorizontal: 5,
    },
    bar: {
        width: 6,
        borderRadius: 2,
    },
    chartFooter: {
        fontSize: 8,
        color: '#999',
        marginTop: 5,
    },
    pieContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginTop: 10,
    },
    pieChart: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: 'hidden',
        flexDirection: 'row',
    },
    pieSegment: {
        height: '100%',
    },
    pieLabels: {
        gap: 15,
    },
    pieLabelItem: {
        alignItems: 'center',
    },
    pieText: {
        fontSize: 14,
        color: '#555',
    },
    piePercent: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
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
