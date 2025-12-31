import {
  extractMonthName,
  extractStartingWeekdayOfMonth,
  extractYear,
  generateCalendarRows,
  getTotalDaysInMonth,
  isDateStringValid,
  parseDateString,
} from '.';
import { WEEKDAYNAME_LIST } from '../constants';

describe('Date Utils Tests', () => {
  describe('should return correct month name', () => {
    it('should return correct month name for January', () => {
      expect(extractMonthName(new Date(2022, 0, 1))).toBe('January');
    });
    it('should return correct month name for December', () => {
      expect(extractMonthName(new Date(2025, 11, 1))).toBe('December');
    });
    it('should return correct month name for August', () => {
      expect(extractMonthName(new Date(1879, 7, 1))).toBe('August');
    });
  });

  describe('should return correct year', () => {
    it('should return correct year 2022', () => {
      expect(extractYear(new Date(2022, 9, 3))).toBe(2022);
    });
    it('should return correct year 1823', () => {
      expect(extractYear(new Date(1823, 11, 4))).toBe(1823);
    });
    it('should return correct year 1989', () => {
      expect(extractYear(new Date(1989, 4, 20))).toBe(1989);
    });
  });

  describe('should return correct total days of a given month', () => {
    it('should return 30 for April', () => {
      expect(getTotalDaysInMonth(new Date(2024, 3, 17))).toBe(30);
    });

    it('should return 31 for December', () => {
      expect(getTotalDaysInMonth(new Date(2025, 11, 20))).toBe(31);
    });

    it('should return 28 for February in non-leap year', () => {
      expect(getTotalDaysInMonth(new Date(2023, 1, 12))).toBe(28);
    });

    it('should return 29 for February in leap year', () => {
      expect(getTotalDaysInMonth(new Date(2020, 1, 23))).toBe(29);
    });
  });

  describe('should return correct first week day of the given month', () => {
    it('should return Friday as first week day for 21 June 1996', () => {
      const firstWeekdayIndex = extractStartingWeekdayOfMonth(new Date(1996, 5, 21));
      expect(WEEKDAYNAME_LIST[firstWeekdayIndex]).toBe('Sa');
    });

    it('should return Tuesday as first week day for 11 February 1992', () => {
      const firstWeekdayIndex = extractStartingWeekdayOfMonth(new Date(1992, 10, 11));
      expect(WEEKDAYNAME_LIST[firstWeekdayIndex]).toBe('Su');
    });
  });

  describe('should validate given date string', () => {
    it('should return false for invalid date string - 30/30/1920', () => {
      expect(isDateStringValid('30/30/1920')).toBe(false);
    });
    it('should return false for invalid date string - 30/02/1920', () => {
      expect(isDateStringValid('30/02/1920')).toBe(false);
    });
    it('should return false for null date string', () => {
      expect(isDateStringValid(null)).toBe(false);
    });
    it('should return false for undefined date string', () => {
      expect(isDateStringValid(undefined)).toBe(false);
    });
    it('should return false for invalid string', () => {
      expect(isDateStringValid('any date')).toBe(false);
    });
    it('should return true for valid date string - 15/07/1945', () => {
      expect(isDateStringValid('15/07/1945')).toBe(true);
    });
    it('should return false for invalid date string format- 2/9/1840', () => {
      expect(isDateStringValid('2/9/1840')).toBe(false);
    });
  });

  describe('should parse given date string', () => {
    it('should return correct date for 08/04/1976', () => {
      expect(parseDateString('08/04/1976')).toStrictEqual(new Date(1976, 3, 8));
    });
    it('should return null for any random string passed as date string', () => {
      expect(parseDateString('any date')).toBe(null);
    });
    it('should return null for date string in incorrect date format', () => {
      expect(parseDateString('31/2/1789')).toBe(null);
    });
    it('should return null for the date string which is not real', () => {
      expect(parseDateString('32/02/1699')).toBe(null);
    });
  });

  describe('should generate calendar data', () => {
    it('should generate correct padded array for June 1996', () => {
      const days = generateCalendarRows(new Date(1996, 5, 21)); // June 21 1996

      expect(days.length).toBe(36);

      // checking if day 1 is starting on Saturday
      expect(days[6]).toBe(1);

      // checking for null values before first day
      expect(days.slice(0, 6)).toEqual([null, null, null, null, null, null]);

      // checking total days in the month of June to be 30
      expect(days.filter((day) => day !== null).length).toBe(30);
    });
    it('should handle leap year February correctly', () => {
      const days = generateCalendarRows(new Date(2024, 1, 10));

      expect(days.length).toBe(33);
      // checking total days in the leap year February to be 29
      expect(days.filter((day) => day !== null).length).toBe(29);
    });
    it('should return the exact calendar grid for June 1996', () => {
      const days = generateCalendarRows(new Date(1996, 5, 10));
      expect(days).toEqual([
        null,
        null,
        null,
        null,
        null,
        null,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
      ]);
    });
  });
});
