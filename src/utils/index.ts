import { MONTHS_LIST } from '../constants';

export const extractMonthName = (date: Date): string => {
  const month = MONTHS_LIST[date.getMonth()];
  return month;
};

export const extractYear = (date: Date): number => {
  const year = date.getFullYear();
  return year;
};
