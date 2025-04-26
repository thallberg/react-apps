import { useEffect, useState } from "react";

interface ShoppingListItem {
  id: number;
  title: string;
  description: string;
  amount: number;
}

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [newItem, setNewItem] = useState<ShoppingListItem>({
    id: 0,
    title: "",
    description: "",
    amount: 1,
  });

  useEffect(() => {
    const storedShoppingList = localStorage.getItem("shoppingList");
    if (storedShoppingList) {
      setShoppingList(JSON.parse(storedShoppingList));
    }
  }, []); 

  function addItemToShoppingList(item: ShoppingListItem) {

    if (!item.title) {
      return;
    }

    const newItemWithId = {...item, id: Date.now() }; 
    const updatedShoppingList = [...shoppingList, newItemWithId];
    setShoppingList(updatedShoppingList);
    localStorage.setItem("shoppingList", JSON.stringify(updatedShoppingList));

    setNewItem({
      id: 0,
      title: "",
      description: "",
      amount: 1,
    });
  }

  function deleteItemFromShoppingList(id: number) {
    const updatedShoppingList = shoppingList.filter((item) => item.id !== id);
    setShoppingList(updatedShoppingList);
    localStorage.setItem("shoppingList", JSON.stringify(updatedShoppingList));
  }

  return (
    <section className="flex flex-col items-center p-4">
      <h1 className="text-2xl">Add To ShoppingCart</h1>

      <input
        className="border-2 border-gray-300 p-2 m-2"
        type="text"
        placeholder="Title"
        value={newItem.title}
        required
        onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
      />

      <input
        className="border-2 border-gray-300 p-2 m-2"
        type="text"
        placeholder="Description"
        value={newItem.description}
        onChange={(e) =>
          setNewItem({ ...newItem, description: e.target.value })
        }
      />

      <input
        className="border-2 border-gray-300 p-2 m-2"
        type="number"
        placeholder="Amount"
        value={newItem.amount}
        min={1}
        onChange={(e) =>
          setNewItem({ ...newItem, amount: Number(e.target.value) })
        }
      />

      <button
        className="bg-blue-500 text-white p-2 m-2 rounded"
        onClick={() => addItemToShoppingList(newItem)}
      >
        Add Item
      </button>

      <div className="flex flex-col items-center p-4">
       { shoppingList.length === 0 && (
        <h2 className="text-xl">Your shopping list is empty!!</h2>
       )}
       { shoppingList.length > 0 && (
        <h2 className="text-xl">Your shopping list:</h2>
       )}

        <ul className="flex flex-col items-center p-4 gap-4">
          {shoppingList.map((item) => (
            <li className="" key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Amount: {item.amount}</p>
              <button

              className="bg-red-500 text-white p-1 m-1 rounded relative bottom-18 right-10 cursor-pointer"
               onClick={() => deleteItemFromShoppingList(item.id)}>X</button>
            </li>
    
          ))}
        </ul>
        
      </div>
    </section>
  );
};

export default ShoppingList;
