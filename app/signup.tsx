import { useLanguage } from '@/src/hooks/useLanguage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View
} from 'react-native';

export default function SignUpScreen() {
    const router = useRouter();
    const { t, isRTL } = useLanguage();
    const { width, height } = useWindowDimensions();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setKeyboardVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setKeyboardVisible(false)
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Top Decoration — Rainbow (Always Left for Sign Up) */}
            <Image
                source={require('@/assets/images/rainbow_to_left_side.png')}
                style={[
                    styles.rainbow,
                    {
                        width: width * 0.5,
                        height: width * 0.5,
                        left: -width * 0.1,
                        top: -width * 0.02
                    }
                ]}
                resizeMode="contain"
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, width: '100%' }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Top Section */}
                    <View style={styles.headerSection}>
                        <Text style={styles.signUpTitle}>{t.signUp.toUpperCase()}</Text>
                    </View>

                    {/* Form Section */}
                    <View style={styles.formContainer}>
                        {/* Username */}
                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>{t.username}</Text>
                            <TextInput
                                style={styles.input}
                                value={username}
                                onChangeText={setUsername}
                                placeholder=""
                            />
                        </View>

                        {/* Email */}
                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>{t.email}</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholder=""
                            />
                        </View>

                        {/* Password */}
                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>{t.password}</Text>
                            <View style={styles.passwordWrapper}>
                                <TextInput
                                    style={styles.input}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    placeholder=""
                                />
                                <TouchableOpacity
                                    style={styles.eyeIcon}
                                    onPress={() => setShowPassword(!showPassword)}
                                >
                                    <MaterialCommunityIcons
                                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                                        size={22}
                                        color="#666"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Confirm Password */}
                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>{t.confirmPassword}</Text>
                            <View style={styles.passwordWrapper}>
                                <TextInput
                                    style={styles.input}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry={!showConfirmPassword}
                                    placeholder=""
                                />
                                <TouchableOpacity
                                    style={styles.eyeIcon}
                                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <MaterialCommunityIcons
                                        name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                                        size={22}
                                        color="#666"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Sign Up Button */}
                        <TouchableOpacity
                            style={styles.signUpButton}
                            onPress={() => { }}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.signUpButtonText}>{t.signUp}</Text>
                        </TouchableOpacity>

                        {/* Footer */}
                        <View style={styles.footerRow}>
                            <Text style={styles.footerText}>{t.alreadyHaveAccount} </Text>
                            <TouchableOpacity onPress={() => router.push('/login')}>
                                <Text style={styles.loginLink}>{t.login}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Bottom Decorations — Only visible when keyboard is hidden */}
            {!isKeyboardVisible && (
                <>
                    {/* Bottom Decoration — Star (Left) */}
                    <Image
                        source={require('@/assets/images/star.png')}
                        style={[
                            styles.star,
                            {
                                width: width * 0.45,
                                height: width * 0.45,
                                left: -width * 0.05,
                                bottom: -5
                            }
                        ]}
                        resizeMode="contain"
                    />

                    {/* Bottom Decoration — Fox (Right) */}
                    <Image
                        source={require('@/assets/images/fox.png')}
                        style={[
                            styles.fox,
                            {
                                width: 90,
                                height: 110,
                                right: 20,
                                bottom: 20
                            }
                        ]}
                        resizeMode="contain"
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF5E6',
    },
    scrollContent: {
        alignItems: 'center',
        paddingTop: 100,
        paddingBottom: 40,
    },
    rainbow: {
        position: 'absolute',
        zIndex: 0,
    },
    headerSection: {
        marginBottom: 30,
        zIndex: 1,
    },
    signUpTitle: {
        fontSize: 36,
        fontWeight: '400',
        color: '#000',
        fontFamily: Platform.OS === 'ios' ? 'Snell Roundhand' : 'serif', // Attempting cursive style from mockup
    },
    formContainer: {
        width: '85%',
    },
    inputGroup: {
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        color: '#000',
        marginBottom: 6,
        fontWeight: '500',
        paddingHorizontal: 10,
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 24,
        paddingHorizontal: 20,
        fontSize: 16,
        backgroundColor: '#FFF',
        width: '100%',
    },
    passwordWrapper: {
        position: 'relative',
        justifyContent: 'center',
    },
    eyeIcon: {
        position: 'absolute',
        right: 20,
        height: '100%',
        justifyContent: 'center',
    },
    signUpButton: {
        backgroundColor: '#40D4E0', // Light blue from mockup
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    signUpButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '500',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },
    footerText: {
        fontSize: 14,
        color: '#000',
    },
    loginLink: {
        fontSize: 14,
        color: '#E2725B',
        textDecorationLine: 'underline',
    },
    star: {
        position: 'absolute',
        zIndex: 0,
    },
    fox: {
        position: 'absolute',
        zIndex: 0,
    },
});
