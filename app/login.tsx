import { useLanguage } from '@/src/hooks/useLanguage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    Image,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View
} from 'react-native';

export default function LoginScreen() {
    const router = useRouter();
    const { t, isRTL } = useLanguage();
    const { width, height } = useWindowDimensions();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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

            {/* Top Decoration — Rainbow (Always Left for Login) */}
            <Image
                source={require('@/assets/images/rainbow_to_left_side.png')}
                style={[
                    styles.rainbow,
                    {
                        width: width * 0.6,
                        height: width * 0.6,
                        left: -width * 0.15,
                        top: -width * 0.05
                    }
                ]}
                resizeMode="contain"
            />

            {/* Top Section - Book */}
            <View style={styles.topSection}>
                <Image
                    source={require('@/assets/images/book.png')}
                    style={[styles.bookImage, { width: width * 0.7, height: width * 0.5 }]}
                    resizeMode="contain"
                />
                <Text style={styles.loginTitle}>{t.login.toUpperCase()}</Text>
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
                                size={24}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.forgotContainer}>
                        <Text style={styles.forgotText}>{t.forgotPassword}</Text>
                    </TouchableOpacity>
                </View>

                {/* Sign In Button */}
                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={() => { }}
                    activeOpacity={0.8}
                >
                    <Text style={styles.signInText}>{t.signIn}</Text>
                </TouchableOpacity>

                {/* Footer */}
                <View style={styles.footerRow}>
                    <Text style={styles.footerText}>{t.noAccount} </Text>
                    <TouchableOpacity onPress={() => router.push('/signup')}>
                        <Text style={styles.signUpText}>{t.signUp}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Bottom Decorations — Only visible when keyboard is hidden */}
            {!isKeyboardVisible && (
                <>
                    {/* Bottom Decoration — Star (Left) */}
                    <Image
                        source={require('@/assets/images/star.png')}
                        style={[
                            styles.star,
                            {
                                width: width * 0.5,
                                height: width * 0.5,
                                left: -width * 0.05,
                                bottom: -5 // Synced with landing screen
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
                                width: 100,
                                height: 120,
                                right: 20
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
        alignItems: 'center',
        paddingTop: 60,
    },
    rainbow: {
        position: 'absolute',
    },
    topSection: {
        alignItems: 'center',
        marginBottom: 20,
        zIndex: 1,
    },
    bookImage: {
        marginBottom: 10,
    },
    loginTitle: {
        fontSize: 32,
        fontWeight: '500',
        color: '#000',
        marginTop: -20,
    },
    formContainer: {
        width: '85%',
        marginTop: 10,
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#000',
        marginBottom: 8,
        fontWeight: '500',
        paddingHorizontal: 10,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 25,
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
    forgotContainer: {
        alignSelf: 'flex-start',
        marginTop: 5,
        paddingHorizontal: 10,
    },
    forgotText: {
        color: '#AAA',
        fontSize: 12,
    },
    signInButton: {
        backgroundColor: '#C0DF34', // Light green from mockup
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    signInText: {
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
    signUpText: {
        fontSize: 14,
        color: '#E2725B',
        textDecorationLine: 'underline',
    },
    fox: {
        position: 'absolute',
        bottom: 20,
    },
    star: {
        position: 'absolute',
    },
});
