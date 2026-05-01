import React, { useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

function Dashboard() {
    const [ingredients, setIngredients] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [image, setImage] = useState(null);

    const generateRecipe = async () => {
        if (!ingredients.trim()) {
            alert("Enter ingredients");
            return;
        }

        try {
            const res = await API.post(
                "/recipe/generate",
                { ingredients: ingredients, cuisine: cuisine },
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
        if (cuisine) formData.append("cuisine", cuisine);

        try {
            const res = await API.post("/recipe/generate-from-image", formData, {
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
            await API.post("/recipe/save", recipe);
            alert("Saved!");
        } catch {
            alert("Error saving");
        }
    };


    return (
        <Layout>
            <div className="max-w-5xl mx-auto py-8">
                <header className="mb-10 text-center">
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 mb-2">
                        Multi-Modal Recipe Recommendation System
                    </h2>
                    <p className="text-gray-500 text-lg">Turn your ingredients or photos into delicious meals</p>
                </header>

                <div className="max-w-lg mx-auto mb-10">
                    <label className="block text-gray-700 text-sm font-bold mb-2 text-center uppercase tracking-wider">
                        Preferred Cuisine (Optional)
                    </label>
                    <input
                        type="text"
                        className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-medium shadow-sm text-center"
                        placeholder="e.g. Italian, Mexican, Indian, Chinese..."
                        value={cuisine}
                        onChange={(e) => setCuisine(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    {/* Text Generation Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Text-to-Recipe</h3>
                            <p className="text-gray-500 text-sm mb-4">Enter what you have in your fridge</p>
                            <textarea
                                className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none h-28 mb-4 font-medium"
                                placeholder="e.g. chicken, rice, onions, tomatoes..."
                                value={ingredients}
                                onChange={(e) => setIngredients(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={generateRecipe}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex-1 py-3.5 rounded-xl shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] transition-all flex items-center justify-center gap-2"
                        >
                            Generate Recipes
                        </button>
                    </div>

                    {/* Image Generation Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Image-to-Recipe</h3>
                            <p className="text-gray-500 text-sm mb-4">Upload a photo of your ingredients</p>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors mb-4 h-28 relative cursor-pointer">
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                                {image ? (
                                    <span className="font-medium text-emerald-600">{image.name}</span>
                                ) : (
                                    <span className="text-gray-500 text-sm font-medium">Click or drag image here</span>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={generateFromImage}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 flex-1 rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] transition-all flex items-center justify-center gap-2"
                        >
                            Analyze & Generate
                        </button>
                    </div>
                </div>


                {recipes.length > 0 && (
                    <div className="mb-6 border-b border-gray-200 pb-2">
                        <h3 className="text-2xl font-bold text-gray-800">Your Recipes</h3>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-8">
                    {recipes.map((r, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="p-6 md:p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="font-bold text-2xl text-gray-900">{r.title}</h3>
                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wide">
                                        {r.diet || "Standard"}
                                    </span>
                                </div>

                                {r.allergens && r.allergens.length > 0 && (
                                    <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 rounded-r flex items-start gap-3">
                                        <span className="text-red-500 font-bold">⚠️</span>
                                        <div>
                                            <h4 className="text-sm font-bold text-red-700 uppercase tracking-wider mb-1">Contains Allergens</h4>
                                            <p className="text-red-600 text-sm font-medium">{r.allergens.join(", ")}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="md:col-span-1">
                                        <h4 className="text-sm border-b pb-2 font-bold text-gray-400 uppercase tracking-widest mb-4">Ingredients</h4>
                                        <div className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap max-h-60 overflow-y-auto pr-2 custom-scrollbar">{r.ingredients}</div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <h4 className="text-sm border-b pb-2 font-bold text-gray-400 uppercase tracking-widest mb-4">Instructions</h4>
                                        <div className="text-gray-700 leading-relaxed max-h-60 overflow-y-auto pr-2 custom-scrollbar text-sm whitespace-pre-wrap">
                                            {r.instructions || "Instructions not available."}
                                        </div>
                                    </div>
                                </div>

                                {r.nutrition && (
                                    <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
                                        <div className="flex gap-4 sm:gap-8">
                                            <div className="text-center">
                                                <div className="text-2xl font-black text-gray-800">{r.nutrition.calories}</div>
                                                <div className="text-xs font-bold text-gray-400 uppercase">Calories</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-black text-gray-800">{r.nutrition.protein}g</div>
                                                <div className="text-xs font-bold text-gray-400 uppercase">Protein</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-black text-gray-800">{r.nutrition.carbs}g</div>
                                                <div className="text-xs font-bold text-gray-400 uppercase">Carbs</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-black text-gray-800">{r.nutrition.fat}g</div>
                                                <div className="text-xs font-bold text-gray-400 uppercase">Fat</div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => saveRecipe(r)}
                                            className="ml-auto bg-pink-50 hover:bg-pink-100 text-pink-600 font-bold px-6 py-2.5 rounded-xl border border-pink-200 hover:border-pink-300 transition-colors flex items-center gap-2 text-sm"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                            </svg>
                                            Save Recipe
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;