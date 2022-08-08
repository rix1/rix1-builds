import Calendar from './CalendarComponents';
import useCalendar from './useCalendar';

type CalendarDemoProps = {
  children: React.ReactNode;
};

const CalendarDemo = ({ children }: CalendarDemoProps) => {
  const [calendarState, calendarEvents] = useCalendar();
  const { currentDate, days } = calendarState;

  return (
    <div className="">
      <div className="text-center">
        <Calendar.CalendarActions
          className="mb-4"
          onNextMonth={calendarEvents.handleNextMonthClick}
          onPrevMonth={calendarEvents.handlePreviousMonthClick}
        >
          {currentDate.format('MMMM YYYY')}
        </Calendar.CalendarActions>
        <Calendar.CalendarHeader daysToRender={days} />
      </div>
      <Calendar.CalendarGrid
        onClick={calendarEvents.handleDateClick}
        selectionStart={calendarState.selectionStart}
        selectionEnd={calendarState.selectionEnd}
        selectedMonth={currentDate.month()}
        daysToRender={days}
      />
    </div>
  );
};

export default CalendarDemo;
