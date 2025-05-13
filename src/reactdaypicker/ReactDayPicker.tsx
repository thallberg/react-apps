import { useId, useState, type ChangeEvent } from "react";
import { format, isValid, parse, setHours, setMinutes } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

// Definiera ett interface för komponentens props
interface ReactdaypickerProps {
    showTime?: boolean; // Bestämmer om tiden ska visas i inputfältet
}

/** Render an input field bound to a DayPicker calendar. */
export function Reactdaypicker({ showTime = false }: ReactdaypickerProps) {
    const inputId = useId();

    // Hold the month in state to control the calendar when the input changes
    const [month, setMonth] = useState(new Date());

    // Hold the selected date in state
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

    // Hold the input value in state
    const [inputValue, setInputValue] = useState<string>("");
    const [time, setTime] = useState<string>("12:00");

    const formatString = showTime ? "MM/dd/yyyy HH:mm" : "MM/dd/yyyy"; // Date format with or without time

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

    const updateDateWithTime = (date: Date, timeStr: string): Date => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        return setMinutes(setHours(date, hours), minutes);
    };

    return (
        <div>
            <label htmlFor={inputId}>
                <strong>Date: </strong>
            </label>
            <input
                style={{ fontSize: "inherit" }}
                id={inputId}
                type="text"
                value={inputValue}
                placeholder={formatString}
                onChange={handleInputChange}
            />
            <DayPicker
                month={month}
                onMonthChange={setMonth}
                mode="single"
                selected={selectedDate}
                onSelect={handleDayPickerSelect}
                footer={
                    showTime ? (
                        <div className="mt-2 space-y-1 text-sm text-gray-700">
                            {selectedDate ? (
                                <p>Selected: {selectedDate.toString()}</p>
                            ) : (
                                <p>No date selected</p>
                            )}
                            <div className="flex items-center gap-2">
                                <label htmlFor="time" className="text-sm font-medium">
                                    Time:
                                </label>
                                <input
                                    id="time"
                                    type="time"
                                    value={time}
                                    onChange={handleTimeChange}
                                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                                />
                            </div>
                        </div>
                    ) : undefined
                }
            />
        </div>
    );
}

export default Reactdaypicker;
