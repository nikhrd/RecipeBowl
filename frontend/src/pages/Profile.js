import React, { useState, useEffect } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const res = await API.get("/auth/profile");
            setUser(res.data.user);
        } catch (err) {
            console.error("Error fetching profile:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto py-12">
                <header className="mb-10 text-center">
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 mb-2">
                        Your Profile
                    </h2>
                    <p className="text-gray-500 text-lg">Manage your personal information</p>
                </header>

                {loading ? (
                    <div className="text-center text-gray-500 mt-10">Loading profile...</div>
                ) : user ? (
                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden relative">
                        <div className="h-32 bg-gradient-to-r from-emerald-400 to-teal-500 absolute top-0 w-full"></div>
                        <div className="p-8 pt-16 relative">
                            <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center text-emerald-600 text-4xl font-black mb-6 mx-auto sm:mx-0 sm:absolute sm:-top-8 sm:left-8">
                                {user.email?.charAt(0).toUpperCase() || "U"}
                            </div>
                            
                            <div className="sm:ml-32 mt-4 sm:mt-0 text-center sm:text-left">
                                <h3 className="text-2xl font-bold text-gray-900">{user.email || "No Email Provided"}</h3>
                                <div className="mt-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-lg inline-block border border-gray-200">
                                    <span className="font-bold text-gray-700 mr-2">User ID:</span> 
                                    <span className="font-mono text-xs">{user.user_id}</span>
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-gray-100">
                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Account Details</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-3 border-b border-gray-50">
                                        <span className="text-gray-500 font-medium font-sm">Email Address</span>
                                        <span className="text-gray-900 font-semibold">{user.email}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-gray-50">
                                        <span className="text-gray-500 font-medium font-sm">Membership</span>
                                        <span className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold">Standard</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3">
                                        <span className="text-gray-500 font-medium font-sm">Status</span>
                                        <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold">Active</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8 flex gap-4">
                                <button className="flex-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-all">
                                    Edit Profile
                                </button>
                                <button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-500/20 font-bold py-3 rounded-xl transition-all">
                                    Upgrade Pro
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-red-500">Could not load profile.</div>
                )}
            </div>
        </Layout>
    );
}

export default Profile;
