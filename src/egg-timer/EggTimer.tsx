import React, { useEffect, useRef, useState } from "react";
import { FaRegSmile, FaRegMeh, FaRegFrown } from "react-icons/fa"; // exempel

const eggOptions = [
  { label: "Mjuk", time: 180, icon: <FaRegSmile size={40} /> },
  { label: "Medium", time: 300, icon: <FaRegMeh size={40} /> },
  { label: "Hård", time: 420, icon: <FaRegFrown size={40} /> },
];

const EggTimer = () => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = (label: string, duration: number) => {
    clearInterval(timerRef.current!);
    setActiveLabel(label);
    setTimeLeft(duration);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          alert(`${label} är klara! 🥚🔔`);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current!);
  }, []);

  const activeIcon = eggOptions.find((egg) => egg.label === activeLabel)?.icon;

  return (
    <div className="p-4 w-80 mx-auto text-center">
      <h2 className="text-xl font-bold mb-4">Äggtimer</h2>

      <div className="grid grid-cols-3 gap-1">
        {eggOptions.map((egg) => (
          <div
            key={egg.label}
            className="cursor-pointer flex flex-col items-center"
            onClick={() => startTimer(egg.label, egg.time)}
          >
            <div className="text-yellow-600">{egg.icon}</div>
            <p className="mt-2 font-medium text-sm">{egg.label}</p>
          </div>
        ))}
      </div>

      {timeLeft !== null && (
        <div className="mt-6 flex justify-center">
          <div className="w-50 h-50 bg-yellow-100 border-4 border-yellow-500 rounded-xl shadow-lg flex flex-col items-center justify-center relative">
            <div className="absolute top-4">{activeIcon}</div>
            <div className="mt-10 text-3xl font-bold">{formatTime(timeLeft)}</div>
            <p className="mt-2 text-lg">{activeLabel}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EggTimer;
