import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import constructMonthArray from '../utils/constructMonthArray';

function useCalendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDates, setselectedDates] = useState<Dayjs[]>([]);

  const handleNext = () => {
    setCurrentDate((prev) => prev.add(1, 'month'));
  };
  const handlePrev = () => {
    setCurrentDate((prev) => prev.subtract(1, 'month'));
  };

  const handleDateSelection = (start: Dayjs, end: Dayjs) => {
    setselectedDates([start, end]);
  };

  const days = constructMonthArray(currentDate.year(), currentDate.month());

  const eventHandlers = {
    handleNext,
    handlePrev,
    handleDateSelection,
  };

  return [currentDate, days, eventHandlers, selectedDates] as const;
}

export default useCalendar;
