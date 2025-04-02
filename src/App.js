import Outline from "./components/Outline";
import {useState} from "react";

const steps = [
    {
        title: "Step 1: Outline",
        description: "Write down everything you know about the concept you're struggling with. Organize it in a way that makes sense to you.",
        component: (props) => <Outline {...props} />
    },
    {
        title: "Step 2: Refine",
        description: "Rearrange and refine your outline so it flows logically, like a story building upon itself.",
        component: ({ input, setInput }) => (
            <textarea
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Refine your outline here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
        ),
    },
    {
        title: "Step 3: Explain",
        description: "Now, add explanations to each bullet point in your outline. Imagine you are teaching someone.",
        component: ({ input, setInput }) => (
            <textarea
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Explain each point here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
        ),
    },
    {
        title: "Step 4: Scrutinize",
        description: "AI will help identify inconsistencies and rough spots in your explanation.",
        component: ({ input, setInput }) => (
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                Analyze Explanation
            </button>
        ),
    },
    {
        title: "Step 5: Simplify",
        description: "Now simplify your explanation. Imagine explaining it to a 5-year-old.",
        component: ({ input, setInput }) => (
            <textarea
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Simplify your explanation here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
        ),
    },
];


export default function LearningAssistant() {
    const [currentStep, setCurrentStep] = useState(0);
    const [input, setInput] = useState("- ");


    const handleNext = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    // Grab the current component
    const StepComponent = steps[currentStep].component;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-2">{steps[currentStep].title}</h1>
            <p className="text-gray-600 mb-4">{steps[currentStep].description}</p>
            <div className="mb-4">
                <StepComponent
                    input={input}
                    setInput={(value) => {setInput(value)}}
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
                    Back
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
    );
}
