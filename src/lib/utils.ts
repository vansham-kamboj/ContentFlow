
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { setDay, addWeeks, startOfDay } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const dayNameToIndex: { [key: string]: number } = {
  "sunday": 0,
  "monday": 1,
  "tuesday": 2,
  "wednesday": 3,
  "thursday": 4,
  "friday": 5,
  "saturday": 6,
};

export function getDateForDayOfWeek(
  dayName: string,
  targetHour: number = 10, // Default to 10 AM
  targetMinute: number = 0
): [number, number, number, number, number] | null {
  const lowerDayName = dayName.toLowerCase();
  const targetDayIndex = dayNameToIndex[lowerDayName];

  if (targetDayIndex === undefined) {
    console.error(`Invalid day name: ${dayName}`);
    // Fallback to current date and time if day name is invalid
    const now = new Date();
    return [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes()];
  }

  let resultDate = setDay(new Date(), targetDayIndex, { weekStartsOn: 1 /* Monday as start of week */ });
  const today = startOfDay(new Date()); // Compare with start of today

  // If the calculated day is in the past relative to today, move to the next week
  if (startOfDay(resultDate) < today) {
    resultDate = addWeeks(resultDate, 1);
  }
  
  resultDate.setHours(targetHour, targetMinute, 0, 0);

  return [
    resultDate.getFullYear(),
    resultDate.getMonth() + 1, // ics.js months are 1-indexed
    resultDate.getDate(),
    targetHour,
    targetMinute,
  ];
}

// Helper to convert a Date object to YYYYMMDDTHHMMSSZ format
function toUtcGoogleCalendarString(date: Date): string {
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

export function getGoogleCalendarUtcDateTimeStrings(
  dayName: string,
  targetHour: number = 10,
  targetMinute: number = 0,
  durationHours: number = 1
): { startUtc: string; endUtc: string } | null {
  const lowerDayName = dayName.toLowerCase();
  const targetDayIndex = dayNameToIndex[lowerDayName];

  if (targetDayIndex === undefined) {
    console.error(`Invalid day name: ${dayName}`);
    return null;
  }

  let startDate = setDay(new Date(), targetDayIndex, { weekStartsOn: 1 /* Monday as start of week */ });
  const today = startOfDay(new Date());

  if (startOfDay(startDate) < today) {
    startDate = addWeeks(startDate, 1);
  }
  
  startDate.setHours(targetHour, targetMinute, 0, 0); // Sets local time

  const endDate = new Date(startDate.getTime());
  endDate.setHours(startDate.getHours() + durationHours);
  
  return {
    startUtc: toUtcGoogleCalendarString(startDate),
    endUtc: toUtcGoogleCalendarString(endDate),
  };
}
