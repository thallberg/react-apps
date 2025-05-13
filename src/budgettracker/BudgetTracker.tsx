import React, { useState } from "react";

interface Transaction {
  id: number;
  description: string;
  amount: number;
}

const BudgetTracker = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [description, setDescription] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [editingId, setEditingId] = useState<number | null>(null);

  const addOrEditTransaction = () => {
    if (!description.trim() || !amountInput.trim()) return;

    try {
      const evaluatedAmount = eval(amountInput.replace(/[^-()\d/*+.]/g, ""));
      if (isNaN(evaluatedAmount) || evaluatedAmount <= 0) return;

      const signedAmount =
        type === "income" ? evaluatedAmount : -evaluatedAmount;

      if (editingId) {
        setTransactions((prev) =>
          prev.map((t) =>
            t.id === editingId ? { ...t, description, amount: signedAmount } : t
          )
        );
        setEditingId(null);
      } else {
        const newTransaction: Transaction = {
          id: Date.now(),
          description,
          amount: signedAmount,
        };
        setTransactions((prev) => [...prev, newTransaction]);
      }

      setDescription("");
      setAmountInput("");
    } catch (error) {
      console.error("Invalid expression", error);
    }
  };

  const startEditing = (t: Transaction) => {
    setDescription(t.description);
    setAmountInput(Math.abs(t.amount).toString());
    setType(t.amount > 0 ? "income" : "expense");
    setEditingId(t.id);
  };

  const deleteTransaction = (id: number) => {
     const confirmed = window.confirm("Selected transactions will be removed, are you sure?")
    if(!confirmed) return
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setDescription("");
      setAmountInput("");
    }
  };

  const deleteAll = () => {
    const confirmed = window.confirm(
      "All transactions will be removed, are you sure?"
    );
    if (!confirmed) return;

    setTransactions([]);
  };

  const balance = transactions.reduce((sum, t) => sum + t.amount, 0);
  const incomes = transactions.filter((t) => t.amount > 0);
  const expenses = transactions.filter((t) => t.amount < 0);
  const totalIncome = incomes.reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">💰 My Budget Tracker</h1>

      {/* Form */}
      <div className="flex flex-col gap-2 w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Amount (e.g. 100+200)"
          value={amountInput}
          onChange={(e) => setAmountInput(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <div className="flex flex-col gap-2 md:flex-row">
          <button
            onClick={() => setType("income")}
            className={`flex-1 py-2 rounded ${
              type === "income"
                ? "bg-green-500 text-white"
                : "bg-white border border-green-500 text-green-600"
            }`}
          >
            ➕ Income
          </button>
          <button
            onClick={() => setType("expense")}
            className={`flex-1 py-2 rounded ${
              type === "expense"
                ? "bg-red-500 text-white"
                : "bg-white border border-red-500 text-red-600"
            }`}
          >
            ➖ Expense
          </button>
        </div>
        <button
          onClick={addOrEditTransaction}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          {editingId ? "Update Transaction" : "Add Transaction"}
        </button>
        <button
          onClick={deleteAll}
          className="bg-red-500 text-white py-2 rounded hover:bg-red-600 cursor-pointer"
        >
          Remove All Transactions 🗑️
        </button>
      </div>

      {/* Incomes & Expenses stacked vertically */}
      <div className="w-full max-w-md bg-white rounded shadow p-6 flex flex-col gap-6">
        {/* Incomes */}
        <div>
          <h2 className="text-lg text-center font-semibold mb-2 text-green-600">
            💰 Incomes
          </h2>
          <ul className="space-y-2">
            {incomes.map((t) => (
              <li
                key={t.id}
                className="flex justify-between items-center bg-green-50 px-4 py-2 rounded"
              >
                <span>{t.description}</span>
                <div className="flex items-center gap-2">
                  <span>+{t.amount.toLocaleString()} kr</span>
                  <button onClick={() => startEditing(t)} title="Edit">
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteTransaction(t.id)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
            {incomes.length === 0 && (
              <li className="text-gray-500 italic text-center">
                No incomes yet
              </li>
            )}
          </ul>
          <p className="font-bold mt-4 text-green-700 text-center">
            Total: +{totalIncome.toLocaleString()} kr
          </p>
        </div>

        {/* Horizontal Divider */}
        <hr className="border-t border-gray-300" />

        {/* Expenses */}
        <div>
          <h2 className="text-lg text-center font-semibold mb-2 text-red-600">
            💸 Expenses
          </h2>
          <ul className="space-y-2">
            {expenses.map((t) => (
              <li
                key={t.id}
                className="flex justify-between items-center bg-red-50 px-4 py-2 rounded"
              >
                <span>{t.description}</span>
                <div className="flex items-center gap-2">
                  <span>{t.amount.toLocaleString()} kr</span>
                  <button onClick={() => startEditing(t)} title="Edit">
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteTransaction(t.id)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
            {expenses.length === 0 && (
              <li className="text-gray-500 italic text-center">
                No expenses yet
              </li>
            )}
          </ul>
          <p className="font-bold mt-4 text-red-700 text-center">
            Total: {totalExpense.toLocaleString()} kr
          </p>
        </div>
      </div>

      {/* Balance */}
      <div className="w-full max-w-md text-center text-xl font-bold mt-6">
        📊 Balance: {balance.toLocaleString()} kr
      </div>
    </div>
  );
};

export default BudgetTracker;
