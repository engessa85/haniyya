import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    View,
    Text, // Added Text import
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window'); // Changed width to SCREEN_WIDTH
const SIDEBAR_WIDTH = 220; // Widen sidebar

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (screen: string) => void;
    onSignOut: () => void; // Added onSignOut prop
}

export default function Sidebar({ isOpen, onClose, onNavigate, onSignOut }: SidebarProps) { // Added onSignOut to props
    const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: isOpen ? 0 : -SIDEBAR_WIDTH,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isOpen]);

    // Safety check for visibility
    if (!isOpen) {
        slideAnim.setValue(-SIDEBAR_WIDTH);
    }

    return (
        <View style={[StyleSheet.absoluteFill, { pointerEvents: isOpen ? 'auto' : 'none' }]}>
            {/* Backdrop to close when clicking outside */}
            {isOpen && (
                <Pressable style={styles.backdrop} onPress={onClose} />
            )}

            <Animated.View
                style={[
                    styles.sidebar,
                    {
                        transform: [{ translateX: slideAnim }],
                    },
                ]}
            >
                <View style={styles.container}>
                    {/* Hamburger Menu (Close) */}
                    <TouchableOpacity style={styles.menuButton} onPress={onClose}>
                        <Ionicons name="menu-outline" size={32} color="#000" />
                    </TouchableOpacity>

                    <View style={styles.navItems}>
                        <TouchableOpacity 
                            style={styles.navItem} 
                            onPress={() => onNavigate('home')}
                        >
                            <Ionicons name="home" size={24} color="#000" />
                            <Text style={styles.navText}>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.navItem} 
                            onPress={() => onNavigate('story-library')}
                        >
                            <Ionicons name="person" size={24} color="#000" />
                            <Text style={styles.navText}>Story Library</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.navItem} 
                            onPress={() => onNavigate('activity-report')}
                        >
                            <View style={styles.activityBox}>
                                <Ionicons name="stats-chart-outline" size={20} color="#000" />
                            </View>
                            <Text style={styles.navText}>Activity Report</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.navItem} 
                            onPress={() => onNavigate('notification')}
                        >
                            <Ionicons name="notifications" size={24} color="#000" />
                            <Text style={styles.navText}>Notification</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.navItem} 
                            onPress={() => onNavigate('settings')}
                        >
                            <Ionicons name="settings-outline" size={24} color="#000" />
                            <Text style={styles.navText}>Setting</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Sign Out at the Bottom */}
                    <View style={styles.bottomSection}>
                        <TouchableOpacity style={styles.navItem} onPress={onSignOut}>
                            <Ionicons name="log-out-outline" size={24} color="#8B0000" />
                            <Text style={[styles.navText, { color: '#8B0000' }]}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.1)',
        zIndex: 10,
    },
    sidebar: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: SIDEBAR_WIDTH,
        backgroundColor: '#FDF5E6',
        zIndex: 20,
        borderRightWidth: 1,
        borderRightColor: 'rgba(0,0,0,0.05)',
        elevation: 5, // Added elevation
        shadowColor: '#000', // Added shadow
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20, // Added paddingHorizontal
    },
    menuButton: {
        marginBottom: 40,
        alignSelf: 'flex-start', // Added alignSelf
    },
    navItems: {
        gap: 25, // Changed gap
    },
    navItem: {
        flexDirection: 'row', // Added flexDirection
        alignItems: 'center',
        paddingVertical: 10, // Added paddingVertical
        gap: 15, // Added gap
    },
    navText: { // Added navText style
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
    },
    activityBox: {
        borderWidth: 1.5,
        borderColor: '#000',
        borderRadius: 6, // Changed borderRadius
        padding: 2, // Changed padding
        width: 28, // Added width
        height: 28, // Added height
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSection: { // Added bottomSection style
        marginTop: 'auto',
        marginBottom: 30,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
        paddingTop: 20,
    },
});
