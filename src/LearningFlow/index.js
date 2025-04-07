// LearningFlow/index.js
import Outline from "./components/Outline";
import Refine from "./components/Refine";
import Scrutinize from "./components/Scrutinize";
import Recall from "./components/Recall";
import { useState, useEffect } from "react";

const steps = [
    {
        title: "Step 1: Outline",
        description: (
            <>
                <p>
                    Please write down the name of your concept and an outline of it below. The outline is in bulleted
                    format.
                </p>
                <ul className="list-disc pl-6 mt-2 text-left">
                    <li>To create a new bullet point, hit <kbd>Enter</kbd></li>
                    <li>To indent a bullet point, hit <kbd>Tab</kbd></li>
                    <li>To remove an indent, hit <kbd>Shift + Tab</kbd></li>
                </ul>
                <p className="my-4">
                    This outline should not include the descriptions of any concept. Just list out the topics you need to know about in a format that makes sense to you. No need to refine it. None of this is final.
                </p>
                <p>
                    If you do this right, it should take you <strong>10-15 minutes</strong> to finish this. Feel free to look back at your notes and see if you missed anything.
                </p>
            </>
        ),
        component: (props) => <Outline {...props} />,
    },
    {
        title: "Step 2: Refine",
        description: (
            <p>
                Rearrange and refine your outline so it flows logically, like a story building upon itself. Remove topics that feel like they don't fit and add additional topics that might be helpful to set the context. Use AI feedback to help you.
            </p>
        ),
        component: (props) => <Refine {...props} />,
    },
    {
        title: "Step 3: Explain",
        description: (
            <p>
                Now, add explanations to each bullet point in your outline. Imagine you are teaching a 5-year-old about your concept. Add a colon at the end of each bullet and type up an explanation.
            </p>
        ),
        component: (props) => <Outline {...props} />,
    },
    {
        title: "Step 4: Scrutinize",
        description: (
            <p>
                AI will help identify inconsistencies and rough spots in your explanation. Fix them.
            </p>
        ),
        component: (props) => <Scrutinize {...props} />,
    },
    {
        title: "Step 5: Recall",
        description: (
            <p>
                Now that you have a complete understanding of the topic, you will now get some questions to help you
                solidify your understanding.
            </p>
        ),
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

    useEffect(() => {
        setDirty(true);
    }, [input, localTopic]);

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
                onClick={() => onSave(localTopic, input)}
                className="mb-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
            >
                Back to Dashboard (save)
            </button>
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-2">{steps[currentStep].title}</h1>
                <div className="text-gray-600 mb-4">{steps[currentStep].description}</div>
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
                    {currentStep === steps.length - 1 ? null : (
                        <button
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
                            onClick={handleNext}
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}