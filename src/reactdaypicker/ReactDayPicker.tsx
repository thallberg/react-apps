import { useId, useState, type ChangeEvent } from "react";
import { format, isValid, parse, setHours, setMinutes } from "date-fns";
import { DayPicker } from "react-day-picker";
import Holidays from "date-holidays";
import "react-day-picker/style.css";

interface ReactdaypickerProps {
    showTime?: boolean;
    disableToday?: boolean;
}

export function ReactDayPicker({ showTime = true }: ReactdaypickerProps) {
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


    return (
        <div className="flex flex-col items-center">
            <input
                id={inputId}
                type="text"
                value={inputValue}
                placeholder={formatString}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <DayPicker
                month={month}
                modifiers={{
                    holiday: redDays,
                    weekend: (date) => date.getDay() === 0 || date.getDay() === 6,
                }}
                modifiersClassNames={{
                    holiday: "bg-red-100 text-red-700 font-semibold",
                    weekend: "bg-gray-100 text-gray-500",
                }}

                captionLayout="dropdown"
                startMonth={new Date(2020, 1)}
                endMonth={new Date(2030, 1)}
                onMonthChange={setMonth}
                //  disabled={disableToday ? (date) => isDateToday(date) : undefined}
                disabled={
                    (date) => {
                        const today = new Date();
                        const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                        const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

                        return disableToday && dateOnly <= todayOnly;
                    }
                }

                weekStartsOn={1}
                showWeekNumber
                classNames={{
                    day: "text-gray-700 hover:bg-blue-100 focus:bg-blue-200",
                    selected: "bg-blue-500 !text-white",
                    weekday: "opacity-80 px-2 py-1 font-medium text-sm text-center uppercase",
                    // today: "",
                    week_number_header: "",
                    // week_number: "",
                    // month_caption: "",
                    nav: "",
                    button_next: "absolute right-0 top-3 text-gray-600 hover:text-gray-800",
                    button_previous: "absolute left-8 top-3 text-gray-600 hover:text-gray-800",
                    month_caption: "flex flex-col items-center justify-between py-2",
                    dropdowns: "flex flex-col items-center justify-between py-2 gap-2",

                }}

                mode="single"
                selected={selectedDate}
                onSelect={handleDayPickerSelect}
                components={{
                    // MonthCaption: CustomMonthHeader,
                    WeekNumberHeader: () => (
                        <th className="opacity-80 px-2 py-1 font-medium text-sm text-center uppercase">
                            V
                        </th>
                    ),
                }}
                footer={showTime ? (
                    <div className="mt-2 space-y-1 flex flex-col justify-center items-center">
                        <div className="flex items-center gap-2">
                            <input
                                type="time"
                                value={time}
                                onChange={handleTimeChange}
                                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                ) : undefined}
            />
        </div>
    );
}

export default ReactDayPicker;
