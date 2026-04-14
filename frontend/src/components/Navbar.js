import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    return (
        <div className="bg-white/80 backdrop-blur-md px-10 py-4 flex justify-between items-center border-b border-gray-100 sticky top-0 z-10 h-20 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
            <h1 className="font-extrabold text-xl text-gray-800 tracking-tight">Dashboard Overview</h1>
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 border-2 border-white shadow flex items-center justify-center text-emerald-700 font-bold overflow-hidden cursor-pointer hover:ring-2 hover:ring-emerald-400 transition-all">
                    U
                </div>
                <button
                    onClick={() => {
                        logout();
                        navigate("/");
                    }}
                    className="bg-white border border-gray-200 text-gray-600 font-bold text-sm px-5 py-2 rounded-xl hover:bg-gray-50 hover:text-red-600 transition-all shadow-sm flex items-center gap-2"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Navbar;