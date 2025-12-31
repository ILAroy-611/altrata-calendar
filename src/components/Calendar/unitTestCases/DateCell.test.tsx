import { render, screen } from '@testing-library/react';
import DateCell from '../DateCell';

describe('Date Cell', () => {
  describe('render component with props', () => {
    it('renders date cell component', () => {
      render(<DateCell day={15} isHighlighted={false} type="date" />);

      const dayElement = screen.getByTestId('date-cell');
      expect(dayElement).toBeInTheDocument();
    });
    it('displays the correct day number', () => {
      render(<DateCell day={15} isHighlighted={false} type="date" />);

      expect(screen.getByText('15')).toBeInTheDocument();
    });
    it('renders different day numbers correctly', () => {
      const days = [5, 11, 22, 28, 31];

      days.forEach((day) => {
        render(<DateCell day={day} isHighlighted={false} type="date" />);
      });
      days.forEach((day) => {
        expect(screen.getByText(day.toString())).toBeInTheDocument();
      });
    });
    it('renders empty content when day is null', () => {
      render(<DateCell day={null} isHighlighted={false} type="date" />);

      expect(screen.queryByText(/\d+/)).not.toBeInTheDocument();
    });
  });

  describe('highlighting behavior', () => {
    it('should apply highlighted styling when isHighlighted prop is true', () => {
      render(<DateCell day={15} isHighlighted={true} type="date" />);

      const dayElement = screen.getByTestId('date-cell');
      expect(dayElement).toBeInTheDocument();
      expect(dayElement.className).toContain('bg-green-500');
    });
    it('should not apply highlighted styling when isHighlighted is false', () => {
      render(<DateCell day={20} isHighlighted={false} type="date" />);

      const dayElement = screen.getByTestId('date-cell');
      expect(dayElement).toBeInTheDocument();
      expect(dayElement.className).not.toContain('bg-green-500');
    });
    it('should apply bold font when isHighlighted is true', () => {
      render(<DateCell day={7} isHighlighted={true} type="date" />);

      const dayElement = screen.getByTestId('date-cell');
      expect(dayElement).toBeInTheDocument();
      expect(dayElement.className).toContain('font-bold');
    });
    it('should apply normal font when isHighlighted is false', () => {
      render(<DateCell day={19} isHighlighted={false} type="date" />);

      const dayElement = screen.getByTestId('date-cell');
      expect(dayElement).toBeInTheDocument();
      expect(dayElement.className).toContain('font-normal');
    });
  });

  describe('background color by type', () => {
    it('should apply gray background for normal date cells', () => {
      render(<DateCell day={22} isHighlighted={false} type="date" />);

      const dayElement = screen.getByTestId('date-cell');
      expect(dayElement).toBeInTheDocument();
      expect(dayElement.className).toContain('bg-gray-500');
    });
    it('should apply blue background for week type cells', () => {
      render(<DateCell day={'Su'} isHighlighted={false} type="week" />);

      const dayElement = screen.getByTestId('date-cell');
      expect(dayElement).toBeInTheDocument();
      expect(dayElement.className).toContain('bg-blue-300');
    });
    it('should apply light gray background when day is null', () => {
      render(<DateCell day={null} isHighlighted={false} type="week" />);

      const dayElement = screen.getByTestId('date-cell');
      expect(dayElement).toBeInTheDocument();
      expect(dayElement?.className).toContain('bg-gray-100');
    });
  });

  describe('edge cases', () => {
    it('should handle day value of 0', () => {
      render(<DateCell day={0} isHighlighted={false} type="date" />);

      expect(screen.getByText('0')).toBeInTheDocument();
    });
    it('should handle single digit days', () => {
      render(<DateCell day={8} isHighlighted={false} type="date" />);
      expect(screen.getByText('8')).toBeInTheDocument();
    });
    it('should handle double digit days', () => {
      render(<DateCell day={31} isHighlighted={false} type="date" />);
      expect(screen.getByText('31')).toBeInTheDocument();
    });
    it('should handle highlighted null day correctly', () => {
      render(<DateCell day={null} isHighlighted={true} type="date" />);

      const dayElement = screen.getByTestId('date-cell');
      expect(dayElement.className).toContain('bg-green-500');
    });
  });
});
