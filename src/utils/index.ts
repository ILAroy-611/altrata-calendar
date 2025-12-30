import { DATE_REGEX, MONTHS_LIST } from '../constants';

// This function will help to get name of the month from input date string
export const extractMonthName = (date: Date): string => {
  const month = MONTHS_LIST[date.getMonth()];
  return month;
};

// This function will help to get year from input date string
export const extractYear = (date: Date): number => {
  const year = date.getFullYear();
  return year;
};

// This function will help to get starting week-day of the month from input date string
export const extractStartingWeekdayOfMonth = (date: Date): number => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const weekdayIndex = firstDayOfMonth.getDay();
  return weekdayIndex;
};

// This function will help to get total days of month
export const getTotalDaysInMonth = (date: Date) => {
  const totalDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  return totalDays;
};

// This function will generate calendar data
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

// This function will parse input date string to valid Date object
export const parseDateString = (dateString: string | undefined | null) => {
  // destructuring input date string
  const [day, month, year] =
    dateString !== undefined && dateString !== null
      ? dateString.split('/').map((item) => Number(item))
      : [];

  // conversion to Date object
  const formattedDate = new Date(year, month - 1, day);

  // checking if converted date is real or not
  const isRealDate =
    formattedDate.getFullYear() === year &&
    formattedDate.getMonth() === month - 1 &&
    formattedDate.getDate() === day;

  return isRealDate ? formattedDate : null;
};

// This function will validate the input date string
export const isDateStringValid = (input: string | undefined | null) => {
  // checking invalid value
  if (input === undefined || input === null) return false;

  // checking invalid format
  if (!DATE_REGEX.test(input)) {
    return false;
  }
  // checking invalid date in correct format
  return parseDateString(input) !== null;
};
