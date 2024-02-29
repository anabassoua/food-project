import { Link, useLoaderData } from "react-router-dom";

type Recipe = {
  id: number;
  title: string;
  image: string;
};

export default function Recipes() {
  const recipes = useLoaderData() as Recipe[];
  return (
    <div className="container">
      <h1>Recipes</h1>
      <div className="recipes-wrapper">
        {recipes &&
          recipes.map((recipe) => (
            <div className="recipe-card" key={recipe.id}>
              <h2>{recipe.title}</h2>
              <Link to={`/recipes/${recipe.id}`}>
                <img src={recipe.image} />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
