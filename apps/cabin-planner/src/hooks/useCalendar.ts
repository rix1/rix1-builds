import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import constructMonthArray from '../utils/constructMonthArray';

function useCalendar(preSelectedStart = null, preSelectedEnd = null) {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectionStart, setSelectionStart] = useState<Dayjs | null>(
    preSelectedStart,
  );

  const [selectionEnd, setSelectionEnd] = useState<Dayjs | null>(
    preSelectedEnd,
  );

  const handleNextMonthClick = () => {
    setCurrentDate((prev) => prev.add(1, 'month'));
  };
  const handlePreviousMonthClick = () => {
    setCurrentDate((prev) => prev.subtract(1, 'month'));
  };
  const handleDateClick = (selectedDate: Dayjs) => {
    if (!selectionStart) {
      setSelectionStart(selectedDate);
      return;
    }
    if (
      selectedDate.isSame(selectionStart, 'date') ||
      selectedDate.isSame(selectionEnd, 'date')
    ) {
      // If user clicks the same date as a preselected start or end date we want
      // to clear all
      setSelectionStart(null);
      setSelectionEnd(null);
      return;
    }
    if (selectedDate.isBefore(selectionStart, 'date')) {
      setSelectionStart(selectedDate);
      return;
    }

    setSelectionEnd(selectedDate);
  };

  const days = constructMonthArray(currentDate.year(), currentDate.month());

  const calendarState = {
    currentDate,
    days,
    selectionStart,
    selectionEnd,
  };

  const calendarEvents = {
    handleNextMonthClick,
    handlePreviousMonthClick,
    handleDateClick,
  };

  return [calendarState, calendarEvents] as const;
}

export default useCalendar;
