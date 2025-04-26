import { useEffect, useState } from "react";

const EggTimer = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval!);
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  const handleStart = () => {
    const sec = Number(inputValue);
    if (!isNaN(sec) && sec > 0) {
      setSeconds(sec);
      setIsActive(true);
    }
  };

  const handlePause = () => {
    setIsActive((prev) => !prev);
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(0);
    setInputValue("");
  };

  const handlePreset = (sec: number) => {
    setSeconds(sec);
    setInputValue(sec.toString());
    setIsActive(true);
  };

  return (
    <section className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">🥚 Egg Timer</h1>

      <input
        placeholder="Tid i sekunder"
        className="border border-gray-300 rounded p-2 mb-4"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        min={1}
        type="number"
      />

      <div className="text-3xl mb-4">{seconds} sekunder kvar</div>

      <div className="space-x-4">
        <button
          onClick={handleStart}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Start
        </button>
        <button
          onClick={handlePause}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          {isActive ? "Paus" : "Fortsätt"}
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Nollställ
        </button>
      </div>

      {/* Förinställda mallar */}
      <div className="mb-4 space-x-2 pt-4">
        <button
          onClick={() => handlePreset(300)}
          className="bg-gray-500 hover:bg-green-800 active:bg-green-400 text-white px-4 py-2 rounded"
        >
          Löskokt (5 min)
        </button>
        <button
          onClick={() => handlePreset(420)}
          className="bg-gray-600 hover:bg-green-800 active:bg-green-400 text-white px-4 py-2 rounded"
        >
          Medium (7 min)
        </button>
        <button
          onClick={() => handlePreset(540)}
          className="bg-gray-700 hover:bg-green-800 active:bg-green-400 text-white px-4 py-2 rounded"
        >
          Hårdkokt (9 min)
        </button>
      </div>
    </section>
  );
};

export default EggTimer;
