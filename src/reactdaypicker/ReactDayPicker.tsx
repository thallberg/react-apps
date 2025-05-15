import { useId, useState, type ChangeEvent } from "react";
import { format, isValid, parse, setHours, setMinutes } from "date-fns";
import { DayPicker } from "react-day-picker";
import Holidays from "date-holidays";
import "react-day-picker/style.css";

interface ReactDayPickerProps {
  showTime?: boolean;
}

export function ReactDayPicker({ showTime = true }: ReactDayPickerProps) {
  const inputId = useId();
  const [month, setMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [inputValue, setInputValue] = useState<string>("");
  const [time, setTime] = useState<string>("12:00");
  const formatString = showTime ? "MM/dd/yyyy HH:mm" : "MM/dd/yyyy";

  const hd = new Holidays("sv"); // eller vilket land du vill
  const year = month.getFullYear();
  const holidays = hd.getHolidays(year);

  // Skapa en lista med datum-objekt (bara datum utan tid)
  const holidayDates = holidays
    .map((h) => new Date(h.date))
    .filter((d) => d instanceof Date && !isNaN(d.getDate()));

  const updateDateWithTime = (date: Date, timeStr: string): Date => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return setMinutes(setHours(date, hours), minutes);
  };

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue("");
      setSelectedDate(undefined);
    } else {
      const updated = showTime ? updateDateWithTime(date, time) : date;
      setSelectedDate(updated);
      setMonth(updated);
      setInputValue(format(updated, formatString));
    }
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

  // const CustomMonthHeader = ({ onPreviousClick, onNextClick, previousMonth, nextMonth }: NavProps) => {
  //   const currentMonth = previousMonth ? addMonths(previousMonth, 1) : new Date();
  //   return (
  //     <div className="flex flex-col justify-center items-center py-2 gap-2">
  //       <div className="flex items-center w-full space-x-16">
  //         <button onClick={onPreviousClick} disabled={!previousMonth} className="text-xl text-blue-500">
  //           {'<'}
  //         </button>
  //         <span className="text-3xl font-semibold">{format(currentMonth, 'MMMM')}</span>
  //         <button onClick={onNextClick} disabled={!nextMonth} className="text-xl text-blue-500">
  //           {'>'}
  //         </button>
  //       </div>

  //       <div>
  //         <button onClick={onPreviousClick} disabled={!previousMonth} className="">
  //           {'<'}
  //         </button>
  //         <span className="text-lg font-semibold">{format(currentMonth, 'yyyy')}</span>
  //         <button onClick={onNextClick} disabled={!nextMonth} className="">
  //           {'>'}
  //         </button>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="flex flex-col items-center">
      <input
        id={inputId}
        type="text"
        value={inputValue}
        placeholder={formatString}
        onChange={handleInputChange}
        className="text-[--color-text-placeholder] border-2 border-[--color-border-default] p-2.5 outline-[--color-primary-blue] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[--color-primary-blue] focus:ring-offset-1 rounded-sm"
      />
      <DayPicker
        month={month}
        captionLayout="dropdown"
        startMonth={new Date(2020, 1)}
        endMonth={new Date(2030, 1)}
        onMonthChange={setMonth}
        weekStartsOn={1}
        showWeekNumber={true}
        fixedWeeks={true}
        showOutsideDays
        modifiers={{
          holiday: holidayDates,
        }}
        modifiersClassNames={{
          holiday: "bg-red-300 text-white rounded-md",
        }}
        classNames={{
          day: "text-gray-700 focus:bg-blue-200",
          selected: "bg-blue-400 !text-white rounded-md",
          week_number_header: "",
          weekday: "opacity-80 font-medium text-sm text-center",
          weekdays: "border-b-2 border-blue-500",
          button_next:
            "absolute right-14 top-3 text-gray-600 hover:text-gray-800",
          button_previous:
            "absolute left-14 top-3 text-gray-600 hover:text-gray-800",
          month_caption: "flex flex-col items-center justify-between py-2",
          dropdowns: "flex flex-col items-center justify-between py-2 gap-2",
          nav: "",
          footer: "flex item-center justify-center",
          months: "flex flex-col justify-center items-center",
          row: "first:pt-2",
          day_button: "w-12 h-12",
        }}
        mode="single"
        selected={selectedDate}
        onSelect={handleDayPickerSelect}
        components={{
          WeekNumberHeader: () => (
            <th className="opacity-80 px-2 py-1 font-medium text-sm text-center uppercase border-b-2 border-gray-300">
              V
            </th>
          ),
          // Nav: CustomMonthHeader,
        }}
        footer={
          showTime ? (
            <div className="mt-2 space-y-1">
              <div className="">
                <input
                  type="time"
                  value={time}
                  onChange={handleTimeChange}
                  className="text-[--color-text-placeholder] border-2 border-[--color-border-default] p-1.5 outline-[--color-primary-blue] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[--color-primary-blue] focus:ring-offset-1 rounded-sm"
                />
              </div>
            </div>
          ) : undefined
        }
      />
    </div>
  );
}

export default ReactDayPicker;
