import { useLoaderData } from "react-router-dom";

type Recipe = {
  id: number;
  title: string;
  image: string;
};

export default function Recipes() {
  const recipes = useLoaderData() as Recipe[];
  return (
    <div>
      <h1>Recipes</h1>
      {recipes &&
        recipes.map((recipe) => (
          <div key={recipe.id}>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} />
          </div>
        ))}
    </div>
  );
}
