import Outline from "./Outline";
import { useState } from "react";

export default function Scrutinize(props) {
    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(false);

    const getFeedback = async () => {
        setLoading(true);
        setFeedback("");

        try {
            const response = await fetch("https://pxvzdecqz0.execute-api.us-east-1.amazonaws.com/scrutinize", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    explanation: props.explanation || ""
                })
            });

            const data = await response.json();

            if (response.ok) {
                setFeedback(data.feedback);
            } else {
                setFeedback(data.error || "Something went wrong.");
            }
        } catch (error) {
            setFeedback("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Outline {...props} />
            <button
                className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-800 disabled:opacity-50"
                onClick={getFeedback}
                disabled={loading}
            >
                {loading ? "Thinking..." : feedback ? "Refresh" : "Get Feedback from AI"}
            </button>
            {feedback && (
                <div className="bg-gray-100 p-4 rounded-lg mt-4">
                    <h2 className="text-lg font-semibold">AI Feedback</h2>
                    <p>{feedback}</p>
                </div>
            )}
        </>
    );
}
