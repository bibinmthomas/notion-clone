// client sdk for firebase
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD5MAQDaQhbiryDzFZmf5KNbvvZnz1M7zw",
    authDomain: "notion-clone-f1907.firebaseapp.com",
    projectId: "notion-clone-f1907",
    storageBucket: "notion-clone-f1907.firebasestorage.app",
    messagingSenderId: "331657963011",
    appId: "1:331657963011:web:62219b499eef5106599036"
};
// avoids multiple instances of firebase app
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };