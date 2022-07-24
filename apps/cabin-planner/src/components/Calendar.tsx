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
  editable: boolean;
};

const CalendarCell = ({
  day,
  selectedMonth,
  className,
  selectedState,
  onClick,
  editable = true,
}: CalendarCellProps) => {
  return (
    <button
      type="button"
      onClick={() => {
        editable && onClick(day);
      }}
      className={clsx(
        'isolate py-2 focus:z-10 relative',
        editable && 'hover:bg-gray-100',
        !editable && 'cursor-default',
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
      {selectedState === 'start' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 absolute -top-0 left-0 text-white fill-indigo-900"
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
  onSelected?: (start: Dayjs, end: Dayjs) => void;
  preSelectedStart?: Dayjs | null;
  preSelectedEnd?: Dayjs | null;
  editable?: boolean;
};

const CalendarGrid = ({
  daysToRender,
  selectedMonth,
  onSelected,
  preSelectedStart = null,
  preSelectedEnd = null,
  editable = true,
}: CalendarGridProps) => {
  const [selectionStart, setSelectionStart] = useState<Dayjs | null>(
    preSelectedStart,
  );
  const [selectionEnd, setSelectionEnd] = useState<Dayjs | null>(
    preSelectedEnd,
  );

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
    if (onSelected) {
      onSelected(selectionStart, selectedDate);
    }
  };

  return (
    <div
      className={clsx(
        'isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200',
        !editable && 'opacity-50',
      )}
    >
      {daysToRender.map((day, dayIdx) => (
        <CalendarCell
          editable={editable}
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