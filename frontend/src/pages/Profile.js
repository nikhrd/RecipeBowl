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
            <div className="max-w-2xl mx-auto px-4 py-10">

                {/* HEADER */}
                <header className="mb-8 text-center">
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 mb-2">
                        Your Profile
                    </h2>
                    <p className="text-gray-500 text-base">
                        Manage your personal information
                    </p>
                </header>

                {loading ? (
                    <div className="text-center text-gray-500 py-12">
                        Loading profile...
                    </div>
                ) : user ? (

                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden relative">

                        {/* TOP BANNER */}
                        <div className="h-28 sm:h-32 bg-gradient-to-r from-emerald-400 to-teal-500"></div>

                        <div className="px-6 sm:px-8 pb-8">

                            {/* AVATAR + INFO */}
                            <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6 -mt-12 sm:-mt-16 mb-6">

                                {/* AVATAR */}
                                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center text-emerald-600 text-3xl sm:text-4xl font-black mx-auto sm:mx-0">
                                    {user.email?.charAt(0).toUpperCase() || "U"}
                                </div>

                                {/* USER INFO */}
                                <div className="mt-4 sm:mt-0 text-center sm:text-left">
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 break-all">
                                        {user.email || "No Email Provided"}
                                    </h3>

                                    <div className="mt-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg inline-block border border-gray-200">
                                        <span className="font-semibold text-gray-700 mr-2">
                                            User ID:
                                        </span>
                                        <span className="font-mono text-xs">
                                            {user.user_id}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* ACCOUNT DETAILS */}
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                                    Account Details
                                </h4>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-gray-500 text-sm font-medium">
                                            Email Address
                                        </span>
                                        <span className="text-gray-900 font-semibold text-sm break-all text-right">
                                            {user.email}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-gray-500 text-sm font-medium">
                                            Membership
                                        </span>
                                        <span className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold">
                                            Standard
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-500 text-sm font-medium">
                                            Status
                                        </span>
                                        <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold">
                                            Active
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="mt-8 flex flex-col sm:flex-row gap-3">

                                <button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-500/20 font-semibold py-2.5 rounded-xl transition-all">
                                    Upgrade to Pro
                                </button>
                            </div>

                        </div>
                    </div>

                ) : (
                    <div className="text-center text-red-500 py-12">
                        Could not load profile.
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default Profile;