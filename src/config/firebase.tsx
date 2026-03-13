import { getApp, getApps, initializeApp } from '@firebase/app';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore
import { Auth, getAuth, getReactNativePersistence, initializeAuth } from '@firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvTBVoxJ6_ZJv4hMiwE3D2rCRG5NTkwOU",
    authDomain: "haniyyadb.firebaseapp.com",
    databaseURL: "https://haniyyadb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "haniyyadb",
    storageBucket: "haniyyadb.firebasestorage.app",
    messagingSenderId: "673648828732",
    appId: "1:673648828732:web:dc458af841ef5d184ebe39"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth with persistence for React Native
let auth: Auth;
try {
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
} catch (e) {
    // If already initialized, use getAuth
    auth = getAuth(app);
}

export { auth };

