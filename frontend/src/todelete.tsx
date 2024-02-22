// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Home() {
//   const [searchValue, setSearchValue] = useState("");
//   const navigate = useNavigate();

//   const handleSearch = () => {
//     navigate(`/recipes?ingredients=${searchValue}`);
//   };

//   return (
//     <div className="container">
//       <h1>What's in your Fridge ?</h1>
//       <input
//         type="text"
//         className="search-bar"
//         placeholder="Search..."
//         value={searchValue}
//         onChange={(e) => setSearchValue(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>
//       {/*...*/}
//     </div>
//   );
// }

////////////

// import { useLoaderData } from "react-router-dom";

// type Recipe = {
//   id: number;
//   name: string;
//   image: string;
//   text: string;
// };

// export default function Recipes() {
//   const recipes = useLoaderData() as Recipe[];

//   return (
//     <div>
//       <h1>Recipes</h1>
//       {recipes &&
//         recipes.map((recipe) => (
//           <div key={recipe.id}>
//             <h2>{recipe.name}</h2>
//             <img src={recipe.image} alt={recipe.name} />
//             <p>{recipe.text}</p>
//           </div>
//         ))}
//     </div>
//   );
// }
