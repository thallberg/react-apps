import React, { useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const formatDateTime = (date: Date | null, time: string | null) => {
  if (!date || !time) return '';
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${time}`;
};

const pad = (num: number) => (num < 10 ? `0${num}` : num);

const CalendarWithTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState<boolean>(false);
  const [showYearDropdown, setShowYearDropdown] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [showTimeDropdown, setShowTimeDropdown] = useState<boolean>(false);  
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const generateTimes = () => {
    const times = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 15) {
        times.push(`${pad(h)}:${pad(m)}`);
      }
    }
    return times;
  };

  const times = generateTimes();

  const getDaysInMonth = (month: number, year: number) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);

  const prevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const selectDay = (day: Date) => {
    setSelectedDate(day);
    setShowCalendar(false);
  };

  const selectTime = (time: string) => {
    setSelectedTime(time);
    setShowTimeDropdown(false);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    const dateParts = date.split('/');
    if (dateParts.length === 3) {
      const day = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1;
      const year = parseInt(dateParts[2], 10);
      const newDate = new Date(year, month, day);
      if (!isNaN(newDate.getTime())) {
        setSelectedDate(newDate);
      }
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
  };

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const weekdays = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'];

  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date.getTime() - firstDayOfYear.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + firstDayOfYear.getDay() + 1) / 7);
  };

  return (
    <div className="relative w-80">
      {/* Input for date */}
      <input
        onClick={() => setShowCalendar(true)}
        value={formatDateTime(selectedDate, selectedTime)}
        placeholder="Choose day"
        onChange={handleDateChange}  // Tillåter skrivning av datum
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
      />

      {/* Calendar popup */}
      {showCalendar && (
        <div className="absolute left-0 mt-2 p-4 w-80 bg-white shadow-lg rounded-md border border-gray-200 z-10" ref={calendarRef}>
          {/* Month and Year navigation */}
          <div className="flex justify-between items-center mb-4">
            <FaChevronLeft
              onClick={prevMonth}
              className="text-gray-600 cursor-pointer hover:text-gray-800"
            />
            <span
              onClick={() => setShowMonthDropdown(!showMonthDropdown)}
              className="text-lg font-semibold text-gray-800 cursor-pointer"
            >
              {monthNames[selectedMonth]}
            </span>
            <FaChevronRight
              onClick={nextMonth}
              className="text-gray-600 cursor-pointer hover:text-gray-800"
            />
          </div>

          {/* Year selection */}
          <div className="flex justify-between items-center mb-4">
            <FaChevronLeft
              onClick={() => setSelectedYear(selectedYear - 1)}
              className="text-gray-600 cursor-pointer hover:text-gray-800"
            />
            <span
              onClick={() => setShowYearDropdown(!showYearDropdown)}
              className="text-lg font-semibold text-gray-800 cursor-pointer"
            >
              {selectedYear}
            </span>
            <FaChevronRight
              onClick={() => setSelectedYear(selectedYear + 1)}
              className="text-gray-600 cursor-pointer hover:text-gray-800"
            />
          </div>

          {/* Month Dropdown */}
          {showMonthDropdown && (
            <div className="max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md">
              {monthNames.map((month, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedMonth(index)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {month}
                </div>
              ))}
            </div>
          )}

          {/* Year Dropdown */}
          {showYearDropdown && (
            <div className="max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md">
              {[...Array(10)].map((_, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedYear(selectedYear - 5 + index)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {selectedYear - 5 + index}
                </div>
              ))}
            </div>
          )}

          {/* Week numbers and weekdays */}
          <div className="grid grid-cols-8 gap-2 mb-4 text-sm text-center">
            <div className="font-semibold">Veckonr</div>
            {weekdays.map((weekday, index) => (
              <div key={index} className="font-semibold">{weekday}</div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-8 gap-2 text-sm text-center">
            {daysInMonth.map((day) => {
              const weekNumber = getWeekNumber(day);
              return (
                <React.Fragment key={day.toString()}>
                  {/* Display Week Number */}
                  {day.getDate() === 1 && (
                    <div className="flex justify-center items-center text-xs text-gray-600">{weekNumber}</div>
                  )}
                  <div
                    className={`p-2 cursor-pointer rounded-md 
                      ${day.getMonth() === selectedMonth ? 'bg-gray-100 hover:bg-gray-200' : 'text-gray-300'}`}
                    onClick={() => selectDay(day)}
                  >
                    {day.getDate()}
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          {/* Time picker (visible only on click of time input) */}
          <div className="mb-4">
            <input
              type="text"
              value={selectedTime || ''}
              placeholder="Choose time"
              onChange={handleTimeChange}  // Tillåter skrivning av tid
              onClick={() => setShowTimeDropdown(true)}  // Tidsrullgardinen öppnas vid klick
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
            {showTimeDropdown && (
              <div className="max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md mt-2">
                {times.map((time) => (
                  <div
                    key={time}
                    onClick={() => selectTime(time)}
                    className="p-2 cursor-pointer hover:bg-gray-200"
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

export default CalendarWithTimePicker;
