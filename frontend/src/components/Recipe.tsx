import { useLoaderData } from "react-router-dom";

type Recipe = {
  id: number;
  title: string;
  image: string;
  summary: string;
};

export default function Recipe() {
  const recipe = useLoaderData() as Recipe;

  const createMarkup = (htmlString: string) => {
    return { __html: htmlString };
  };

  return (
    <div className="card-recipe">
      <p className="title-recipe">{recipe.title}</p>
      <img src={recipe.image} alt="" className="img-recipe" />
      <div
        className="summary-recipe"
        dangerouslySetInnerHTML={createMarkup(recipe.summary)}
      />
    </div>
  );
}
