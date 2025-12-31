import { WEEKDAYNAME_LIST } from '../../constants';
import DateCell from './DateCell';

const Weekdays: React.FC = () => {
  return (
    <div className="p-2 m-4 grid grid-cols-7">
      {WEEKDAYNAME_LIST.map((weekDay) => {
        return <DateCell key={weekDay} day={weekDay} isHighlighted={false} type="week" />;
      })}
    </div>
  );
};

export default Weekdays;
