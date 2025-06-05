import React, { useEffect, useState } from 'react';

type Timer = {
  id: number;
  name: string;
  targetDate: Date;
  remaining: number;
};

const TimerAgain = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [timers, setTimers] = useState<Timer[]>([]);

  const handleAddTimer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName || !eventDate || !eventTime) return;

    const [hours, minutes] = eventTime.split(':').map(Number);
    const target = new Date(eventDate);
    target.setHours(hours, minutes, 0, 0);

    const newTimer: Timer = {
      id: Date.now(),
      name: eventName,
      targetDate: target,
      remaining: target.getTime() - new Date().getTime(),
    };

    setTimers((prev) => [...prev, newTimer]);
    setEventName('');
    setEventDate('');
    setEventTime('');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          const remaining = timer.targetDate.getTime() - new Date().getTime();
          if (remaining <= 0 && timer.remaining !== 0) {
            alert(`Countdown for "${timer.name}" completed!`);
            return { ...timer, remaining: 0 };
          }
          return { ...timer, remaining };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-4">Countdown Timer</h2>

      <form className="space-y-4" onSubmit={handleAddTimer}>
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            Event Name
          </label>
          <input
            name="title"
            type="text"
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="date-picker" className="block mb-1 font-medium">
            Event Date
          </label>
          <input
            name="date-picker"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="time-picker" className="block mb-1 font-medium">
            Event Time
          </label>
          <input
            name="time-picker"
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Add Countdown
        </button>
      </form>

      <div className="mt-8 space-y-4">
        {timers.map((timer) => (
          <div
            key={timer.id}
            className="border p-4 rounded shadow-sm bg-gray-100 text-center"
          >
            <h3 className="font-semibold text-lg mb-1">{timer.name}</h3>
            <p className="font-mono text-xl">
              {timer.remaining > 0 ? formatTime(timer.remaining) : '00:00:00'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimerAgain;
