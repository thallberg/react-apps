import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <section className="flex flex-col items-center gap-4 p-8">
      <h1 className="text-2xl">Counter: {count}</h1>

      <div className="flex flex-row gap-4">
        <button
        className="bg-green-800 w-22 p-1 rounded-lg text-white text-lg"
         onClick={() => setCount((prev) => prev + 1)}> +1 </button>
     
        <button
         className="bg-red-800 w-22 p-1 rounded-lg text-white text-lg" 
        onClick={() => setCount((prev) => prev - 1)}> -1 </button>
      </div>

      <div>
        <button
        className="bg-yellow-600 w-22 p-1 rounded-lg text-black text-lg" 
         onClick={() => setCount(0)}>Reset</button>
      </div>
    </section>
  );
};

export default Counter;
