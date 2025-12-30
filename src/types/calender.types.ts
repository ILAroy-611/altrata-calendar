export interface CalendarHeaderProps {
  month: string;
  year: number;
  className?: string;
}

export interface DateCellProps {
  day: number | string;
  isHighlighted: boolean;
}

export type WeekDayName = 'Su' | 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa';
