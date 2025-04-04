import Outline from "./Outline";
import {useState} from "react";

export default function Scrutinize (props) {
    const [feedback, setFeedback]=useState("");
    const getFeedback = () => {
        // Simulate an API call to get feedback
        setTimeout(() => {
            setFeedback("This is the AI feedback on your outline.");
        }, 1000);
    };
    return (
        <>
            <Outline {...props}/>
            <button className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-800" onClick={getFeedback}>{feedback ? "Refresh" : "Get Feedback from AI"}</button>
            {feedback && (
                <div className="bg-gray-100 p-4 rounded-lg mt-4">
                    <h2 className="text-lg font-semibold">AI Feedback</h2>
                    <p>{feedback}</p>
                </div>
            )}
        </>
    );
}