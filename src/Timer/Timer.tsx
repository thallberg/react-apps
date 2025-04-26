import { useEffect, useState } from "react";

const Timer = () => {
  const [focusMinutes, setFocusMinutes] = useState(25); // Fokus timer
  const [breakMinutes, setBreakMinutes] = useState(5); // Paus timer
  const [minutes, setMinutes] = useState(focusMinutes); // Aktuell timer
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFocus, setIsFocus] = useState(true);
  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    if (isActive && (minutes > 0 || seconds > 0)) {
      const interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes > 0) {
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
      setTimer(interval);
    } else {
      if (timer) clearInterval(timer);
      if (minutes === 0 && seconds === 0) {
        // När timern är slut: byt mellan fokus och vila
        if (isFocus) {
          setMinutes(breakMinutes); // Paus timer
        } else {
          setMinutes(focusMinutes); // Fokus timer
        }
        setSeconds(0);
        setIsFocus((prev) => !prev); // Byt fokus/vila
      }
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, minutes, seconds, isFocus, focusMinutes, breakMinutes]);

  // Funktion för att starta/pause timern
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Funktion för att återställa timern
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(isFocus ? focusMinutes : breakMinutes);
    setSeconds(0);
  };

  // Funktion för att uppdatera fokus timer
  const handleFocusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFocusMinutes(parseInt(e.target.value));
    if (isFocus) {
      setMinutes(parseInt(e.target.value));
    }
  };

  // Funktion för att uppdatera paus timer
  const handleBreakChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBreakMinutes(parseInt(e.target.value));
    if (!isFocus) {
      setMinutes(parseInt(e.target.value));
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center py-8 text-center ${
        isFocus ? "bg-blue-100" : "bg-green-100"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">
        {isFocus ? "Fokus" : "Vila"}
      </h1>

      <div className="text-6xl font-semibold mb-4">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>

      {/* Timer Val */}
      <div className="mb-6">
        <div className="mb-4">
          <label className="block text-lg">Fokus tid (minuter):</label>
          <input
            type="number"
            value={focusMinutes}
            onChange={handleFocusChange}
            min="1"
            className="px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-lg">Paus tid (minuter):</label>
          <input
            type="number"
            value={breakMinutes}
            onChange={handleBreakChange}
            min="1"
            className="px-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Timer Controls */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={toggleTimer}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          {isActive ? "Pausa" : "Starta"}
        </button>
        <button
          onClick={resetTimer}
          className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Återställ
        </button>
      </div>

      <p className="text-lg font-semibold">
        {isFocus
          ? "Det är dags att fokusera på din uppgift."
          : "Ta en kort paus och slappna av."}
      </p>
    </div>
  );
};

export default Timer;
