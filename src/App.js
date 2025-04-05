import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import AuthPage from "./AuthPage";
import Dashboard from "./Dashboard";
import Starfield from "./components/Starfield";
import UserMenu from "./components/UserMenu";
import LandingPage from "./LandingPage";

export default function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showLanding, setShowLanding] = useState(true); // <-- NEW

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    // Show landing page first
    if (!user && showLanding) {
        return (
            <div className="relative">
                <Starfield />
                <div className="relative z-10">
                    <LandingPage onGetStarted={() => setShowLanding(false)} />
                </div>
            </div>
        );
    }

    // Show login screen if not logged in
    if (!user) {
        return (
            <div className="relative">
                <Starfield />
                <div className="relative z-10">
                    <AuthPage onAuthSuccess={(u) => setUser(u)} />
                </div>
            </div>
        );
    }

    // User is authenticated, show dashboard
    return (
        <div className="relative">
            <title>Feynman Helper</title>
            <Starfield />
            <UserMenu user={user} onLogout={() => window.location.reload()} />
            <div className="relative z-10">
                <Dashboard user={user} />
            </div>
        </div>
    );
}
