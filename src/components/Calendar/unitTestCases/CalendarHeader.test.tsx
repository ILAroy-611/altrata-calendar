import { render, screen } from '@testing-library/react';
import CalendarHeader from '../CalendarHeader';

describe('Calendar Header', () => {
  it('renders the calendar header component', () => {
    render(<CalendarHeader month="September" year={2000} />);

    expect(screen.getByText('September 2000')).toBeInTheDocument();
  });
  it('renders the calendar header component with given month and year', () => {
    render(<CalendarHeader month="June" year={2032} />);

    expect(screen.getByText(/June 2032/i)).toBeInTheDocument();
  });
  it('applies the className correctly passed as prop', () => {
    render(<CalendarHeader month="September" year={1996} className="custom-class" />);

    const heading = screen.getByText(/September 1996/);
    expect(heading).toHaveClass('custom-class');
  });
});
