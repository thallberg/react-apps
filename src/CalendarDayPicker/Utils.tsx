import { setHours, setMinutes } from "date-fns";
import Holidays from "date-holidays";

export const updateDateWithTime = (date: Date, timeStr: string): Date => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return setMinutes(setHours(date, hours), minutes);
};

export const getSwedishHolidays = (year: number): Date[] => {
  const hd = new Holidays("se");
  return hd
    .getHolidays(year)
    .filter((h) => h.type === "public")
    .map((h) => new Date(h.date))
    .filter((date) => !isNaN(date.getTime()));
};
