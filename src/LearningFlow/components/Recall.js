import { useState } from "react";

export default function ActiveRecall() {
    const [questionType, setQuestionType] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const simulateQuestionGeneration = (type) => {
        setLoading(true);
        // Simulate API call delay
        setTimeout(() => {
            const mockQuestions = type === "multiple"
                ? [
                    {
                        question: "Which of the following best describes the concept of Active Recall?",
                        options: ["Reading passively", "Rewriting notes", "Recalling from memory", "Watching videos"],
                        answer: "Recalling from memory"
                    },
                    {
                        question: "Which technique improves memory retention the most?",
                        options: ["Highlighting", "Active recall", "Re-reading", "Listening to lectures"],
                        answer: "Active recall"
                    }
                ]
                : [
                    {
                        question: "Explain the process of Active Recall in your own words."
                    },
                    {
                        question: "Why is testing yourself more effective than re-reading notes?"
                    }
                ];
            setQuestions(mockQuestions);
            setLoading(false);
        }, 1000);
    };

    const handleSelect = (type) => {
        setQuestionType(type);
        simulateQuestionGeneration(type);
    };

    return (
        <div className="space-y-4">
            {!questionType && (
                <div>
                    <p className="text-lg font-semibold mb-2">What type of questions do you want?</p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => handleSelect("multiple")}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                        >
                            Multiple Choice
                        </button>
                        <button
                            onClick={() => handleSelect("free")}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg"
                        >
                            Free Response
                        </button>
                    </div>
                </div>
            )}

            {loading && <p className="text-gray-500 italic">Generating questions...</p>}

            {!loading && questions.length > 0 && (
                <div className="space-y-6">
                    {questions.map((q, index) => (
                        <div key={index} className="border p-4 rounded-lg shadow-sm">
                            <p className="font-medium">{index + 1}. {q.question}</p>
                            {q.options ? (
                                <ul className="mt-2 space-y-1">
                                    {q.options.map((opt, i) => (
                                        <li key={i} className="flex items-center">
                                            <input type="radio" name={`q-${index}`} className="mr-2" />
                                            <span>{opt}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <textarea
                                    placeholder="Type your answer..."
                                    className="w-full mt-2 p-2 border rounded-lg"
                                    rows={3}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
