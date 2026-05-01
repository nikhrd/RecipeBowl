//Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F7F8FC] flex flex-col">

            <nav className="flex justify-between p-6">
                <h1 className="text-xl font-bold text-indigo-500">GusteauGo</h1>
                <div>
                    <button onClick={() => navigate('/login')} className="mr-4 text-gray-600">Login</button>
                    <button onClick={() => navigate('/signup')} className="bg-indigo-400 text-white px-4 py-2 rounded-lg">Signup</button>
                </div>
            </nav>

            <div className="flex flex-1 flex-col items-center justify-center text-center px-6">
                <h2 className="text-5xl font-bold text-gray-800 mb-4">
                    Turn Ingredients into Recipes
                </h2>
                <p className="text-gray-500 mb-6 max-w-lg">
                    AI powered cooking assistant with nutrition, allergens & image recognition
                </p>

                <button
                    onClick={() => navigate('/signup')}
                    className="bg-indigo-400 text-white px-6 py-3 rounded-xl hover:bg-indigo-500"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
}

export default Home;