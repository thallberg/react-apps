import React, { useEffect, useId, useRef, useState, type ChangeEvent } from "react";
import { format, isValid, parse, setHours, setMinutes, startOfDay } from "date-fns";
import { DayPicker } from "react-day-picker";
import Holidays from "date-holidays";
import "react-day-picker/style.css";
import { addDays, startOfToday } from "date-fns";
 const today = startOfDay();

 export const OnlyFuture: Story = {
  args: {
    minDate: addDays(today, 1),
    maxDate: addDays(today, 30),
  },
};

interface ReactdaypickerProps {
    showTime?: boolean;
    showHolidays?: boolean;
    showInput?: boolean;
    countryCode?: string;
    minDate?: Date;
    maxDate?: Date;
}

export function ReactDayPicker({
    showTime = true,
    showHolidays = true,
    showInput = true,
    countryCode = "no",
    minDate,
    maxDate
}: ReactdaypickerProps) {
    const inputId = useId();
    const [month, setMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [inputValue, setInputValue] = useState<string>("");
    const [time, setTime] = useState<string>("12:00");
    const formatString = showTime ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd";
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const disabledDays = [
        ...(minDate ? [{ before: minDate }] : []),
        ...(maxDate ? [{ after: maxDate }] : []),
    ];

    const holidayDates: Date[] = [];
    if (showHolidays && countryCode) {
        const hd = new Holidays(countryCode);
        const year = month.getFullYear();
        const holidays = hd.getHolidays(year).filter((h) => h.type === "public");

        for (let i = 0; i < holidays.length; i++) {
            const index = holidays[i];
            const date = new Date(index.date);
            holidayDates.push(date);
        }
    }

    const updateDateWithTime = (date: Date, timeStr: string): Date => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        return setMinutes(setHours(date, hours), minutes);
    };

    const handleInputClick = () => {
        setIsOpen(true);
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
            setIsOpen(false);
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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
                <DayPicker
                    month={month}
                    modifiers={{
                        holiday: holidayDates,
                    }}
                    modifiersClassNames={{
                        holiday: "bg-red-100 text-red-700 font-semibold",
                    }}
                    captionLayout="dropdown"
                    startMonth={new Date(2020, 1)}
                    endMonth={new Date(2030, 1)}
                    onMonthChange={setMonth}
                    weekStartsOn={1}
                    showWeekNumber
                    disabled={disabledDays}
                    classNames={{
                        day: "text-gray-700 hover:bg-blue-100 focus:bg-blue-200",
                        selected: "bg-blue-500 !text-white",
                        weekday:
                            "opacity-80 px-2 py-1 font-medium text-sm text-center uppercase",
                        // today: "",
                        week_number_header: "",
                        // week_number: "",
                        // month_caption: "",
                        nav: "",
                        button_next:
                            "absolute right-14 top-3 text-gray-600 hover:text-gray-800",
                        button_previous:
                            "absolute left-18 top-3 text-gray-600 hover:text-gray-800",
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
                    footer={
                        showTime ? (
                            <div className="mt-6 space-y-1 flex flex-col justify-center items-center">
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
            )}
        </div>
    );
}

