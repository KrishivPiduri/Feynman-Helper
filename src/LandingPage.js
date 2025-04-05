export default function LandingPage({ onGetStarted }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent text-white px-4">
            <div className="text-center max-w-xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Master Any Topic with Ease</h1>
                <p className="text-lg md:text-xl mb-8 text-gray-200">
                    A step-by-step assistant designed to help you deeply understand anything you want to learn.
                </p>
                <button
                    onClick={onGetStarted}
                    className="bg-white text-black px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 transition"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
}
