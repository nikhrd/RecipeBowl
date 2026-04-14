import React, { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
    const [ingredients, setIngredients] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [image, setImage] = useState(null);

    const generateRecipe = async () => {
        if (!ingredients.trim()) {
            alert("Enter ingredients");
            return;
        }

        try {
            const res = await API.post(
                "/generate",
                { ingredients: ingredients },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setRecipes(res.data.recipes || []);
        } catch (err) {
            console.log("ERROR:", err.response?.data);
            alert("Error generating recipe");
        }
    };

    const generateFromImage = async () => {
        if (!image) {
            alert("Please select an image first");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        try {
            const res = await API.post("/generate-from-image", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setRecipes(res.data.recipes);
            console.log("Detected:", res.data.detected);
        } catch (err) {
            console.error(err);
            alert("Error generating recipe");
        }
    };
    const saveRecipe = async (recipe) => {
        try {
            await API.post("/save", recipe);
            alert("Saved!");
        } catch {
            alert("Error saving");
        }
    };


    return (
        <div>
            <Navbar />
            <h2>Generate Recipe</h2>
            <input
                placeholder="Enter ingredients (e.g. chicken, rice)"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
            />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <button onClick={generateRecipe}>Generate recipe from text</button>
            <button onClick={generateFromImage}>Generate recipe from image</button>
            {recipes.map((r, index) => (
                r && (
                    <div key={index}>
                        <h3>{r.title}</h3>
                        <p><strong>Ingredients:</strong>{r.ingredients}</p>
                        <p><strong>Instructions:</strong>{r.instructions}</p>
                    </div>
                )
            ))}
        </div>
    );
}

export default Dashboard;
