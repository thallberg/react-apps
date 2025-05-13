import React, { useState } from "react";

interface CalendarEvent {
  id: number;
  date: string; // ISO string, e.g. "2025-05-11"
  description: string;
}

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [description, setDescription] = useState<string>("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const addEvent = () => {
    if (!description.trim()) return;

    const newEvent: CalendarEvent = {
      id: Date.now(),
      date: selectedDate,
      description,
    };

    setEvents((prev) => [...prev, newEvent]);
    setDescription("");
  };

  // Gruppera händelser per datum
  const groupedEvents = events.reduce<Record<string, CalendarEvent[]>>(
    (acc, event) => {
      if (!acc[event.date]) acc[event.date] = [];
      acc[event.date].push(event);
      return acc;
    },
    {}
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">📅 Calendar Events</h1>

      {/* Formulär */}
      <div className="flex gap-2 mb-6">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
           className="border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addEvent();
            }
          }}
          placeholder="Event description"
           className="border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          onClick={addEvent}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Händelselista */}
      <div className="w-full max-w-md">
        {Object.keys(groupedEvents).length === 0 ? (
          <p className="text-gray-500 italic text-center">
            Inga planerade händelser.
          </p>
        ) : (
          Object.entries(groupedEvents).map(([date, eventsOnDate]) => (
            <div key={date} className="mb-4">
              <h2 className="font-semibold text-lg mb-2">{date}</h2>
              <ul className="space-y-1">
                {eventsOnDate.map((event) => (
                  <li key={event.id} className="bg-white p-2 rounded shadow-sm">
                    {event.description}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Calendar;
