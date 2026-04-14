import React, { useState } from "react";
import API from "../services/api";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        try {
            const res = await API.post("/signup", { email, password });
            alert(res.data.message);
        } catch (err) {
            alert("Signup failed");
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignup}>Signup</button>
        </div>
    );
}

export default Signup;