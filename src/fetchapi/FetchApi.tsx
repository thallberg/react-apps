import { useEffect, useState } from "react";

const DATA_API = "https://dummyjson.com/recipes";

interface Recipes {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  rating: number;
  image: string;
}

const FetchApi = () => {
  const [recipe, setRecipe] = useState<Recipes[]>([]);

  useEffect(() => {
    fetch(DATA_API)
      .then((res) => res.json())
      .then((data: { recipes: Recipes[] }) => {
        setRecipe(data.recipes);
      });
  });

  return (
    <section className="flex w-full h-full place-content-center">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {recipe.map((data) => (
          <div className="flex flex-col bg-gray-100" key={data.id}>
            <div className="flex justify-between py-4">
              <h1 className="text-4xl text-amber-950">{data.name}</h1>
              <h2 className="text-2xl text-amber-800">{data.difficulty}</h2>
            </div>

            <div className="flex justify-around">
              <img
                className="w-55 h-55"
                src={data.image}
                alt={`picture of ${data.name}`}
              />
              <div className="w-1/2">
                <p className="text-2xl text-left mb-4">Instructions</p>
                {data.instructions.map((inst) => (
                  <p className="list-none text-left" key={inst}>
                    {inst}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex justify-start">
              <ul className="">
                <p className="text-2xl mb-4">Ingredients</p>
                {data.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-row justify-start px-4 my-8">
              <p className="text-gray-800">{`Cooking time${data.cookTimeMinutes} and Prep Time ${data.prepTimeMinutes}`}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FetchApi;
