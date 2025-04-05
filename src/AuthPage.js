// AuthPage.jsx
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import React from "react";

export default function AuthPage({ onAuthSuccess }) {
    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            // result.user contains the Firebase user info.
            onAuthSuccess(result.user);
        } catch (err) {
            console.error("Firebase sign-in error:", err);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-sm">
                {/* Optionally include Google logo */}
                <h1 className="text-2xl font-semibold mb-6">Welcome to the Learning App</h1>
                <button
                    onClick={handleLogin}
                    className="flex items-center justify-center border border-gray-300 rounded-lg px-6 py-3 hover:bg-gray-50 transition-colors mx-auto"
                >
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ901eAwCHJkZ_K-vjQz9vX-WNgASX8gisXw&s"
                        alt="Google"
                        className="w-6 h-6 mr-3"
                    />
                    <span className="text-gray-700 font-medium">Sign in with Google</span>
                </button>
            </div>
        </div>
    );
}
