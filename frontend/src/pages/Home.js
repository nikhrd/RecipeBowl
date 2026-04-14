import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col font-sans overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20"></div>

            {/* Navbar */}
            <nav className="w-full flex justify-between items-center py-6 px-10 relative z-10">
                <div className="flex items-center gap-3">
                    <span className="text-3xl drop-shadow-md">🍲</span>
                    <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">RecipeBowl</h1>
                </div>
                <div className="space-x-4">
                    <button 
                        onClick={() => navigate('/login')}
                        className="px-5 py-2.5 rounded-lg text-sm font-medium hover:text-emerald-400 transition-colors"
                    >
                        Sign In
                    </button>
                    <button 
                        onClick={() => navigate('/signup')}
                        className="px-5 py-2.5 rounded-lg text-sm font-medium bg-white text-gray-950 hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col justify-center items-center text-center px-4 relative z-10 pb-20">
                <div className="inline-block mb-5 px-4 py-1.5 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm text-sm text-emerald-400 font-medium tracking-wide">
                    ✨ AI-Powered Culinary Assistant
                </div>
                <h2 className="text-6xl md:text-8xl font-extrabold mb-8 leading-tight max-w-5xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-emerald-100 to-emerald-500 pb-2">
                    Turn ingredients into masterpieces
                </h2>
                <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed">
                    Instantly generate delicious recipes from your fridge. Snap a photo, get nutrition insights, identify allergens, and save your favorites in one beautifully designed place.
                </p>
                <div className="flex flex-col sm:flex-row gap-5">
                    <button 
                        onClick={() => navigate('/signup')}
                        className="px-8 py-4 rounded-xl text-lg font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all transform hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-3"
                    >
                        Start Cooking Now <span className="text-xl">➔</span>
                    </button>
                    <button 
                        onClick={() => navigate('/login')}
                        className="px-8 py-4 rounded-xl text-lg font-semibold border-2 border-gray-800 hover:border-gray-700 hover:bg-gray-900 transition-all text-gray-300"
                    >
                        I already have an account
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Home;
