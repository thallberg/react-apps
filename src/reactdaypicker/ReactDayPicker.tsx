import { useEffect, useId, useMemo, useRef, useState, type ChangeEvent } from "react";
import { format, isValid, parse, setHours, setMinutes } from "date-fns";
import { DayPicker } from "react-day-picker";
import Holidays from "date-holidays";
import "react-day-picker/style.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export enum Country {
    SWEDEN = 0,
    NORWAY = 1,
    GERMANY = 2,
    FINLAND = 3,
    UNITED_KINGDOM = 4,
    SOUTH_KOREA = 5,
    DENMARK = 6,
}

const countryMap: Record<Country, string> = {
    [Country.DENMARK]: "dk",
    [Country.FINLAND]: "fi",
    [Country.GERMANY]: "de",
    [Country.NORWAY]: "no",
    [Country.SOUTH_KOREA]: "kr",
    [Country.SWEDEN]: "se",
    [Country.UNITED_KINGDOM]: "gb",
};

interface ReactdaypickerProps {
    defaultValue?: Date;
    onChange?: (date: Date | undefined) => void;

    showTime?: boolean;
    showHolidays?: boolean;
    showInput?: boolean;
    countryCode?: Country;
    minDate?: Date;
    maxDate?: Date;
}

export function ReactDayPicker({
    defaultValue,
    onChange,
    showTime = true,
    showHolidays = true,
    showInput = false,
    countryCode = Country.SWEDEN,
    minDate,
    maxDate,
}: ReactdaypickerProps) {
    const inputId = useId();
    const [month, setMonth] = useState(defaultValue ?? new Date());
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(defaultValue);
    const [inputValue, setInputValue] = useState<string>(
        defaultValue ? format(defaultValue, showTime ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd") : ""
    );
    const [time, setTime] = useState<string>(
        defaultValue ? format(defaultValue, "HH:mm") : "12:00"
    );
    const formatString = showTime ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd";
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const currentYear = new Date().getFullYear();
    const startMonth = new Date(currentYear - 10, 0);
    const endMonth = new Date(currentYear + 10, 11);

    const disabledDays = useMemo(() => [
        ...(minDate ? [{ before: minDate }] : []),
        ...(maxDate ? [{ after: maxDate }] : []),
    ], [minDate, maxDate]);

    const holidayDates = useMemo(() => {
        if (!showHolidays || countryCode === undefined) return [];

        const countryString = countryMap[countryCode];
        const hd = new Holidays(countryString);
        const year = month.getFullYear();
        const holidays = hd.getHolidays(year).filter((holiday) => holiday.type === "public");

        const dates: Date[] = [];
        holidays.forEach((holiday) => {
            const date = new Date(holiday.date);
            dates.push(date);
        });

        return dates;
    }, [showHolidays, countryCode, month]);

    const updateDateWithTime = (date: Date, timeStr: string): Date => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        return setMinutes(setHours(date, hours), minutes);
    };

    const notifyParent = (date: Date | undefined) => {
        onChange?.(date);
    };

    const handleInputClick = () => {
        setIsOpen(true);
    };

    const handleDayPickerSelect = (date: Date | undefined) => {
        if (!date) {
            setInputValue("");
            setSelectedDate(undefined);
            notifyParent(undefined);
        } else {
            const updated = showTime ? updateDateWithTime(date, time) : date;
            setSelectedDate(updated);
            setMonth(updated);
            setInputValue(format(updated, formatString));
            setIsOpen(false);
            notifyParent(updated);
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
            notifyParent(updated);
        } else {
            setSelectedDate(undefined);
            notifyParent(undefined);
        }
    };

    const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newTime = e.target.value;
        setTime(newTime);

        if (selectedDate && isValid(selectedDate)) {
            const updated = updateDateWithTime(selectedDate, newTime);
            setSelectedDate(updated);
            setInputValue(format(updated, formatString));
            notifyParent(updated);
        }
    };

    return (
        <div ref={containerRef} className="relative w-fit">
            {showInput && (
                <input
                    id={inputId}
                    type="text"
                    value={inputValue}
                    placeholder="Enter date"
                    onChange={handleInputChange}
                    onClick={handleInputClick}
                    className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            )}
            {(isOpen || !showInput) && (
                <div className="absolute top-full left-0 z-10 mt-2">
                    <div className="flex justify-between items-center px-2 mb-1">
                        <button >
                            <FaChevronLeft className="text-blue-600 hover:text-blue-800" />
                        </button>
                        <button >
                            <FaChevronRight className="text-blue-600 hover:text-blue-800" />
                        </button>
                    </div>
                    <DayPicker
                        month={month}
                        modifiers={{ holiday: holidayDates }}
                        modifiersClassNames={{
                            holiday: "bg-red-100 text-red-700 font-semibold",
                        }}
                        captionLayout="dropdown"
                        startMonth={startMonth}
                        endMonth={endMonth}
                        onMonthChange={setMonth}
                        showOutsideDays={true}
                        weekStartsOn={1}
                        disabled={disabledDays}
                        classNames={{
                            day: "text-gray-700 hover:bg-blue-100 focus:bg-blue-200 border-2 border-transparent",
                            selected: "!bg-blue-500 !text-white border-2 !border-transparent",
                            today: "!border-2 !border-blue-400",
                            weekday: "font-medium text-sm text-center border-b-1 border-blue-200",
                            nav: "",
                            outside: "text-gray-400",
                            button_previous: "hidden",
                            button_next: "hidden",
                            month_caption: "flex flex-col items-center justify-between py-2",
                            dropdowns: "flex flex-col items-center justify-between py-2 gap-2",
                            month_grid: "border-spacing-1 border-separate",
                            months: "flex flex-col items-center justify-between",
                        }}
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDayPickerSelect}
                        components={{
                            WeekNumberHeader: () => (
                                <th className="opacity-80 px-2 py-1 font-medium text-sm text-center uppercase shadow-[inset_0_-1px_0_0_rgba(191,219,254,1)]">
                                    V
                                </th>
                            ),
                        }}
                        footer={
                            showTime ? (
                                <div className="mt-6 flex flex-col items-center space-y-1">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="time"
                                            value={time}
                                            onChange={handleTimeChange}
                                            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            ) : undefined
                        }
                    />
                </div>
            )}
        </div>
    );
}

export default ReactDayPicker;

// import { useEffect } from "react";

// export function useOutsideClick<T extends HTMLElement>(
//   ref: React.RefObject<T>,
//   handler: (event: Event) => void
// ) {
//   useEffect(() => {
//     const listener = (event: Event) => {
//       if (!ref.current || ref.current.contains(event.target as Node)) {
//         return;
//       }
//       handler(event);
//     };

//     document.addEventListener("mousedown", listener);
//     document.addEventListener("touchstart", listener); // extra support för mobil
//     return () => {
//       document.removeEventListener("mousedown", listener);
//       document.removeEventListener("touchstart", listener);
//     };
//   }, [ref, handler]);
// }
