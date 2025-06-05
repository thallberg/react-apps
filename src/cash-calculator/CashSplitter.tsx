import React, { useState, ChangeEvent, JSX } from "react";

const denominations: number[] = [1000, 500, 200, 100, 50, 20, 10, 5, 1];

type CashCounts = {
  [key: number]: string; // antal sedlar per valör som sträng (för inputfält)
};

export default function CashSplitter(): JSX.Element {
  const [totalSum, setTotalSum] = useState<string>("0");
  const [counts, setCounts] = useState<CashCounts>(() =>
    denominations.reduce((acc, d) => ({ ...acc, [d]: "" }), {})
  );

  // Räkna ut summan av sedlar
  function calculateEnteredSum(cash: CashCounts): number {
    let sum = 0;
    for (const [value, count] of Object.entries(cash)) {
      sum += Number(value) * Number(count || 0);
    }
    return sum;
  }

  // Hantera ändring i total summa-input
  function handleTotalSumChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (val === "" || /^[0-9\b]+$/.test(val)) {
      setTotalSum(val);
    }
  }

  // Hantera antal sedlar per valör
  function handleCountChange(e: ChangeEvent<HTMLInputElement>, denom: number) {
    const val = e.target.value;
    if (val === "" || /^[0-9\b]+$/.test(val)) {
      setCounts((prev) => ({ ...prev, [denom]: val }));
    }
  }

  const total = Number(totalSum || 0);
  const enteredSum = calculateEnteredSum(counts);
  const difference = total - enteredSum;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md font-sans">
      <h2 className="text-2xl font-semibold mb-6 text-center">Splittra summa i sedlar</h2>

      <div className="mb-6">
        <label htmlFor="totalSum" className="block mb-2 font-medium text-lg">
          Total summa att dela upp (kr)
        </label>
        <input
          id="totalSum"
          type="number"
          min={0}
          value={totalSum}
          onChange={handleTotalSumChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-4">
        {denominations.map((denom) => (
          <div key={denom} className="flex items-center justify-between">
            <label className="text-lg font-medium">{denom} kr:</label>
            <input
              type="number"
              min={0}
              value={counts[denom]}
              onChange={(e) => handleCountChange(e, denom)}
              className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      <hr className="my-6" />

      <div className="text-center text-lg font-semibold">
        {difference === 0 && (
          <p className="text-green-600">Summan är perfekt uppdelad! 🎉</p>
        )}
        {difference > 0 && (
          <p className="text-red-600">
            Du saknar <span className="font-bold">{difference} kr</span> för att nå totalen.
          </p>
        )}
        {difference < 0 && (
          <p className="text-red-600">
            Du har lagt till för mycket pengar, <span className="font-bold">{-difference} kr</span> för mycket.
          </p>
        )}
        <p className="mt-2">
          Delad summa: <span className="font-bold">{enteredSum} kr</span>
        </p>
      </div>
    </div>
  );
}
