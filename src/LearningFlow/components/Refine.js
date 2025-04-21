import Outline from "./Outline";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';

export default function Refine(props) {
    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(false);

    const getFeedback = async () => {
        setLoading(true);
        setFeedback(""); // Optional: clear previous feedback while loading
        console.log("Fetching feedback...");
        try {
            const response = await fetch("https://pxvzdecqz0.execute-api.us-east-1.amazonaws.com/refine", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    outline: props.input,
                }),
            });

            const result = await response.json();

            // If the Lambda is not using proxy integration, the actual message is inside the "body" stringified JSON
            let parsed;
            try {
                parsed = JSON.parse(result.body);
                setFeedback(parsed.feedback || JSON.stringify(result));
            } catch {
                // If body is already an object
                setFeedback(result.feedback || JSON.stringify(result));
            }
        } catch (error) {
            setFeedback("An error occurred while fetching feedback.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Outline {...props} />
            <button
                className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-800 disabled:opacity-60"
                onClick={getFeedback}
                disabled={loading}
            >
                {loading ? "Getting Feedback..." : feedback ? "Refresh" : "Get Feedback from AI"}
            </button>

            {loading && (
                <div className="w-full bg-gray-200 h-2 rounded mt-3 overflow-hidden">
                    <div className="bg-blue-500 h-full animate-pulse w-1/2"></div>
                </div>
            )}

            {feedback && !loading && (
                <div className="bg-gray-100 p-4 rounded-lg mt-4">
                    <h2 className="text-lg font-semibold">AI Feedback</h2>
                    <div className="prose max-w-none">
                        <ReactMarkdown>{feedback}</ReactMarkdown>
                    </div>
                </div>
            )}

        </>
    );
}
