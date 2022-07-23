import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import { useState } from 'react';

type CalendarCellProps = {
  day: Dayjs;
  selectedMonth: number;
  className: string;
  selectedState: 'start' | 'between' | 'end' | null;
  onClick: (selectedDate: Dayjs) => void;
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
      onClick={() => onClick(day)}
      className={clsx(
        'isolate py-2 hover:bg-gray-100 focus:z-10 relative',
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
};

const CalendarGrid = ({ daysToRender, selectedMonth }: CalendarGridProps) => {
  const [selectionStart, setSelectionStart] = useState<Dayjs | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<Dayjs | null>(null);

  const handleClick = (selectedDate: Dayjs) => {
    if (!selectionStart) {
      setSelectionStart(selectedDate);
      return;
    }
    if (selectedDate.isSame(selectionStart, 'date')) {
      // clear all
      setSelectionStart(null);
      setSelectionEnd(null);
      return;
    }
    if (selectedDate.isBefore(selectionStart, 'date')) {
      setSelectionStart(selectedDate);
      setSelectionEnd(null);
      return;
    }
    setSelectionEnd(selectedDate);
  };

  return (
    <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
      {daysToRender.map((day, dayIdx) => (
        <CalendarCell
          selectedState={getSelectedState(day, selectionStart, selectionEnd)}
          day={day}
          onClick={handleClick}
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

type HandleMonthChange = (event: React.MouseEvent<HTMLButtonElement>) => void;

type CalendarHeaderProps = {
  children: React.ReactNode;
  daysToRender: Dayjs[];
  onNextMonth: HandleMonthChange;
  onPrevMonth: HandleMonthChange;
};

const CalendarHeader = ({
  children,
  daysToRender,
  onNextMonth,
  onPrevMonth,
}: CalendarHeaderProps) => {
  return (
    <>
      <div className="flex items-center text-gray-900">
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
      <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
        {daysToRender.slice(0, 7).map((day) => (
          <div key={day.format('DD')}>{day.format('dd').toUpperCase()}</div>
        ))}
      </div>
    </>
  );
};

const Calendar = {
  CalendarGrid,
  CalendarHeader,
};

export default Calendar;
