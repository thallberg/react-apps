import React, { useState, useEffect } from "react";

interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
}

const days = [
  "Måndag",
  "Tisdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lördag",
  "Söndag",
];

const MealPlanner = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [weeklyMenu, setWeeklyMenu] = useState<{
    [day: string]: Recipe | null;
  }>({});
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("weeklyMenu");
    if (stored) {
      setWeeklyMenu(JSON.parse(stored));
    } else {
      setWeeklyMenu(days.reduce((acc, day) => ({ ...acc, [day]: null }), {}));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("weeklyMenu", JSON.stringify(weeklyMenu));
  }, [weeklyMenu]);

  const generateId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

const formatIngredients = (ingredients: string): string[] => {
  return ingredients
    .split(",") // Dela upp ingredienser vid kommatecken
    .map((ingredient) => ingredient.trim()) // Ta bort överflödiga mellanslag
    .filter((ingredient) => ingredient.length > 0) // Ta bort tomma ingredienser
};

  const addRecipe = () => {
    if (!name.trim()) return;
    const newRecipe: Recipe = {
      id: generateId(),
      name,
      ingredients: formatIngredients(ingredients),
      instructions,
    };
    setRecipes((prev) => [newRecipe, ...prev]);
    setName("");
    setIngredients("");
    setInstructions("");
  };

  const assignToDay = (recipe: Recipe, day: string) => {
    setWeeklyMenu((prev) => ({ ...prev, [day]: recipe }));
  };

  const clearDay = (day: string) => {
    setWeeklyMenu((prev) => ({ ...prev, [day]: null }));
  };

  const startEditing = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setName(recipe.name);
    setIngredients(recipe.ingredients.join(", "));
    setInstructions(recipe.instructions);
  };

  const saveEditedRecipe = () => {
    if (!editingRecipe) return;

    const updatedRecipe = {
      ...editingRecipe,
      name,
      ingredients: formatIngredients(ingredients),
      instructions,
    };

    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
    setEditingRecipe(null);
    setName("");
    setIngredients("");
    setInstructions("");
  };

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-amber-800">
        🍽️ Veckomeny & Recept
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Receptformulär */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-3">
            {editingRecipe ? "Redigera recept" : "Lägg till nytt recept"}
          </h2>
          <input
            className="w-full border rounded px-3 py-2 mb-2"
            placeholder="Receptnamn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="w-full border rounded px-3 py-2 mb-2"
            placeholder="Ingredienser (kommaseparerat)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            onBlur={() =>
              setIngredients(formatIngredients(ingredients).join(", "))
            }
          />
          <textarea
            className="w-full border rounded px-3 py-2 mb-2"
            placeholder="Instruktioner"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
          <button
            onClick={editingRecipe ? saveEditedRecipe : addRecipe}
            className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700"
          >
            {editingRecipe ? "Spara ändringar" : "Lägg till"}
          </button>
        </div>

        {/* Veckomeny */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-3">Veckomeny</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {days.map((day) => (
              <div
                key={day}
                className="border rounded p-3 flex flex-col justify-between"
              >
                <h3 className="font-bold text-lg text-amber-800">{day}</h3>
                {weeklyMenu[day] ? (
                  <>
                    <p className="text-sm font-semibold">
                      {weeklyMenu[day]?.name}
                    </p>
                    <button
                      className="text-red-500 text-sm hover:underline self-end"
                      onClick={() => clearDay(day)}
                    >
                      Rensa
                    </button>
                  </>
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    Inget recept tilldelat
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lista med recept */}
      <div className="mt-10 bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">📖 Mina recept</h2>
        {recipes.length === 0 && (
          <p className="text-gray-500 italic">Inga recept ännu.</p>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((r) => (
            <div key={r.id} className="border rounded p-3">
              <h3 className="font-bold text-lg text-amber-700">{r.name}</h3>
              <div className="mt-2">
                <label className="text-sm font-medium">Ingredienser:</label>
                <div className="flex justify-between items-start">
                  <ul className="list-disc pl-5 flex-1">
                    {r.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-sm text-gray-700 mt-1">
                <span className="font-medium">Instruktioner:</span>{" "}
                {r.instructions}
              </p>
              <div className="mt-2">
                <button
                  className="text-blue-500 text-sm hover:underline"
                  onClick={() => startEditing(r)}
                >
                  Redigera
                </button>
                <div className="mt-2">
                  <label className="text-sm font-medium">Tilldela dag:</label>
                  <select
                    className="w-full border rounded mt-1"
                    onChange={(e) => assignToDay(r, e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Välj dag
                    </option>
                    {days.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;
