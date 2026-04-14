import React, { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
    const [ingredients, setIngredients] = useState("");
    const [recipes, setRecipes] = useState([]);

    const generateRecipe = async () => {
        try {
            const res = await API.post("/recipe/generate", { ingredients: ingredients, });
            setRecipes(res.data.recipes || []); // assuming res.data.recipe is an object
        } catch (err) {
            console.log(err);
            console.log(err.response);
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
            <button onClick={generateRecipe}>Generate</button>
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
