// AuthPage.jsx
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";

export default function AuthPage({ onAuthSuccess }) {
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                // (Optional) Fetch basic user info from Google
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                console.log("Google user info:", res.data);

                // Convert the Google access token into a Firebase credential.
                const credential = GoogleAuthProvider.credential(null, tokenResponse.access_token);
                const result = await signInWithCredential(auth, credential);
                // Call the onAuthSuccess callback with the signed-in Firebase user.
                onAuthSuccess(result.user);
            } catch (err) {
                console.error("Error during Firebase sign-in", err);
            }
        },
        onError: (errorResponse) => console.error("Login Failed:", errorResponse),
    });

    return (
        <div className="h-screen flex items-center justify-center flex-col bg-gray-100">
            <h1 className="text-2xl font-semibold mb-6">Welcome to the Learning App</h1>
            <button
                onClick={() => login()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
            >
                Sign in with Google
            </button>
        </div>
    );
}
