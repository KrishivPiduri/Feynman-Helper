import { useEffect, useState } from "react";

export default function Recall({ input }) {
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch("https://pxvzdecqz0.execute-api.us-east-1.amazonaws.com/recall", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ outline: input }),  // Pass the outline here
                });

                // Ensure the response is valid
                if (!res.ok) {
                    throw new Error(`Error: ${res.statusText}`);
                }

                const data = await res.json();

                if (data.error) {
                    console.error("Error from API:", data.error);
                    return;
                }
                console.log(data);
                // Assuming the Lambda API returns the questions in 'data.questions'
                setQuestions(data.questions);
                setSelectedAnswers(Array(data.questions.length).fill(null));

            } catch (error) {
                console.error("Failed to fetch questions:", error);
            } finally {
                setLoading(false);
            }
        };


        fetchQuestions();
    }, [input]);

    const handleSelect = (questionIndex, option) => {
        const updated = [...selectedAnswers];
        updated[questionIndex] = option;
        setSelectedAnswers(updated);
    };

    const handleCheck = () => {
        const results = questions.map((q, i) => ({
            correct: selectedAnswers[i] === q.answer,
        }));
        setFeedback(results);
        setSubmitted(true);
    };

    const handleRetry = () => {
        setSelectedAnswers(Array(questions.length).fill(null));
        setFeedback([]);
        setSubmitted(false);
    };

    const allAnswered = selectedAnswers.every((a) => a !== null);

    const getButton = () => {
        if (!submitted) {
            return (
                <button
                    onClick={handleCheck}
                    disabled={!allAnswered}
                    className={`px-6 py-2 rounded-lg font-semibold ${
                        allAnswered
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                >
                    Check
                </button>
            );
        } else {
            return (
                <button
                    onClick={handleRetry}
                    className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                >
                    Retry
                </button>
            );
        }
    };

    if (loading) return <div className="p-4 text-center">Loading questions...</div>;

    return (
        <div className="space-y-8">
            {questions.map((q, i) => (
                <div key={i} className="bg-gray-200 p-4 rounded-lg shadow-md">
                    <p className="font-semibold mb-2">
                        {i + 1}. {q.question}
                    </p>
                    <div className="space-y-2">
                        {q.options.map((opt) => {
                            const isSelected = selectedAnswers[i] === opt;
                            const isCorrect = feedback[i]?.correct;
                            let colorClass = "bg-white hover:bg-gray-100 border";

                            if (submitted) {
                                if (isSelected) {
                                    colorClass += isCorrect
                                        ? " bg-green-200 border-green-500 border-8"
                                        : " bg-red-200 border-red-500 border-8";
                                }
                            } else if (isSelected) {
                                colorClass += " bg-blue-100 border-blue-500";
                            }

                            return (
                                <button
                                    key={opt}
                                    className={`block shadow-2xl hover:shadow-none w-full text-left px-3 py-2 rounded-lg ${colorClass} ${
                                        isSelected ? "font-semibold" : ""
                                    }`}
                                    onClick={() => handleSelect(i, opt)}
                                    disabled={submitted}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
            <div className="pt-4 text-center">{getButton()}</div>
        </div>
    );
}
