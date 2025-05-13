import { useId, useState, type ChangeEvent } from "react";
import { format, isValid, parse, setHours, setMinutes } from "date-fns";
import {  DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface ReactdaypickerProps {
    showTime?: boolean;
}


export function Reactdaypicker({ showTime = true }: ReactdaypickerProps) {
    const inputId = useId();
    const [month, setMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [inputValue, setInputValue] = useState<string>("");
    const [time, setTime] = useState<string>("12:00");
    const formatString = showTime ? "MM/dd/yyyy HH:mm" : "MM/dd/yyyy";

    const handleDayPickerSelect = (date: Date | undefined) => {
        if (!date) {
            setInputValue("");
            setSelectedDate(undefined);
        } else {
            const updated = showTime ? updateDateWithTime(date, time) : date;
            setSelectedDate(updated);
            setMonth(updated); // Uppdatera månaden här
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
            setMonth(updated); // Uppdatera månaden här också
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

    const updateDateWithTime = (date: Date, timeStr: string): Date => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        return setMinutes(setHours(date, hours), minutes);
    };

    // const CustomMonthHeader = ({ month, onNextMonth, onPreviousMonth }: any) => {
    //     const validMonth = isValid(month) ? month : new Date();
    //     const monthName = format(validMonth, "MMMM");

    //     return (
    //         <div className="flex justify-between items-center py-2">
    //             <button
    //                 onClick={onPreviousMonth}
    //                 className="text-gray-600 hover:text-gray-800 text-xl"
    //             >
    //                 {`<`}
    //             </button>
    //             <span className="text-lg font-semibold">{monthName}</span>


    //             <button
    //                 onClick={onNextMonth}
    //                 className="text-gray-600 hover:text-gray-800 text-xl"
    //             >
    //                 {`>`}
    //             </button>
    //         </div>
    //     );
    // };

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
                captionLayout="dropdown"
                startMonth={new Date(2020, 1)}
                endMonth={new Date(2030, 1)}
                onMonthChange={setMonth}
               
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

export default Reactdaypicker;
