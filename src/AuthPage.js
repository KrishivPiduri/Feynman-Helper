// AuthPage.jsx
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";

export default function AuthPage({ onAuthSuccess }) {
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                // Optional: Fetch basic user info from Google
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                console.log("Google user info:", res.data);

                // Create a Firebase credential with the token
                const credential = GoogleAuthProvider.credential(null, tokenResponse.access_token);
                const result = await signInWithCredential(auth, credential);
                onAuthSuccess(result.user);
            } catch (err) {
                console.error("Error during Firebase sign-in", err);
            }
        },
        onError: (errorResponse) => console.error("Login Failed:", errorResponse),
    });

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-sm">
                <h1 className="text-2xl font-semibold mb-6">Welcome to the Learning App</h1>
                <button
                    onClick={() => login()}
                    className="flex items-center justify-center border border-gray-300 rounded-lg px-6 py-3 hover:bg-gray-50 transition-colors mx-auto"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                        alt="Google"
                        className="w-6 h-6 mr-3"
                    />
                    <span className="text-gray-700 font-medium">Sign in with Google</span>
                </button>
            </div>
        </div>
    );
}
