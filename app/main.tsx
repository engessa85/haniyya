import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../src/context/AuthContext';

export default function MainPage() {
    const router = useRouter();
    const { user, signOut } = useAuth();

    const handleSignOut = async () => {
        await signOut();
        // Navigation will be handled by the RootLayout listener
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            <View style={styles.content}>
                <Text style={styles.title}>Main Page</Text>
                <Text style={styles.subtitle}>Welcome, {user?.email}</Text>

                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>Design coming soon...</Text>
                </View>

                <TouchableOpacity
                    style={styles.signOutButton}
                    onPress={handleSignOut}
                >
                    <Text style={styles.signOutText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF5E6',
    },
    content: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
    },
    placeholder: {
        width: '100%',
        height: 200,
        borderWidth: 2,
        borderColor: '#CCC',
        borderStyle: 'dashed',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    placeholderText: {
        color: '#AAA',
        fontSize: 18,
    },
    signOutButton: {
        backgroundColor: '#E2725B',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
    },
    signOutText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
