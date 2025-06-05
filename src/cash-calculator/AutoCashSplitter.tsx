import React, { useState, ChangeEvent, JSX } from "react";

const denominations: number[] = [1000, 500, 200, 100, 50, 20, 10, 5, 1];

export default function AutoCashSplitter(): JSX.Element {
  const [totalSum, setTotalSum] = useState<string>("0");
  const [counts, setCounts] = useState<{ [key: number]: number }>({});

  function calculateBreakdown(amount: number): { [key: number]: number } {
    let remaining = amount;
    const result: { [key: number]: number } = {};

    for (const denom of denominations) {
      const count = Math.floor(remaining / denom);
      if (count > 0) {
        result[denom] = count;
        remaining -= denom * count;
      }
    }
    return result;
  }

  function handleTotalSumChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (val === "" || /^[0-9\b]+$/.test(val)) {
      setTotalSum(val);
      const numVal = Number(val || 0);
      setCounts(calculateBreakdown(numVal));
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md font-sans">
      <h2 className="text-2xl font-semibold mb-6 text-center">Automatisk Returmaskin</h2>

      <div className="mb-6">
        <label htmlFor="totalSum" className="block mb-2 font-medium text-lg">
          Mata in summa (kr)
        </label>
        <input
          id="totalSum"
          type="number"
          min={0}
          value={totalSum}
          onChange={handleTotalSumChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Skriv in summan"
        />
      </div>

      <div className="space-y-4">
        {denominations.map((denom) => (
          <div key={denom} className="flex items-center justify-between">
            <span className="text-lg font-medium">{denom} kr:</span>
            <span className="text-lg">{counts[denom] ?? 0} st</span>
          </div>
        ))}
      </div>
    </div>
  );
}
