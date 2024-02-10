import { useEffect, useState } from "react";

// Define a type for the extended ingredient
type ExtendedIngredient = {
  id: number;
  name: string;
  image: string;
};

export default function Home() {
  const [recipes, setRecipes] = useState<ExtendedIngredient[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/recipes/random")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.recipes[0].extendedIngredients);
        const ingredients = data.recipes[0].extendedIngredients;
        setRecipes(ingredients);
      });
  }, []);

  // Check if recipes array is empty before accessing its properties
  return (
    <div className="container">
      <h1>What's in your Fridge ?</h1>
      <input type="text" className="search-bar" placeholder="Search..." />
      <div className="trending-recipes">
        <div className="recipe-container">
          {recipes &&
            recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-box">
                <h1>{recipe.name}</h1>
                <img src={recipe.image} alt={recipe.name} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
