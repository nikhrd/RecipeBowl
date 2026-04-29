import React, { useState } from "react";
import API from "../services/api";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        try {
            const res = await API.post("/auth/signup", { email, password });
            alert(res.data.message);
        } catch (err) {
            alert("Account already exists");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pt-16">
            <div className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-96 border border-gray-100 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
                <div className="text-center mb-8">
                    <span className="text-4xl"></span>
                    <h2 className="text-3xl font-extrabold mt-4 text-gray-900 tracking-tight">Create Account</h2>
                    <p className="text-gray-500 mt-2 text-sm font-medium">Join RecipeBowl to start cooking</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <input className="w-full bg-gray-50 border border-gray-200 focus:bg-white text-gray-900 p-3.5 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder-gray-400 font-medium text-sm"
                            placeholder="Email address"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input className="w-full bg-gray-50 border border-gray-200 focus:bg-white text-gray-900 p-3.5 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder-gray-400 font-medium text-sm"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    onClick={handleSignup}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 rounded-xl mt-8 shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] transition-all active:scale-[0.98]"
                >
                    Sign Up
                </button>
                <div className="mt-6 text-center text-sm font-medium text-gray-500">
                    Already have an account? <a href="/login" className="text-emerald-600 hover:text-emerald-500">Log in</a>
                </div>
            </div>
        </div>
    );
}

export default Signup;