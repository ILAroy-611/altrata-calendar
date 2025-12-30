import { CalendarProps } from '.';
import {
  extractMonthName,
  extractYear,
  generateCalendarRows,
  isDateStringValid,
  parseDateString,
} from '../../utils';
import CalendarHeader from './CalenderHeader';
import DateCell from './DateCell';
import Weekdays from './Weekdays';

export const Calendar: React.FC<CalendarProps> = ({ inputDate }: CalendarProps) => {
  const formattedDate = isDateStringValid(inputDate) ? parseDateString(inputDate) : null;
  if (formattedDate === null) {
    return (
      <div className="text-2xl text-red-400 p-4 m-4">
        Please provide correct date string in the format - DD/MM/YYYY
      </div>
    );
  }
  return (
    <>
      <CalendarHeader month={extractMonthName(formattedDate)} year={extractYear(formattedDate)} />
      <Weekdays />
      <div className="p-2 m-4 grid grid-cols-7">
        {generateCalendarRows(formattedDate).map((d) => {
          return <DateCell day={d} isHighlighted={d === formattedDate.getDate()} />;
        })}
      </div>
    </>
  );
};

export default Calendar;
