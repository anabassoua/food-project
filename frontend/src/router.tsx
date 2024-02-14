import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Recipes from "./Recipes";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/recipes", element: <Recipes /> },
]);
