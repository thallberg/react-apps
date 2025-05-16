import { useId, useRef, useState, useEffect, type ChangeEvent } from "react";
import { format, isValid, parse } from "date-fns";
import { DateInput } from "./DateInput";
import { Calendar } from "./Calendar";
import { updateDateWithTime, getSwedishHolidays } from "./Utils";

export function ReactDayPicker({ showTime = true, showHolidays = true, showInput = true }) {
  const inputId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [month, setMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [inputValue, setInputValue] = useState("");
  const [time, setTime] = useState("12:00");
  const [isOpen, setIsOpen] = useState(false);
  const formatString = showTime ? "MM/dd/yyyy HH:mm" : "MM/dd/yyyy";
  const holidayDates = showHolidays ? getSwedishHolidays(month.getFullYear()) : [];

  const handleInputClick = () => setIsOpen(true);

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue("");
      setSelectedDate(undefined);
      return;
    }
    const updated = showTime ? updateDateWithTime(date, time) : date;
    setSelectedDate(updated);
    setMonth(updated);
    setInputValue(format(updated, formatString));
    setIsOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    const parsed = parse(value, formatString, new Date());
    if (isValid(parsed)) {
      const updated = showTime ? updateDateWithTime(parsed, time) : parsed;
      setSelectedDate(updated);
      setMonth(updated);
    } else {
      setSelectedDate(undefined);
    }
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTime(newTime);
    if (selectedDate && isValid(selectedDate)) {
      const updated = updateDateWithTime(selectedDate, newTime);
      setSelectedDate(updated);
      setInputValue(format(updated, formatString));
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-fit">
      {showInput && (
        <DateInput
          inputId={inputId}
          value={inputValue}
          placeholder={formatString}
          onClick={handleInputClick}
          onChange={handleInputChange}
        />
      )}
      {(isOpen || !showInput) && (
        <Calendar
          month={month}
          holidayDates={holidayDates}
          selected={selectedDate}
          onSelect={handleDayPickerSelect}
          onMonthChange={setMonth}
          showTime={showTime}
          time={time}
          onTimeChange={handleTimeChange}
        />
      )}
    </div>
  );
}
