import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Recipes from "./components/Recipes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: ({ request: { signal } }) => {
      return fetch("http://localhost:8080/recipes/random", { signal })
        .then((res) => res.json())
        .then((data) => data.recipes[0].extendedIngredients);
    },
  },
  {
    path: "/recipes",
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
]);
