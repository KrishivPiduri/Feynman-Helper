// LearningFlow/index.js
import Outline from "./components/Outline";
import Refine from "./components/Refine";
import Scrutinize from "./components/Scrutinize";
import Recall from "./components/Recall";
import { useState, useEffect } from "react";

const steps = [
    {
        title: "Step 1: Outline",
        description:
            "Please write down the name of your concept and an outline of it below. The outline is in bulleted format. To create a new bullet point, hit \"Enter\". To indent a bullet point, hit \"Tab\". To remove an indent, hit \"Shift+Tab\".",
        component: (props) => <Outline {...props} />,
    },
    {
        title: "Step 2: Refine",
        description:
            "Rearrange and refine your outline so it flows logically, like a story building upon itself.",
        component: (props) => <Refine {...props} />,
    },
    {
        title: "Step 3: Explain",
        description:
            "Now, add explanations to each bullet point in your outline. Imagine you are teaching someone. Add a colon at the end of each bullet and type up an explanation.",
        component: (props) => <Outline {...props} />,
    },
    {
        title: "Step 4: Scrutinize",
        description:
            "AI will help identify inconsistencies and rough spots in your explanation.",
        component: (props) => <Scrutinize {...props} />,
    },
    {
        title: "Step 5: Save",
        description:
            "Here's your explanation. If you did all the steps right, this should be a complete explanation of your topic that even a 5-year-old can understand.",
        component: ({ input }) => (
            <p
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                {input}
            </p>
        ),
    },
    {
        title: "Step 6: Recall",
        description:
            "Now that you have a complete understanding of the topic, you will now get some questions to help you solidify your understanding.",
        component: (props) => <Recall {...props} />,
    },
];

export default function LearningAssistant({
                                              initialTopic,
                                              initialOutline,
                                              onSave,
                                          }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [input, setInput] = useState(initialOutline || "- ");
    const [localTopic, setLocalTopic] = useState(initialTopic || "");
    const [dirty, setDirty] = useState(false);

    // Mark as dirty whenever input or topic changes
    useEffect(() => {
        setDirty(true);
    }, [input, localTopic]);

    // Warn user if they try to reload/close with unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (dirty) {
                e.preventDefault();
                e.returnValue = "";
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [dirty]);

    const handleNext = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const StepComponent = steps[currentStep].component;

    return (
        <div className="max-w-3xl mx-auto p-4 relative">
            <button
                onClick={() => onSave(localTopic,input)}
                className="mb-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
            >
                Back to Dashboard (save)
            </button>
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-2">{steps[currentStep].title}</h1>
                <p className="text-gray-600 mb-4">{steps[currentStep].description}</p>
                <div className="mb-4">
                    <StepComponent
                        input={input}
                        topic={localTopic}
                        setInput={(value) => setInput(value)}
                        setTopic={(value) => setLocalTopic(value)}
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        className={`px-4 py-2 bg-gray-300 text-gray-700 rounded-lg ${
                            currentStep === 0 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={handleBack}
                        disabled={currentStep === 0}
                    >
                        Back (Save)
                    </button>
                    <button
                        className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
                            currentStep === steps.length - 1 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={handleNext}
                        disabled={currentStep === steps.length - 1}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
