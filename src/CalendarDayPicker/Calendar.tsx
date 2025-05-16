import { DayPicker } from "react-day-picker";

interface CalendarProps {
  month: Date;
  holidayDates: Date[];
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  onMonthChange: (month: Date) => void;
  showTime?: boolean;
  time?: string;
  onTimeChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Calendar({
  month,
  holidayDates,
  selected,
  onSelect,
  onMonthChange,
  showTime = false,
  time,
  onTimeChange,
}: CalendarProps) {
  return (
    <DayPicker
      month={month}
      modifiers={{ holiday: holidayDates }}
      modifiersClassNames={{
        holiday: "bg-red-100 text-red-700 font-semibold",
      }}
      captionLayout="dropdown"
      startMonth={new Date(2020, 1)}
      endMonth={new Date(2030, 1)}
      onMonthChange={onMonthChange}
      weekStartsOn={1}
      showWeekNumber
      classNames={{
        day: "text-gray-700 hover:bg-blue-100 focus:bg-blue-200",
        selected: "bg-blue-500 !text-white",
        weekday:
          "opacity-80 px-2 py-1 font-medium text-sm text-center uppercase",
        week_number_header: "",
        button_next:
          "absolute right-14 top-3 text-gray-600 hover:text-gray-800",
        button_previous:
          "absolute left-18 top-3 text-gray-600 hover:text-gray-800",
        month_caption: "flex flex-col items-center justify-between py-2",
        dropdowns: "flex flex-col items-center justify-between py-2 gap-2",
      }}
      mode="single"
      selected={selected}
      onSelect={onSelect}
      components={{
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
                onChange={onTimeChange}
                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ) : undefined
      }
    />
  );
}
