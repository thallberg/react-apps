import { useState } from "react";

const colors: string[] = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-cyan-500",
];

const ColorArray = () => {
  const [colorIndex, setColorIndex] = useState<number>(0);

  const ChangeColor = (): void => {
    setColorIndex((prevIndex) => (prevIndex + 1) % colors.length)
  }

  return (
    <div
      className={`${colors[colorIndex]} h-88 w-full justify-center items-center`}
    >
      <div className="flex justify-center items-center h-full">
        <button 
        onClick={ChangeColor}
        className="py-2 px-8 bg-green-950 flex text-white rounded-2xl">Ändra Färg</button>
      </div>
    </div>
  );
};

export default ColorArray;
