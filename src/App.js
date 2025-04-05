// App.js
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import AuthPage from "./AuthPage";
import Dashboard from "./Dashboard";
import Starfield from "./components/Starfield";
import UserMenu from "./components/UserMenu";

export default function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!user) return <AuthPage onAuthSuccess={(u) => setUser(u)} />;

    return (
        <div className="relative">
            <Starfield />
            <UserMenu user={user} onLogout={() => window.location.reload()} />
            <div className="relative z-10">
                <Dashboard user={user}/>
            </div>
        </div>
    );
}
