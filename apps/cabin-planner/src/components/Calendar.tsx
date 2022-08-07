import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { Dayjs } from 'dayjs';

type CalendarCellProps = {
  day: Dayjs;
  selectedMonth: number;
  className: string;
  selectedState: 'start' | 'between' | 'end' | null;
  onClick?: (selectedDate: Dayjs) => void;
};

const CalendarCell = ({
  day,
  selectedMonth,
  className,
  selectedState,
  onClick,
}: CalendarCellProps) => {
  return (
    <button
      type="button"
      onClick={() => {
        onClick && onClick(day);
      }}
      className={clsx(
        'isolate py-2 focus:z-10 relative',
        onClick && 'hover:bg-gray-100',
        !onClick && 'cursor-default',
        day.month() === selectedMonth ? 'bg-white' : 'bg-gray-50',
        (false || day.isToday) && 'font-semibold',
        day.isToday() && 'text-white',
        !false &&
          day.month() === selectedMonth &&
          !day.isToday &&
          'text-gray-900',
        !false && day.month() !== selectedMonth && 'text-gray-400',
        className,
        selectedState &&
          'before:block before:absolute before:-inset-1 before:bg-indigo-200 before:mx-1 before:my-2',
        selectedState === 'start' && 'before:rounded-l-md before:ml-2',
        selectedState === 'end' && 'before:rounded-r-md before:mr-2',
      )}
    >
      <time
        dateTime={day.format('YYYY-MM-DD')}
        className={clsx(
          'isolate z-10 mx-auto flex h-7 w-7 items-center justify-center rounded-full',
          day.isToday() && 'bg-indigo-600',
          false && !day.isToday() && 'bg-gray-900',
        )}
      >
        {day.format('DD')}
      </time>
      {['start', 'end'].includes(selectedState || '') && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={clsx(
            'h-4 w-4 absolute -top-0 text-white fill-indigo-900',
            selectedState === 'start' && 'left-0',
            selectedState === 'end' && 'right-0',
          )}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
    </button>
  );
};

function getSelectedState(day: Dayjs, start: Dayjs | null, end: Dayjs | null) {
  if (start && day.isSame(start, 'day')) {
    return 'start';
  }
  if (end && day.isSame(end, 'day')) {
    return 'end';
  }
  if (start && end && day.isBetween(start, end, 'day')) {
    return 'between';
  }
  return null;
}

type CalendarGridProps = {
  daysToRender: Dayjs[];
  selectedMonth: number;
  onClick?: (clickedDate: Dayjs) => void;
  selectionStart: Dayjs | null;
  selectionEnd: Dayjs | null;
};

const CalendarGrid = ({
  daysToRender,
  selectedMonth,
  onClick,
  selectionStart,
  selectionEnd,
}: CalendarGridProps) => {
  return (
    <div
      className={clsx(
        'isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200',
        !onClick && 'opacity-50',
      )}
    >
      {daysToRender.map((day, dayIdx) => (
        <CalendarCell
          selectedState={getSelectedState(day, selectionStart, selectionEnd)}
          day={day}
          onClick={onClick}
          selectedMonth={selectedMonth}
          key={day.toISOString()}
          className={clsx(
            dayIdx === 0 && 'rounded-tl-lg',
            dayIdx === 6 && 'rounded-tr-lg',
            dayIdx === daysToRender.length - 7 && 'rounded-bl-lg',
            dayIdx === daysToRender.length - 1 && 'rounded-br-lg',
          )}
        />
      ))}
    </div>
  );
};

type CalendarHeaderProps = {
  daysToRender: Dayjs[];
  className?: string;
};
const CalendarHeader = ({ daysToRender, className }: CalendarHeaderProps) => {
  return (
    <div
      className={clsx(
        'grid grid-cols-7 text-xs leading-6 text-gray-500',
        className,
      )}
    >
      {daysToRender.slice(0, 7).map((day) => (
        <div key={day.format('DD')}>{day.format('dd').toUpperCase()}</div>
      ))}
    </div>
  );
};

type HandleMonthChange = (event: React.MouseEvent<HTMLButtonElement>) => void;

type CalendarActionsProps = {
  children?: React.ReactNode;
  onNextMonth: HandleMonthChange;
  onPrevMonth: HandleMonthChange;
  className?: string;
};

const CalendarActions = ({
  children,
  onNextMonth,
  onPrevMonth,
  className,
}: CalendarActionsProps) => {
  return (
    <>
      <div className={clsx('flex items-center text-gray-900', className)}>
        <button
          type="button"
          onClick={onPrevMonth}
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Forrige måned</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="flex-auto font-semibold">{children}</div>
        <button
          type="button"
          onClick={onNextMonth}
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Neste måned</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </>
  );
};

const Calendar = {
  CalendarGrid,
  CalendarHeader,
  CalendarActions,
};

export default Calendar;
