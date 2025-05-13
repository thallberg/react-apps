import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ReactDatePicker.css"
import { getYear, getMonth } from "date-fns";

// Definiera ett interface för komponentens props
interface ReactDatePickerProps {
    initialDate?: Date; // Startdatum (kan vara valfritt, annars dagens datum)
    showTimeInputField?: boolean; // Om tidsinputfältet ska visas eller inte (kan vara valfritt)
}

export function ReactDatePicker({
    initialDate = new Date(),
    showTimeInputField = true, // Standard till true om inte specificerat
}: ReactDatePickerProps) {
    const [startDate, setStartDate] = useState<Date>(initialDate);
    const [timeValue, setTimeValue] = useState<string>(`${initialDate.getHours()}:${initialDate.getMinutes()}`);

    // Beräkna 5 år före och 5 år efter det aktuella året
    const currentYear = getYear(new Date());
    // Hjälpfunktion för att skapa ett intervall med år
    const range = (start: number, end: number, step: number) => {
        let result = [];
        for (let i = start; i <= end; i += step) {
            result.push(i);
        }
        return result;
    };

    const years = range(currentYear - 5, currentYear + 5, 1); // Skapar en lista från 5 år före till 5 år efter det nuvarande året

    const months = [
        "January", "February", "March", "April", "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    // Custom Time Input komponent med rullgardinsmeny för timmar och minuter
 const ExampleCustomTimeInput = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
    const hours = Array.from({ length: 24 }, (_, index) => index.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, index) => index.toString().padStart(2, '0'));

    const handleChangeTime = (part: 'hours' | 'minutes', newValue: string) => {
        const [hours, minutes] = value.split(":");
        const newTime = part === 'hours' ? `${newValue}:${minutes}` : `${hours}:${newValue}`;
        onChange(newTime);
    };

        return (
            <div className="space-x-2 mt-2">
                {/* Rullgardinsmeny för timmar */}
                <select
                    value={value.split(":")[0]}
                    onChange={(e) => handleChangeTime('hours', e.target.value)}
                    className="px-2 py-1 border rounded"
                >
                    {hours.map((hour) => (
                        <option key={hour} value={hour}>
                            {hour}
                        </option>
                    ))}
                </select>

                {/* Rullgardinsmeny för minuter */}
                <select
                    value={value.split(":")[1]}
                    onChange={(e) => handleChangeTime('minutes', e.target.value)}
                    className="px-2 py-1 border rounded"
                >
                    {minutes.map((minute) => (
                        <option key={minute} value={minute}>
                            {minute}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center">
            <DatePicker
                selected={startDate}
                shouldCloseOnSelect={false}
                showWeekNumbers={true}
                weekLabel="V"
                onChange={(date: Date | null) => date && setStartDate(date)}
                customInput={<input className="p-2 border rounded" />}
                showTimeInput={showTimeInputField} // Visa eller dölja tidsfältet beroende på props
                customTimeInput={showTimeInputField ? (
                    <ExampleCustomTimeInput value={timeValue} onChange={setTimeValue} />
                ) : <div />} // Säkerställ att vi alltid returnerar ett element
                renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled
                }) => (
                    <div className="flex flex-col items-center space-y-2 py-2">
                        {/* Månadsväljare på en egen rad med pilar */}
                        <div className="flex items-center space-x-2">
                            <button
                                className="px-2 py-1 bg-gray-200 rounded"
                                onClick={() => changeMonth(getMonth(date) - 1)}
                                disabled={prevMonthButtonDisabled}
                            >
                                {"<"}
                            </button>
                            <select
                                value={months[getMonth(date)]}
                                onChange={({ target: { value } }) =>
                                    changeMonth(months.indexOf(value))
                                }
                                className="p-1 border rounded"
                            >
                                {months.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <button
                                className="px-2 py-1 bg-gray-200 rounded"
                                onClick={() => changeMonth(getMonth(date) + 1)}
                                disabled={nextMonthButtonDisabled}
                            >
                                {">"}
                            </button>
                        </div>

                        {/* Årväljare med pilar */}
                        <div className="flex items-center space-x-2">
                            <button
                                className="px-2 py-1 bg-gray-200 rounded"
                                onClick={() => changeYear(getYear(date) - 1)}
                            >
                                {"<"}
                            </button>
                            <select
                                value={getYear(date)}
                                onChange={({ target: { value } }) => changeYear(Number(value))}
                                className="p-1 border rounded"
                            >
                                {years.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <button
                                className="px-2 py-1 bg-gray-200 rounded"
                                onClick={() => changeYear(getYear(date) + 1)}
                            >
                                {">"}
                            </button>
                        </div>
                    </div>
                )}
            />
        </div>
    );
}

export default ReactDatePicker;
