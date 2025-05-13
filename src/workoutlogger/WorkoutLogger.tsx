import React, { useState } from "react";

interface Workout {
  id: number;
  type: string;
  duration: number; // in minutes
  note: string;
}

const WorkoutLogger = () => {
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [note, setNote] = useState("");
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [editing, setEditing] = useState<number | null>(null);

  const resetForm = () => {
    setType("");
    setDuration("");
    setNote("");
    setEditing(null);
  };

  const addWorkout = () => {
    const durationNum = parseInt(duration);
    if (!type.trim() || isNaN(durationNum) || durationNum <= 0) return;

    const newWorkout: Workout = {
      id: Date.now(),
      type,
      duration: durationNum,
      note,
    };

    setWorkouts((prev) => [newWorkout, ...prev]);
    resetForm();
  };

  const startEditing = (w: Workout) => {
    setType(w.type);
    setDuration(w.duration.toString());
    setNote(w.note);
    setEditing(w.id);
  };

  const saveChanges = () => {
    const durationNum = parseInt(duration);
    if (!type.trim() || isNaN(durationNum) || durationNum <= 0 || editing === null) return;

    const updated = workouts.map((w) =>
      w.id === editing ? { ...w, type, duration: durationNum, note } : w
    );
    setWorkouts(updated);
    resetForm();
  };

  const deleteWorkout = (id: number) => {
    const confirmed = window.confirm("Selected workout will be removed, are you sure?");
    if (!confirmed) return;
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">🏋️ Träningslogg</h1>

      {/* Formulär */}
      <div className="w-full max-w-md bg-white rounded shadow p-4 space-y-3 mb-6">
        <input
          type="text"
          placeholder="Typ av träning (t.ex. Löpning)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Tid (minuter)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          placeholder="Kommentar (valfritt)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <div className="flex space-x-2">
          <button
            onClick={editing !== null ? saveChanges : addWorkout}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {editing !== null ? "Spara ändringar" : "Lägg till träning"}
          </button>
          {editing !== null && (
            <button
              onClick={resetForm}
              className="w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
            >
              Avbryt
            </button>
          )}
        </div>
      </div>

      {/* Lista med träningar */}
      <div className="w-full max-w-2xl space-y-4">
        {workouts.length === 0 && (
          <p className="text-gray-500 text-center italic">Inga träningspass inlagda ännu.</p>
        )}
        {workouts.map((w) => (
          <div
            key={w.id}
            className="bg-white rounded shadow p-4 flex justify-between items-start"
          >
            <div>
              <h3 className="text-lg font-semibold">{w.type}</h3>
              <p className="text-sm text-gray-700">⏱ {w.duration} min</p>
              {w.note && <p className="text-sm text-gray-600 mt-1 italic">{w.note}</p>}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => startEditing(w)}
                className="text-blue-500 hover:text-blue-700 text-xl"
                title="Redigera"
              >
                ✏️
              </button>
              <button
                onClick={() => deleteWorkout(w.id)}
                className="text-red-500 hover:text-red-700 text-xl"
                title="Ta bort"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutLogger;
