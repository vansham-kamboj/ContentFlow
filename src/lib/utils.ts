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
