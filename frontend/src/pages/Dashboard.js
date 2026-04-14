import React, { useEffect } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await API.get("/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log(res.data);
            } catch (err) {
                alert("Unauthorized");
            }
        };

        fetchProfile();
    }, []);

    return (
        <>
            <Navbar />
            <h2>Dashboard (Protected)</h2>
        </>
    );
}

export default Dashboard;