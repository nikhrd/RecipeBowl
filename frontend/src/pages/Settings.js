import React, { useState } from "react";
import Layout from "../components/Layout";

function Settings() {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [dietaryPreference, setDietaryPreference] = useState("None");

    const handleSave = () => {
        alert("Settings saved successfully!");
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto py-10">
                <header className="mb-10">
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-500 mb-2">
                        Settings
                    </h2>
                    <p className="text-gray-500">Manage your app preferences and settings</p>
                </header>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8">
                        <h4 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-6">Preferences</h4>
                        
                        <div className="space-y-6">
                            {/* Toggle Notifications */}
                            <div className="flex items-center justify-between py-4 border-b border-gray-100">
                                <div>
                                    <h5 className="font-bold text-gray-800 text-lg">Email Notifications</h5>
                                    <p className="text-gray-500 text-sm mt-1">Receive recipes and promotional emails.</p>
                                </div>
                                <button 
                                    onClick={() => setNotifications(!notifications)}
                                    className={`w-14 h-8 rounded-full transition-colors relative flex items-center ${notifications ? 'bg-emerald-500' : 'bg-gray-300'}`}
                                >
                                    <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform absolute ${notifications ? 'translate-x-7' : 'translate-x-1'}`}></div>
                                </button>
                            </div>

                            {/* Dark Mode toggle (Placeholder UI) */}
                            <div className="flex items-center justify-between py-4 border-b border-gray-100">
                                <div>
                                    <h5 className="font-bold text-gray-800 text-lg">Dark Mode</h5>
                                    <p className="text-gray-500 text-sm mt-1">Switch to a dark theme (Coming Soon).</p>
                                </div>
                                <button 
                                    onClick={() => setDarkMode(!darkMode)}
                                    disabled
                                    className={`w-14 h-8 rounded-full transition-colors relative flex items-center bg-gray-200 cursor-not-allowed`}
                                >
                                    <div className={`w-6 h-6 bg-gray-400 rounded-full shadow-sm transform transition-transform absolute translate-x-1`}></div>
                                </button>
                            </div>

                            {/* Dietary Preference */}
                            <div className="py-4">
                                <h5 className="font-bold text-gray-800 text-lg mb-2">Dietary Preference</h5>
                                <p className="text-gray-500 text-sm mb-4">Set your default diet for recipe generation.</p>
                                <select 
                                    value={dietaryPreference}
                                    onChange={(e) => setDietaryPreference(e.target.value)}
                                    className="w-full sm:w-64 bg-gray-50 border border-gray-200 text-gray-800 font-medium rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="None">No Preference</option>
                                    <option value="Vegetarian">Vegetarian</option>
                                    <option value="Vegan">Vegan</option>
                                    <option value="Keto">Keto</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
                            <button 
                                onClick={handleSave}
                                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-bold shadow-md transition-all active:scale-95"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Settings;
