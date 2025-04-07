import { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
    setDoc,
} from "firebase/firestore";
import LearningAssistant from "./LearningFlow"; // Renamed LearningFlow to LearningAssistant for clarity

export default function Dashboard() {
    const [topics, setTopics] = useState([]);
    const [loadingTopics, setLoadingTopics] = useState(true);
    const [newTopic, setNewTopic] = useState("");
    const [selectedTopic, setSelectedTopic] = useState(null);

    // Fetch topics from Firestore on initial load
    useEffect(() => {
        if (auth.currentUser) {
            const fetchTopics = async () => {
                const topicsRef = collection(db, "topics");
                const q = query(topicsRef, where("userId", "==", auth.currentUser.uid));
                const querySnapshot = await getDocs(q);
                const userTopics = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTopics(userTopics);
                setLoadingTopics(false);
            };
            fetchTopics();
        }
    });

    // Add topic to Firestore
    const handleAddTopic = async () => {
        if (newTopic.trim() === "") return;
        const topicData = {
            name: newTopic.trim(),
            outline: "", // initially empty
            userId: auth.currentUser.uid,
            createdAt: new Date(),
        };

        try {
            const docRef = await addDoc(collection(db, "topics"), topicData);
            setTopics([...topics, { id: docRef.id, ...topicData }]);
            setSelectedTopic(newTopic);
            setNewTopic(""); // Clear the input
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    // Delete topic from Firestore
    const handleDeleteTopic = async (topicId) => {
        try {
            await deleteDoc(doc(db, "topics", topicId));
            setTopics(topics.filter((topic) => topic.id !== topicId));
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };

    // Save updates from LearningAssistant and update Firestore
    const handleSaveTopic = async (updatedTopicName, updatedOutline) => {
        if (!selectedTopic) return;
        try {
            const topicDocRef = doc(db, "topics", selectedTopic.id);
            await setDoc(
                topicDocRef,
                {
                    name: updatedTopicName,
                    outline: updatedOutline,
                },
                { merge: true }
            );
            // Update local topics state
            setTopics((prevTopics) =>
                prevTopics.map((t) =>
                    t.id === selectedTopic.id
                        ? { ...t, name: updatedTopicName, outline: updatedOutline }
                        : t
                )
            );
            setSelectedTopic(null);
        } catch (error) {
            console.error("Error saving topic: ", error);
        }
    };

    // If a topic is selected, render LearningAssistant with initial values and an onSave callback
    if (selectedTopic) {
        return (
            <div className="max-w-3xl mx-auto p-4 relative">
                <LearningAssistant
                    initialTopic={selectedTopic.name}
                    initialOutline={selectedTopic.outline}
                    onSave={(updatedTopicName, updatedOutline) =>
                        handleSaveTopic(updatedTopicName, updatedOutline)
                    }
                />
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto p-4 bg-gray-200 rounded-xl mt-8 relative">
            <h1 className="text-2xl font-bold mb-4">Your Topics</h1>
            <div className="mb-4 flex flex-col">
                <label className="mb-2 font-bold">What topic do you want to review today</label>
                <input
                    type="text"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    placeholder="Ex. AP Human Geography Unit 6"
                    className="w-full border p-2 rounded-lg mb-2"
                />
                <button
                    onClick={handleAddTopic}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-800"
                >
                    Add Topic
                </button>
            </div>
            {loadingTopics ? (
                <p className="text-gray-600">Loading...</p>
            ) : topics.length === 0 ? (
                <p className="text-gray-600">No topics added yet.</p>
            ) : (
                <ul>
                    {topics.map((topic) => (
                        <li
                            key={topic.id}
                            className="flex justify-between items-center border p-2 mb-2 rounded"
                        >
                            <span>{topic.name}</span>
                            <div>
                                <button
                                    onClick={() => setSelectedTopic(topic)}
                                    className="mr-2 px-3 py-1 bg-blue-500 text-white rounded"
                                >
                                    Edit/Use
                                </button>
                                <button
                                    onClick={() => handleDeleteTopic(topic.id)}
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
