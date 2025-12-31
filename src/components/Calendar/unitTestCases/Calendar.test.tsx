import { render, screen } from '@testing-library/react';
import Calendar from '../Calendar';

describe('Calendar', () => {
  describe('valid date input', () => {
    it('should render the component with valid date', () => {
      render(<Calendar inputDate="03/10/2022" />);
    });
    it('should validate the input date string', () => {
      render(<Calendar inputDate="03/10/2022" />);

      const mockIsDateStringValid = jest.fn();
      expect(mockIsDateStringValid).toHaveBeenCalledWith('03/10/2022');
    });
    it('should parse the date string when valid', () => {
      render(<Calendar inputDate="04/05/2020" />);

      const mockParseDateString = jest.fn();
      expect(mockParseDateString).toHaveBeenCalledWith('04/05/2020');
    });
    it('should display the calendar header with correct month and year', () => {
      render(<Calendar inputDate="31/11/2025" />);

      const mockExtractMonthName = jest.fn();
      expect(mockExtractMonthName).toHaveBeenCalled();

      const mockExtractYear = jest.fn();
      expect(mockExtractYear).toHaveBeenCalled();

      expect(screen.getByText(/December 2025/i)).toBeInTheDocument();
    });
    it('should display weekday headers', () => {
      render(<Calendar inputDate="11/07/1997" />);

      const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      weekdays.forEach((day) => {
        expect(screen.getByText(day)).toBeInTheDocument();
      });
    });
    it('should render all date cells from generateCalendarRows', () => {
      render(<Calendar inputDate="31/11/2025" />);

      const mockGenerateCalendarRows = jest.fn();
      expect(mockGenerateCalendarRows).toHaveBeenCalled();

      for (let i = 1; i <= 31; i++) {
        expect(screen.getByText(i.toString())).toBeInTheDocument();
      }
    });
  });

  describe('invalid date input', () => {
    it('should render error message for invalid date', () => {
      render(<Calendar inputDate="invalid-date" />);

      expect(
        screen.getByText(/Please provide correct date string in the format - DD\/MM\/YYYY/i)
      ).toBeInTheDocument();
    });
    it('should validate various invalid date formats', () => {
      const invalidDates = ['invalid', '32/13/2022', '00/00/0000', 'abc/def/ghij', ''];

      const mockIsDateStringValid = jest.fn();
      invalidDates.forEach((invalidDate) => {
        mockIsDateStringValid.mockReturnValue(false);
        render(<Calendar inputDate={invalidDate} />);

        expect(mockIsDateStringValid).toHaveBeenCalledWith(invalidDate);
        expect(
          screen.getByText(/Please provide correct date string in the format - DD\/MM\/YYYY/i)
        ).toBeInTheDocument();
      });
    });
  });
});
