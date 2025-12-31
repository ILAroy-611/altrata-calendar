import { render, screen } from '@testing-library/react';
import Calendar from '../Calendar';

import {
  isDateStringValid,
  parseDateString,
  extractMonthName,
  extractYear,
  generateCalendarRows,
} from '../../../utils';

jest.mock('../../../utils', () => ({
  isDateStringValid: jest.fn(),
  parseDateString: jest.fn(),
  extractMonthName: jest.fn(),
  extractYear: jest.fn(),
  generateCalendarRows: jest.fn(),
}));

describe('Calendar', () => {
  describe('valid date input', () => {
    it('should render the component with valid date', () => {
      render(<Calendar inputDate="03/10/2022" />);
    });
    it('should validate the input date string', () => {
      (isDateStringValid as jest.Mock).mockReturnValue(true);
      (parseDateString as jest.Mock).mockReturnValue(new Date(2022, 9, 3));

      (generateCalendarRows as jest.Mock).mockReturnValue([1, 2, 3, 4, 5]);

      render(<Calendar inputDate="03/10/2022" />);

      expect(isDateStringValid).toHaveBeenCalledWith('03/10/2022');
    });

    it('should parse the date string when valid', () => {
      (isDateStringValid as jest.Mock).mockReturnValue(true);
      (parseDateString as jest.Mock).mockReturnValue(new Date(2022, 9, 3));

      (generateCalendarRows as jest.Mock).mockReturnValue([1, 2, 3, 4, 5]);

      render(<Calendar inputDate="04/05/2020" />);

      expect(parseDateString).toHaveBeenCalledWith('04/05/2020');
    });
    it('should display the calendar header with correct month and year', () => {
      (isDateStringValid as jest.Mock).mockReturnValue(true);
      (parseDateString as jest.Mock).mockReturnValue(new Date(2022, 9, 3));

      (generateCalendarRows as jest.Mock).mockReturnValue([1, 2, 3, 4, 5]);

      (extractMonthName as jest.Mock).mockReturnValue('November');
      (extractYear as jest.Mock).mockReturnValue(2025);

      render(<Calendar inputDate="31/11/2025" />);

      expect(extractMonthName).toHaveBeenCalled();
      expect(extractYear).toHaveBeenCalled();
      expect(screen.getByText(/November 2025/i)).toBeInTheDocument();
    });

    it('should display weekday headers', () => {
      (isDateStringValid as jest.Mock).mockReturnValue(true);
      (parseDateString as jest.Mock).mockReturnValue(new Date(1997, 6, 11));
      (generateCalendarRows as jest.Mock).mockReturnValue([1, 2, 3]);

      render(<Calendar inputDate="11/07/1997" />);

      const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

      weekdays.forEach((day) => {
        expect(screen.getByText(day)).toBeInTheDocument();
      });
    });

    it('should render all date cells from generateCalendarRows', () => {
      (isDateStringValid as jest.Mock).mockReturnValue(true);
      (parseDateString as jest.Mock).mockReturnValue(new Date(2025, 10, 31));

      (generateCalendarRows as jest.Mock).mockReturnValue(
        [null, null, 1, 2, 3, 4, 5, 6] // etc — sample data
      );

      render(<Calendar inputDate="31/11/2025" />);

      expect(generateCalendarRows).toHaveBeenCalled();
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });

  describe('invalid date input', () => {
    it('should render error message for invalid date format', () => {
      render(<Calendar inputDate="invalid-date" />);

      expect(
        screen.getByText(/Please provide correct date string in the format - DD\/MM\/YYYY/i)
      ).toBeInTheDocument();
    });

    it('should validate various invalid date formats', () => {
      const invalidDates = ['invalid', '32/13/2022', '00/00/0000', 'abc/def/ghij', ''];

      invalidDates.forEach((invalidDate) => {
        (isDateStringValid as jest.Mock).mockReturnValue(false);

        render(<Calendar inputDate={invalidDate} />);

        expect(isDateStringValid).toHaveBeenCalledWith(invalidDate);

        const errors = screen.getAllByText(
          /Please provide correct date string in the format - DD\/MM\/YYYY/i
        );

        expect(errors.length).toBeGreaterThan(0);
      });
    });
  });
});
