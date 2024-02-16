import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Recipes from "./Recipes";

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
    loader: ({ request: { signal, url } }) => {
      const searchParams = new URL(url).searchParams;
      const ingredients = searchParams.get("ingredients") || "";
      return fetch(
        `http://localhost:8080/recipes/ingredients?ingredients=${ingredients}`,
        { signal }
      ).then((res) => res.json());
    },
  },
]);
