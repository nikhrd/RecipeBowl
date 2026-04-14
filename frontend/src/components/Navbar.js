import React from "react";
import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div>
            <button onClick={() => navigate("/dashboard")}>Dashboard</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Navbar;