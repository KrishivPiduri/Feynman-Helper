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
    const [showExplanation, setShowExplanation] = useState(false);

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
    }, []);

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

    // Explanation View
    const ExplanationOverlay = () => (
        <div className="relative max-w-3xl mx-auto p-6 bg-white bg-opacity-90 rounded-xl shadow-2xl text-lg leading-relaxed space-y-6">
            <h2 className="text-3xl font-bold mb-4 text-center">What's This App All About?</h2>
            <p>
                This dashboard is your launchpad for learning. You can add a topic or pick an existing one,
                and we’ll guide you through a super-effective 6-step process to help you actually *understand*
                what you’re studying, not just skim and forget it.
            </p>
            <p>
                We use a modified version of the Feynman Technique: a proven way to make sure you’re not just
                passively reading or watching videos (which can trick you into thinking you understand stuff).
                Instead, this method forces your brain to *engage* and *connect the dots*.
            </p>

            <div className="space-y-4">
                <div>
                    <strong>Step 1: Outline</strong>
                    <p className="ml-4">
                        Start with a simple bullet-point outline of your topic. Break it down into all the sub-topics.
                        Use indentation to show which ones fall under others. Refer to your notes or textbook so you don’t miss anything.
                    </p>
                </div>
                <div>
                    <strong>Step 2: Refine</strong>
                    <p className="ml-4">
                        Clean it up. Put things in a logical order. Add anything that’s missing. Ditch anything that doesn’t help.
                        The AI assistant can give you a hand here too.
                    </p>
                </div>
                <div>
                    <strong>Step 3: Explain</strong>
                    <p className="ml-4">
                        For each point, add a colon and write a short explanation — like you’re teaching it to someone else.
                        This helps you figure out what you really understand.
                    </p>
                </div>
                <div>
                    <strong>Step 4: Scrutinize</strong>
                    <p className="ml-4">
                        The AI will go over your explanations and look for rough spots or logic gaps.
                        It’s like a study buddy that’s great at spotting confusion.
                    </p>
                </div>
                <div>
                    <strong>Step 5: Recall</strong>
                    <p className="ml-4">
                        You’ll get some smart questions to test your recall. No multiple choice fluff — just honest mental reps.
                    </p>
                </div>
            </div>

            <div className="flex justify-center pt-4">
                <button
                    onClick={() => setShowExplanation(false)}
                    className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 text-base"
                >
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );

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
            <a
                href="#"
                className="absolute top-2 right-4 text-sm text-blue-600 hover:underline"
                onClick={(e) => {
                    e.preventDefault();
                    setShowExplanation(true);
                }}
            >
                Confused? Click here.
            </a>
            {showExplanation && <ExplanationOverlay />}
            <h1 className="text-2xl font-bold mb-4">Your Topics</h1>
            <div className="mb-4 flex flex-col">
                <label className="mb-2 font-bold">What topic do you want to review today?</label>
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