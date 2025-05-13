import React, { useState } from "react";

interface FancyTodoProps {
  id: number;
  title: string;
  completed: boolean;
}

const FancyTodo = () => {
  const [todos, setTodos] = useState<FancyTodoProps[]>([]);
  const [title, setTitle] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTodo = () => {
    if (title.trim() === "") return;

    const newTodo: FancyTodoProps = {
      id: Date.now(),
      title,
      completed,
    };

    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
    setCompleted(false);
  };

  const toggleCompleted = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">📝 Fancy Todos</h1>

      {/* Input */}
      <div className="flex w-full max-w-md gap-2 mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  }}
          placeholder="Enter a new todo..."
          className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded-md border ${
            filter === "all"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-3 py-1 rounded-md border ${
            filter === "active"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded-md border ${
            filter === "completed"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Todo List */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
        <ul className="space-y-2">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              onClick={() => toggleCompleted(todo.id)}
              className={`cursor-pointer px-4 py-2 rounded-md ${
                todo.completed
                  ? "line-through bg-green-100 text-gray-500"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              {todo.title}
            </li>
          ))}
          {filteredTodos.length === 0 && (
            <li className="text-center text-gray-400 italic">No todos</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FancyTodo;
