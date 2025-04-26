import { useEffect, useState } from "react";

const TimerAlert = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        setSeconds((prevSec) => {
          if (prevSec === 0) {
            if (minutes === 0) {
              clearInterval(interval!);
              setIsActive(false);
              return 0;
            } else {
              setMinutes((prevMin) => prevMin - 1);
              return 59;
            }
          } else {
            return prevSec - 1;
          }
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds]);

  const handleStart = () => {
    if (minutes > 0 || seconds > 0) {
      setIsActive(true);
    }
  };

  const handlePause = () => {
    if (minutes === 0 && seconds === 0) return; // inget att pausa
    if (!isActive) return; // får inte toggla om den inte är igång
    setIsActive(false);
  };
  

  const handleReset = () => {
    if (minutes === 0 && seconds === 0) return;
    setIsActive(false);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">⏰ Timer</h1>

      <div className="flex space-x-2 mb-4">
        <input
          type="number"
          min="0"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          placeholder="Minuter"
          className="border rounded p-2 w-24"
        />
        <input
          type="number"
          min="0"
          max="59"
          value={seconds}
          onChange={(e) => {
            const value = Math.min(59, Number(e.target.value));
            setSeconds(value);
          }}
          placeholder="Sekunder"
          className="border rounded p-2 w-24"
        />
      </div>



      <div className="space-x-4">
        <button
          onClick={handleStart}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Start
        </button>
        <button
          onClick={handlePause}
          disabled={minutes === 0 && seconds === 0}
          className={`px-4 py-2 rounded text-white ${
            minutes === 0 && seconds === 0
              ? "bg-yellow-300 cursor-not-allowed"
              : "bg-yellow-500"
          }`}
        >Paus
        </button>

        <button
          onClick={handleReset}
          disabled={minutes === 0 && seconds === 0}
          className={`px-4 py-2 rounded text-white ${
            minutes === 0 && seconds === 0
              ? "bg-red-300 cursor-not-allowed"
              : "bg-red-500"
          }`}
        >
          Nollställ
        </button>
      </div>
    </section>
  );
};

export default TimerAlert;
