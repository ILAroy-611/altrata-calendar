import { render, screen } from '@testing-library/react';
import Weekdays from '../Weekdays';

describe('Weekdays', () => {
  it('renders weekdays component', () => {
    render(<Weekdays />);
  });
  it('displays all 7 weekday names', () => {
    render(<Weekdays />);

    const expectedWeekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    expectedWeekdays.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });
  it('renders weekdays in correct order', () => {
    render(<Weekdays />);

    const elements = screen.getAllByText(/Su|Mo|Tu|We|Th|Fr|Sa/);
    const expectedWeekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    expect(elements.map((e) => e.textContent)).toEqual(expectedWeekdays);
  });
});
