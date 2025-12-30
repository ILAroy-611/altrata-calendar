export interface CalendarHeaderProps {
  month: string;
  year: number;
  className?: string;
}

export interface DateCellProps {
  day: number;
  isHighlighted: boolean;
}
