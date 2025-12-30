export interface CalendarHeaderProps {
  month: string;
  year: number;
  className?: string;
}

export interface DateCellProps {
  day: number | string | null;
  isHighlighted: boolean;
  type?: 'date' | 'week';
}

export type WeekDayName = 'Su' | 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa';

export interface CalendarProps {
  inputDate: string | undefined | null;
}
