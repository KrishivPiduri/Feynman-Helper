import { useState } from "react";
import LearningFlow from "./LearningFlow";

export default function Dashboard() {
    const [topics, setTopics] = useState([]);
    const [newTopic, setNewTopic] = useState("");
    const [selectedTopic, setSelectedTopic] = useState(null);

    const handleAddTopic = () => {
        if (newTopic.trim() === "") return;
        setTopics([...topics, newTopic.trim()]);
        setNewTopic("");
    };

    const handleDeleteTopic = (topicToDelete) => {
        setTopics(topics.filter((topic) => topic !== topicToDelete));
    };

    if (selectedTopic) {
        return (
            <div className="max-w-3xl mx-auto p-4 relative">
                <button
                    onClick={() => setSelectedTopic(null)}
                    className="mb-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                >
                    Back to Dashboard
                </button>
                <LearningFlow topic={selectedTopic} />
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto p-4 bg-gray-200 rounded-xl mt-8 relative">
            <h1 className="text-2xl font-bold mb-4">Your Topics</h1>
            <div className="mb-4">
                <input
                    type="text"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    placeholder="Enter a new topic..."
                    className="w-full border p-2 rounded-lg mb-2"
                />
                <button
                    onClick={handleAddTopic}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-800"
                >
                    Add Topic
                </button>
            </div>
            {topics.length === 0 ? (
                <p className="text-gray-600">No topics added yet.</p>
            ) : (
                <ul>
                    {topics.map((topic, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center border p-2 mb-2 rounded"
                        >
                            <span>{topic}</span>
                            <div>
                                <button
                                    onClick={() => setSelectedTopic(topic)}
                                    className="mr-2 px-3 py-1 bg-blue-500 text-white rounded"
                                >
                                    Edit/Use
                                </button>
                                <button
                                    onClick={() => handleDeleteTopic(topic)}
                                    className="px-3 py-1 bg-red-500 text-white rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
