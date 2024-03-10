import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Recipes from "./components/Recipes";
import Recipe from "./components/Recipe";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: ({ request: { signal } }) => {
      const storedRecipes = localStorage.getItem("recipes");
      if (storedRecipes) {
        return JSON.parse(storedRecipes);
      } else {
        return fetch("http://localhost:8080/recipes/random", { signal })
          .then((res) => res.json())
          .then((data) => {
            const recipes = data.recipes;
            localStorage.setItem("recipes", JSON.stringify(recipes));
            return recipes;
          });
      }
    },
  },
  {
    path: "/recipes",
    children: [
      {
        index: true,
        element: <Recipes />,
        loader: async ({ request: { signal, url } }) => {
          const searchParams = new URL(url).searchParams;
          const ingredients = searchParams.get("ingredients") || "";
          return await fetch(
            `http://localhost:8080/recipes/ingredients?ingredients=${ingredients}`,
            { signal }
          ).then((res) => res.json());
        },
      },
      {
        path: ":recipeId",
        element: <Recipe />,
        loader: ({ params, request: { signal } }) => {
          return fetch(`http://localhost:8080/recipes/${params.recipeId}`, {
            signal,
          });
        },
      },
    ],
  },
]);
