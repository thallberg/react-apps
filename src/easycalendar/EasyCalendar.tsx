import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const DAYS = ["Mån", "Tis", "Ons", "Tors", "Fre", "Lör", "Sön"];

const CustomDateTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const calendarRef = useRef(null);

  const monthNames = [
    "Januari", "Februari", "Mars", "April", "Maj", "Juni",
    "Juli", "Augusti", "September", "Oktober", "November", "December"
  ];

  const handleDocumentClick = (event: MouseEvent) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false);
      setShowMonthDropdown(false);
      setShowYearDropdown(false);
      setShowTimeDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, []);

  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getStartDayOfWeek = (month: number, year: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const getWeekNumber = (date: Date) => {
    const target = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = new Date(target.getFullYear(), 0, 4);
    const dayDiff = (target.getTime() - firstThursday.getTime()) / 86400000;
    return 1 + Math.floor(dayDiff / 7);
  };

  const generateCalendar = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const startDay = getStartDayOfWeek(currentMonth, currentYear);
    const prevMonthDays = getDaysInMonth(
      (currentMonth - 1 + 12) % 12,
      currentMonth === 0 ? currentYear - 1 : currentYear
    );

    let dayCounter = 1;
    let nextMonthCounter = 1;
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        let dayObj;
        if (i === 0 && j < startDay) {
          dayObj = {
            date: prevMonthDays - startDay + j + 1,
            current: false,
            fullDate: new Date(currentYear, currentMonth - 1, prevMonthDays - startDay + j + 1),
          };
        } else if (dayCounter > daysInMonth) {
          dayObj = {
            date: nextMonthCounter,
            current: false,
            fullDate: new Date(currentYear, currentMonth + 1, nextMonthCounter++),
          };
        } else {
          dayObj = {
            date: dayCounter,
            current: true,
            fullDate: new Date(currentYear, currentMonth, dayCounter++),
          };
        }
        week.push(dayObj);
      }
      days.push(week);
    }
    return days;
  };

  const formatDateTime = () => {
    if (!selectedDate) return "";
    const datePart = `${selectedDate.getFullYear()}-${String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
    return selectedTime ? `${datePart} ${selectedTime}` : datePart;
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 15) {
        times.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
      }
    }
    return times;
  };

  return (
    <div className="relative w-72" ref={calendarRef}>
      <input
        type="text"
        placeholder="Choose date"
        className="w-full border px-3 py-2 rounded shadow"
        onFocus={() => setShowCalendar(true)}
        value={formatDateTime()}
        onChange={(e) => setSelectedDate(new Date(e.target.value))}
      />

      {showCalendar && (
        <div className="absolute z-50 mt-2 w-full border bg-white rounded shadow p-4">
          <div className="flex justify-between items-center">
            <button onClick={() => setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))}>
              <FaChevronLeft />
            </button>
            <div className="flex flex-col items-center">
              <button onClick={() => setShowMonthDropdown(!showMonthDropdown)}>{monthNames[currentMonth]}</button>
              <button onClick={() => setShowYearDropdown(!showYearDropdown)}>{currentYear}</button>
            </div>
            <button onClick={() => setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))}>
              <FaChevronRight />
            </button>
          </div>

          {showMonthDropdown && (
            <div className="max-h-40 overflow-y-auto border mt-1">
              {monthNames.map((month, index) => (
                <div
                  key={index}
                  className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setCurrentMonth(index);
                    setShowMonthDropdown(false);
                  }}
                >
                  {month}
                </div>
              ))}
            </div>
          )}

          {showYearDropdown && (
            <div className="max-h-40 overflow-y-auto border mt-1">
              {Array.from({ length: 200 }, (_, i) => i + 1925).map((year) => (
                <div
                  key={year}
                  className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setCurrentYear(year);
                    setShowYearDropdown(false);
                  }}
                >
                  {year}
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-8 gap-1 mt-2 text-sm text-center">
            <div className="font-bold">V</div>
            {DAYS.map((day, i) => (
              <div key={i} className="font-bold">
                {day}
              </div>
            ))}

            {generateCalendar().map((week, i) => (
              <>
                <div className="text-xs font-medium mt-1">
                  {getWeekNumber(week[0].fullDate)}
                </div>
                {week.map((d, j) => (
                  <div
                    key={`${i}-${j}`}
                    className={`py-1 cursor-pointer rounded ${
                      d.current ? "text-black" : "text-gray-400"
                    } hover:bg-blue-100 ${
                      selectedDate?.toDateString() === d.fullDate.toDateString()
                        ? "bg-blue-500 text-white"
                        : ""
                    }`}
                    onClick={() => setSelectedDate(d.fullDate)}
                  >
                    {d.date}
                  </div>
                ))}
              </>
            ))}
          </div>

          <div className="mt-3">
            <label className="block text-sm font-medium mb-1">Ange tid</label>
            <input
              type="text"
              placeholder="HH:mm"
              value={selectedTime}
              onFocus={() => setShowTimeDropdown(true)}
              onChange={handleTimeChange}
              className="w-full border px-3 py-1 rounded"
            />
            {showTimeDropdown && (
              <div className="max-h-40 overflow-y-auto border mt-1 bg-white shadow rounded">
                {generateTimeOptions().map((time) => (
                  <div
                    key={time}
                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedTime(time);
                      setShowTimeDropdown(false);
                    }}
                  >
                    {time}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDateTimePicker;
