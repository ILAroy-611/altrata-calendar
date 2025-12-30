import { MONTHS_LIST } from '../constants';

export const extractMonthName = (date: Date): string => {
  const month = MONTHS_LIST[date.getMonth()];
  return month;
};

export const extractYear = (date: Date): number => {
  const year = date.getFullYear();
  return year;
};

export const extractStartingWeekdayOfMonth = (date: Date): number => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const weekdayIndex = firstDayOfMonth.getDay();
  return weekdayIndex;
};

export const getTotalDaysInMonth = (date: Date) => {
  const totalDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  return totalDays;
};

export const generateCalendarRows = (date: Date) => {
  const startingWeekdayIndex = extractStartingWeekdayOfMonth(date);
  const totalDays = getTotalDaysInMonth(date);
  let startingDate = 1;
  let result = [];
  for (let i = 0; i <= startingWeekdayIndex; i++) {
    if (i === startingWeekdayIndex) {
      for (let j = startingDate; j <= totalDays; j++) {
        result.push(j);
      }
    } else {
      result.push(null);
    }
  }
  return result;
};
