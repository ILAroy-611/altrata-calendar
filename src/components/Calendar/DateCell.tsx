import { DateCellProps } from '../../types/calender.types';

const DateCell: React.FC<DateCellProps> = ({
  day,
  isHighlighted = false,
  type = 'date',
}: DateCellProps) => {
  const getCellBackgroundColor = () => {
    if (isHighlighted) return 'bg-green-500';
    if (day === null) return 'bg-gray-100';
    if (type === 'week') return 'bg-blue-300';
    return 'bg-gray-500';
  };

  return (
    <div className="p-2 m-1">
      <div
        className={`
          ${getCellBackgroundColor()}
          p-1 text-lg w-16 h-16 
          flex justify-center items-center 
          rounded-lg text-white font-semibold
          ${isHighlighted ? 'font-bold' : 'font-normal'}
        `}
      >
        {day}
      </div>
    </div>
  );
};

export default DateCell;
