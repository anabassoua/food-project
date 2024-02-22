// import { useEffect, useState } from "react";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

type Recipe = {
  id: number;
  name: string;
};

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const recipes = useLoaderData() as Recipe[];

  const handleSearch = () => {
    navigate(`/recipes?ingredients=${searchValue}`);
  };

  return (
    <div className="container">
      <h1>What's in your Fridge ?</h1>
      <input
        type="text"
        className="search-bar"
        placeholder="e.g: apple,flour,sugar..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div className="trending-recipes">
        <div className="recipe-container">
          {recipes &&
            recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-box">
                <h1>{recipe.name}</h1>
                <img
                  src={`https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg`}
                  alt={recipe.name}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
