import { useEffect, useState } from "react";

type ITodo = {
  id: number;
  title: string;
  descrition: string;
  completed: boolean;
};

const ToDo = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [title, setTitle] = useState("");
  const [descrition, setDescrition] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = () => {
    if (title.trim() === "" || descrition.trim() === "") return;

    const newTodo: ITodo = {
      id: Date.now(),
      title,
      descrition,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
    setDescrition("");
  };

  const toggleCompleted = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <section className="flex flex-col justify-center items-center gap-8">
      <div>
        <h1 className="font-bold text-2xl text-blue-900">
          Simple ToDo Applikation
        </h1>
      </div>

      <div className="flex flex-col gap-3 p-4 border rounded-lg shadow-md bg-white">
        <input
          type="text"
          value={title}
          placeholder="Titel..."
          onChange={(e) => setTitle(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          value={descrition}
          onChange={(e) => setDescrition(e.target.value)}
          placeholder="Beskrivning..."
          rows={4}
          className="px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>

        <button
          onClick={addTodo}
          className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
        >
          Lägg till
        </button>
      </div>

      <div className="mt-6">
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3
                  className={`text-lg font-semibold ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.title}
                </h3>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 cursor-pointer hover:text-red-600 font-bold text-2xl relative bottom-5 left-2"
                  title="Ta bort"
                >
                  ×
                </button>
              </div>

              <p
                className={`text-sm ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.descrition}
              </p>

              <div className="mt-3">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleCompleted(todo.id)}
                    className="accent-blue-500 w-4 h-4 cursor-pointer"
                  />
                  <span
                    className={
                      todo.completed ? "text-green-600" : "text-gray-700"
                    }
                  >
                    {todo.completed ? "Klar" : "Inte klar"}
                  </span>
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ToDo;
