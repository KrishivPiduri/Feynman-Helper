import { useEffect, useState } from "react";

export default function Recall({ input }) {
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulated question generation
        const simulatedQuestions = [
            {
                question: "What is the main idea behind the Feynman Technique?",
                options: [
                    "To memorize facts efficiently",
                    "To explain concepts in simple language",
                    "To read and reread notes",
                    "To watch videos repeatedly",
                ],
                answer: "To explain concepts in simple language",
            },
            {
                question: "Why is writing an outline helpful when studying?",
                options: [
                    "It looks impressive",
                    "It helps you skip practice tests",
                    "It organizes your thoughts logically",
                    "It's faster than watching videos",
                ],
                answer: "It organizes your thoughts logically",
            },
            {
                question: "Which step helps identify gaps in understanding?",
                options: [
                    "Outline",
                    "Refine",
                    "Scrutinize",
                    "Recall",
                ],
                answer: "Scrutinize",
            },
        ];

        setQuestions(simulatedQuestions);
        setSelectedAnswers(Array(simulatedQuestions.length).fill(null));
        setLoading(false);
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
                                        ? " bg-green-200 border-green-500"
                                        : " bg-red-200 border-red-500";
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
