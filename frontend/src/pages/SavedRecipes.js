import React, { useState, useEffect } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function SavedRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSavedRecipes();
    }, []);

    const fetchSavedRecipes = async () => {
        try {
            setLoading(true);
            const res = await API.get("/recipe/saved");
            setRecipes(res.data.recipes || []);
        } catch (err) {
            console.error("Error fetching saved recipes:", err);
            // Optionally set an error state here
        } finally {
            setLoading(false);
        }
    };

    const deleteRecipe = async (id) => {
        try {
            await API.delete(`/recipe/saved/${id}`);
            setRecipes(recipes.filter(r => r._id !== id));
        } catch (err) {
            console.error("Error deleting recipe:", err);
            alert("Failed to delete recipe");
        }
    };

    return (
        <Layout>
            <div className="max-w-5xl mx-auto py-8">
                <header className="mb-10 text-center">
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 mb-2">
                        Saved Recipes
                    </h2>
                    <p className="text-gray-500 text-lg">Your personal collection of delicious meals</p>
                </header>

                {loading ? (
                    <div className="text-center text-gray-500 mt-20">Loading your saved recipes...</div>
                ) : recipes.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20 bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
                        <span className="text-4xl block mb-4">🍽️</span>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No saved recipes yet</h3>
                        <p>Generate some recipes and save them to see them here.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8">
                        {recipes.map((r, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                                <div className="p-6 md:p-8">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex gap-3 items-center">
                                            <h3 className="font-bold text-2xl text-gray-900">{r.title || "Untitled Recipe"}</h3>
                                            {r.diet && (
                                                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wide">
                                                    {r.diet}
                                                </span>
                                            )}
                                        </div>
                                        <button 
                                            onClick={() => deleteRecipe(r._id)}
                                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                                            title="Remove Recipe"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
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
                                            <div className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                                {r.ingredients || "Ingredients not available."}
                                            </div>
                                        </div>
                                        <div className="md:col-span-2">
                                            <h4 className="text-sm border-b pb-2 font-bold text-gray-400 uppercase tracking-widest mb-4">Instructions</h4>
                                            <div className="text-gray-700 leading-relaxed max-h-60 overflow-y-auto pr-2 custom-scrollbar text-sm whitespace-pre-wrap">
                                                {r.instructions || "Instructions not available."}
                                            </div>
                                        </div>
                                    </div>

                                    {r.nutrition && (r.nutrition.calories > 0 || r.nutrition.protein > 0) && (
                                        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
                                            <div className="flex gap-4 sm:gap-8">
                                                <div className="text-center">
                                                    <div className="text-2xl font-black text-gray-800">{r.nutrition.calories || 0}</div>
                                                    <div className="text-xs font-bold text-gray-400 uppercase">Calories</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-2xl font-black text-gray-800">{r.nutrition.protein || 0}g</div>
                                                    <div className="text-xs font-bold text-gray-400 uppercase">Protein</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-2xl font-black text-gray-800">{r.nutrition.carbs || 0}g</div>
                                                    <div className="text-xs font-bold text-gray-400 uppercase">Carbs</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-2xl font-black text-gray-800">{r.nutrition.fat || 0}g</div>
                                                    <div className="text-xs font-bold text-gray-400 uppercase">Fat</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default SavedRecipes;
