// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDrfkrhbw7w1X3szJ7LMtjbE6rJVNVA4Zo",
    authDomain: "feynmanhelper.firebaseapp.com",
    projectId: "feynmanhelper",
    storageBucket: "feynmanhelper.firebasestorage.app",
    messagingSenderId: "1050414283357",
    appId: "1:1050414283357:web:8adf9bbd712f3e4b476bb4",
    measurementId: "G-SE10LCKKWH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
