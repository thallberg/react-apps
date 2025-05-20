import { useEffect, useId, useRef, useState, type ChangeEvent } from "react";
import { format, isValid, longFormatters, parse, setHours, setMinutes } from "date-fns";
import { DayPicker } from "react-day-picker";
import Holidays from "date-holidays";
import "react-day-picker/style.css";

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
    showTime?: boolean;
    showHolidays?: boolean;
    showInput?: boolean;
    countryCode?: Country;
    minDate?: Date;
    maxDate?: Date;
}

export function ReactDayPicker({
    showTime = true,
    showHolidays = true,
    showInput = false,
    countryCode = Country.SWEDEN,
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
    const currentYear = new Date().getFullYear();
    const startMonth = new Date(currentYear - 10, 0);
    const endMonth = new Date(currentYear + 10, 11);

    const disabledDays = [
        ...(minDate ? [{ before: minDate }] : []),
        ...(maxDate ? [{ after: maxDate }] : []),
    ];


    const holidayDates: Date[] = [];
    // !== undefined && countryCode !== null
    if (showHolidays && countryCode !== undefined && countryCode !== null) {
        const countryString = countryMap[countryCode];

        const hd = new Holidays(countryString);
        const year = month.getFullYear();
        const holidays = hd.getHolidays(year).filter((h) => h.type === "public");

        for (let i = 0; i < holidays.length; i++) {
            const index = holidays[i];
            const date = new Date(index.date);
            holidayDates.push(date);
        }

        console.log(countryString);


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
                    startMonth={startMonth}
                    endMonth={endMonth}
                    onMonthChange={setMonth}
                    fixedWeeks={true}
                    weekStartsOn={1}
                    showWeekNumber
                    disabled={disabledDays}
                    classNames={{
                        day: "text-gray-700 hover:bg-blue-100 focus:bg-blue-200 border-2 border-transparent",
                        //day_button: "w-14 h-8",
                        selected: "!bg-blue-500 !text-white border-2 !border-transparent",
                        today: "!border-2 !border-blue-400",
                        weekday: "font-medium text-sm text-center border-b-1 border-blue-200",
                        nav: "",
                        //  shadow-[inset_0_-1px_0_0_rgba(191,219,254,1)]
                        button_next:
                            "absolute right-14 top-3 text-gray-600 hover:text-gray-800",
                        button_previous:
                            "absolute left-18 top-3 text-gray-600 hover:text-gray-800",
                        month_caption: "flex flex-col items-center justify-between py-2",
                        dropdowns: "flex flex-col items-center justify-between py-2 gap-2",
                        month_grid: "border-spacing-1 border-separate",
                        months_dropdown: "hover:text-blue-600",
                       
                        
                    }}
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDayPickerSelect}
                    components={{
                        // MonthCaption: CustomMonthHeader,
                        WeekNumberHeader: () => (
                            <th className="opacity-80 px-2 py-1 font-medium text-sm text-center uppercase shadow-[inset_0_-1px_0_0_rgba(191,219,254,1)]">
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

export default ReactDayPicker;