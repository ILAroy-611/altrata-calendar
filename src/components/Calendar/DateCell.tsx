import { DateCellProps } from '../../types/calender.types';

const DateCell: React.FC<DateCellProps> = ({ day, isHighlighted = false }: DateCellProps) => {
  return (
    <div className="p-4 m-1">
      <div
        className={`font-normal text-lg ${isHighlighted ? 'bg-green-500 text-white font-semibold' : 'bg-gray-300 text-gray-700'}`}
      >
        {day}
      </div>
    </div>
  );
};

export default DateCell;
