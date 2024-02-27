import { useLoaderData } from "react-router-dom";

type Recipe = {
  id: number;
  title: string;
  image: string;
  summary: string;
};

export default function Recipe() {
  const recipe = useLoaderData() as Recipe;
  console.log(recipe);
  return <h1>{recipe.id}</h1>;
}
