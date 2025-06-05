import React, { useState, ChangeEvent, JSX } from "react";

const denominations: number[] = [1, 5, 10, 20, 50, 100, 200, 1000];

type CashCounts = {
  [key: number]: string; // Spara som strängar
};

function calculateTotalMoney(cash: CashCounts): number {
  let total = 0;
  for (const [value, count] of Object.entries(cash)) {
    total += Number(value) * Number(count || 0);
  }
  return total;
}

export default function CashCalculator(): JSX.Element {
  const [counts, setCounts] = useState<CashCounts>(() =>
    denominations.reduce((acc, d) => ({ ...acc, [d]: "0" }), {})
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>, denom: number) {
    const value = e.target.value;
    // Tillåt tom sträng (för att kunna radera helt) och bara siffror
    if (value === "" || /^[0-9\b]+$/.test(value)) {
      setCounts((prev) => ({
        ...prev,
        [denom]: value,
      }));
    }
  }

  function handleFocus(denom: number) {
  if (counts[denom] === "0") {
    setCounts((prev) => ({
      ...prev,
      [denom]: "",
    }));
  }
}


  const total = calculateTotalMoney(counts);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md font-sans">
      <h2 className="text-2xl font-semibold mb-6 text-center">Returmaskin</h2>
      <div className="space-y-4">
        {denominations.map((denom) => (
          <div key={denom} className="flex items-center justify-between">
            <label className="text-lg font-medium">{denom} kr:</label>
            <input
              type="number"
               onFocus={() => handleFocus(denom)}
              min={0}
              value={counts[denom]}
              onChange={(e) => handleChange(e, denom)}
              className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      <hr className="my-6" />
      <h3 className="text-xl font-semibold text-center">
        Total summa: <span className="text-blue-600">{total} kr</span>
      </h3>
    </div>
  );
}
