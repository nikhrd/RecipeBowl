import { useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();

    return (
        <div className="w-64 bg-white shadow-[1px_0_10px_rgba(0,0,0,0.05)] border-r border-gray-100 flex flex-col h-full bg-opacity-95 backdrop-blur-sm relative z-20">
            <div className="p-6 pb-2 border-b border-gray-100/50 mb-4 h-20 flex items-center gap-3">
                <span className="text-3xl drop-shadow-sm">🍲</span>
                <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 tracking-tight">
                    RecipeBowl
                </h2>
            </div>

            <div className="flex-1 px-4 py-2 space-y-2 overflow-y-auto">
                <button 
                    onClick={() => navigate("/dashboard")} 
                    className="w-full text-left px-4 py-3 text-sm font-bold text-gray-700 bg-gray-50/50 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-all flex items-center gap-3 group"
                >
                    <span className="text-emerald-500 group-hover:scale-110 transition-transform">✦</span> Dashboard
                </button>
                <button 
                    onClick={() => navigate("/saved")} 
                    className="w-full text-left px-4 py-3 text-sm font-bold text-gray-500 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-all flex items-center gap-3 group"
                >
                    <span className="text-gray-400 group-hover:text-emerald-500 group-hover:scale-110 transition-all">♥</span> Saved Recipes
                </button>
                <button 
                    onClick={() => navigate("/profile")} 
                    className="w-full text-left px-4 py-3 text-sm font-bold text-gray-500 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-all flex items-center gap-3 group"
                >
                    <span className="text-gray-400 group-hover:text-emerald-500 group-hover:scale-110 transition-all">👤</span> Profile
                </button>
                <button 
                    onClick={() => navigate("/settings")} 
                    className="w-full text-left px-4 py-3 text-sm font-bold text-gray-500 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-all flex items-center gap-3 group"
                >
                    <span className="text-gray-400 group-hover:text-emerald-500 group-hover:scale-110 transition-all">⚙</span> Settings
                </button>
            </div>
            
            <div className="p-4 mt-auto border-t border-gray-100">
                <div className="bg-emerald-50 p-4 rounded-xl">
                    <p className="text-xs font-bold text-emerald-800 mb-1">Go Pro</p>
                    <p className="text-xs text-emerald-600 mb-3 font-medium">Get unlimited AI recipes</p>
                    <button className="w-full py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-md hover:bg-emerald-500 transition-colors">Upgrade</button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;