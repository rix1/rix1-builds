/* This example requires Tailwind CSS v2.0+ */

import useCalendar from '../hooks/useCalendar';
import titleCase from '../utils/titleCase';
import { trpc } from '../utils/trpc';
import BookingSummary from './BookingSummary';
import Calendar from './Calendar';
import Spinner from './Spinner';

export default function CalendarView() {
  const { status, data } = trpc.useQuery(['booking.getAll']);

  const [currentDate, days, eventHandlers, selectedDates] = useCalendar();
  const { handleNext, handlePrev, handleDateSelection } = eventHandlers;

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900">
        Planlagte hytteturer
      </h2>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
        <div className="mt-10 lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-4 xl:col-start-9">
          <h3 className="text-base font-semibold">Filter</h3>
          <hr className="my-5" />
          <div className="text-center">
            <Calendar.CalendarActions
              onNextMonth={handleNext}
              onPrevMonth={handlePrev}
            >
              {titleCase(currentDate.format('MMMM YYYY'))}
            </Calendar.CalendarActions>
            <Calendar.CalendarHeader daysToRender={days} />
          </div>
          <Calendar.CalendarGrid
            onSelected={handleDateSelection}
            selectedMonth={currentDate.month()}
            daysToRender={days}
          />
        </div>
        <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8 bg-white rounded-md shadow px-4 py-4 sm:px-6 sm:py-0 ">
          {status === 'loading' && (
            <div className="flex items-center justify-center h-full">
              <Spinner />
            </div>
          )}
          {data?.map((booking) => (
            <BookingSummary key={booking.id} booking={booking} />
          ))}
        </ol>
      </div>
    </div>
  );
}
