import React from "react";
import Starfield from "./components/Starfield";

const ctas = [
    "Start acing your tests",
    "Unlock your academic cheat code",
    "Try the 30-minute breakthrough",
    "Study smarter, not harder",
    "Get results without the grind",
    "Steal my study system",
    "Reclaim your confidence",
    "Use the Feynman hack",
];

export default function LandingPage({onGetStarted}) {
    const handleGoogleSignIn = () => {
        onGetStarted()
    };

    return (
        <div className="relative bg-black text-white overflow-x-hidden">
            <Starfield />
            <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />
            <main className="relative z-10">
                {/* HERO SECTION */}
                <section className="h-[85vh] flex flex-col justify-center items-center px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        Outsmart the School System.
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mb-6">
                        School doesn’t test real understanding. But there’s a better way. This tool helps you
                        reverse-engineer any topic and prep like a pro <span className="font-black">in just 30 minutes.</span>
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={handleGoogleSignIn}
                            className="flex items-center gap-2 bg-white text-black px-5 py-3 rounded-xl text-base font-semibold hover:bg-gray-100 shadow-md transition"
                        >
                            {ctas[0]}
                        </button>
                    </div>
                </section>

                {/* Why I built this */}
                <section className="py-24 px-6 bg-white text-black text-center">
                    <h2 className="text-4xl font-bold mb-6">Why I Built This</h2>
                    <div className="max-w-3xl mx-auto text-lg leading-relaxed">
                        <p className="mb-6">
                            I got my <strong>AWS DevOps Professional certification</strong>, one of the hardest
                            industry exams, at age <strong>13</strong>. I have a <strong>5.667/6 GPA</strong>. But I’m
                            not a genius, and I’m definitely not a grind.
                        </p>
                        <p className="mb-6">
                            What I’ve figured out is that school rarely measures true understanding. It rewards
                            memorization, pattern recognition, and test-savvy. Most students feel like they’re falling
                            behind; not because they’re not smart, but because the system wasn’t designed to reward
                            clarity.
                        </p>
                        <p className="mb-6">
                            This app helps you game that system. It’s based on a modified Feynman Technique: an
                            approach that doesn’t feel like studying at all, but dramatically boosts your ability
                            to <em>score well</em>. It takes about half an hour, and the results speak for themselves.
                        </p>
                        <p>
                            Forget grinding. Forget watching endless videos and rereading notes. This tool will help you
                            get the grades you want, without burning out or feeling like a fraud.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={handleGoogleSignIn}
                            className="flex items-center gap-2 bg-gray-700 text-white px-5 py-3 rounded-xl text-base font-semibold hover:bg-gray-900 shadow-md transition my-4"
                        >
                            {ctas[1]}
                        </button>
                    </div>
                </section>

                <section className="py-24 px-6 bg-gray-900 text-white text-center">
                    <h2 className="text-4xl font-bold mb-6">Struggling in School Doesn’t Mean You’re Not Smart</h2>
                    <p className="text-xl max-w-3xl mx-auto mb-10">
                        Traditional education isn’t designed for how everyone learns. You might spend hours reading
                        notes or watching videos and still freeze on test day. That’s not a lack of intelligence, it’s
                        a mismatch in methods.
                    </p>
                    <p className="text-lg">
                        This tool helps close that gap. It’s fast, honest, and designed to turn passive study into real
                        understanding, so you’re ready when it counts.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={handleGoogleSignIn}
                            className="flex items-center gap-2 bg-white text-black px-5 py-3 rounded-xl text-base font-semibold hover:bg-gray-100 shadow-md transition my-4"
                        >
                            {ctas[2]}
                        </button>
                    </div>
                </section>


                {/* HOW IT WORKS */}
                <section className="py-24 px-6 text-black bg-white text-center">
                    <h2 className="text-4xl font-bold mb-10">How It Works</h2>
                    <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-12 text-left">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">1. Add Topics</h3>
                            <p>Add what you're learning; chemistry, history, algorithms, anything.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">2. Teach It Simply</h3>
                            <p>Break it down in your own words like you're teaching someone new.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">3. Refine & Master</h3>
                            <p>Fill gaps, simplify harder parts, and reinforce understanding.</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={handleGoogleSignIn}
                            className="flex items-center gap-2 bg-gray-700 text-white px-5 py-3 rounded-xl text-base font-semibold hover:bg-gray-900 shadow-md transition my-4"
                        >
                            {ctas[3]}
                        </button>
                    </div>
                </section>

                {/* FEATURES */}
                <section className="py-24 px-6 bg-gray-100 text-black">
                    <h2 className="text-4xl font-bold mb-12 text-center">What You'll Love</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <Feature text="🔥 Fast & intuitive interface"/>
                        <Feature text="✅ 100% free forever"/>
                        <Feature text="🔒 Private: your data belongs to you"/>
                        <Feature text="💬 Works for any subject, any level"/>
                        <Feature text="⚙️ Built with proven cognitive science"/>
                        <Feature text="🌌 Gorgeous starfield aesthetic (yes, really)"/>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={handleGoogleSignIn}
                            className="flex items-center gap-2 bg-white text-black px-5 py-3 rounded-xl text-base font-semibold hover:bg-gray-100 shadow-md transition my-8"
                        >
                            {ctas[4]}
                        </button>
                    </div>
                </section>

                {/* TESTIMONIALS (Optional Placeholder)
                <section className="py-24 px-6 bg-white text-black text-center">
                    <h2 className="text-4xl font-bold mb-12">What People Say</h2>
                    <p className="italic text-xl">Coming soon... 👀</p>
                </section>*/}

                {/* FAQ */}
                <section className="py-24 px-6 bg-gray-900 text-white">
                    <h2 className="text-4xl font-bold mb-12 text-center">FAQs</h2>
                    <div className="max-w-4xl mx-auto space-y-6">
                        <FAQ q="Is it really free?" a="Yes, completely. No paywalls, no trials, no hidden fees."/>
                        <FAQ q="What subjects can I use it for?"
                             a="Anything! Math, programming, art history — if you can teach it, you can master it."/>
                        <FAQ q="Do I need an account?" a="You sign in with Google so your data is saved and synced."/>
                        <FAQ q="Is my data safe?" a="Your data is stored securely via Firebase and never shared."/>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={handleGoogleSignIn}
                            className="flex items-center gap-2 bg-white text-black px-5 py-3 rounded-xl text-base font-semibold hover:bg-gray-100 shadow-md transition my-8"
                        >
                            {ctas[5]}
                        </button>
                    </div>
                </section>

                {/* FINAL CALL TO ACTION */}
                <section className="py-24 px-6 bg-blue-600 text-white text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready to Level Up Your Learning?</h2>
                    <p className="text-xl mb-8">Start mastering topics the smart way — it's free.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={handleGoogleSignIn}
                            className="flex items-center gap-2 bg-white text-black px-5 py-3 rounded-xl text-base font-semibold hover:bg-gray-100 shadow-md transition my-8"
                        >
                            {ctas[6]}
                        </button>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="py-6 text-center text-sm text-gray-400 bg-black">
                    Made with ☕ by <a href="https://krishivpiduri.com" className="underline">Krishiv</a> • Feynman
                    Helper © {new Date().getFullYear()}
                </footer>
            </main>
        </div>
    );
}

function Feature({text}) {
    return (
        <div className="flex items-start gap-3">
            <span className="text-green-500">✔</span>
            <p>{text}</p>
        </div>
    );
}

function FAQ({q, a}) {
    return (
        <div>
            <h3 className="font-semibold text-lg">{q}</h3>
            <p className="text-sm text-gray-300">{a}</p>
        </div>
    );
}
