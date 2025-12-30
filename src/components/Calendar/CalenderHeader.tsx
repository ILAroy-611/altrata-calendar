import { CalendarHeaderProps } from '../../types/calender.types';

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  month,
  year,
  className,
}: CalendarHeaderProps) => {
  return (
    <div className="p-2 m-4">
      <div className={`text-2xl font-bold text-gray-600 ${className}`}>
        {month} {year}
      </div>
    </div>
  );
};

export default CalendarHeader;
