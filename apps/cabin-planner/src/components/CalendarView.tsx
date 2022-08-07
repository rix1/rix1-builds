/* This example requires Tailwind CSS v2.0+ */

import { PlusIcon } from '@heroicons/react/solid';

import Link from 'next/link';
import { Calendar, useCalendar } from 'rix-ui';
import titleCase from '../utils/titleCase';
import { trpc } from '../utils/trpc';
import BookingSummary from './BookingSummary';
import EmptyState from './EmptyState';
import Spinner from './Spinner';

export default function CalendarView() {
  const { status, data } = trpc.useQuery(['booking.getAll']);

  const [calendarState, calendarEvents] = useCalendar();
  const { currentDate, days } = calendarState;

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
              onNextMonth={calendarEvents.handleNextMonthClick}
              onPrevMonth={calendarEvents.handlePreviousMonthClick}
            >
              {titleCase(currentDate.format('MMMM YYYY'))}
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
        <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8 bg-white rounded-md shadow py-4 sm:py-0 ">
          {status === 'loading' && (
            <div className="flex items-center justify-center h-full">
              <Spinner />
            </div>
          )}
          {data?.map((booking) => (
            <BookingSummary key={booking.id} booking={booking} />
          ))}
          {status === 'success' && !data.length && (
            <div className="flex items-center justify-center -mt-6 h-full">
              <EmptyState>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Ingen opphold booket
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Kom i gang ved å booke et nytt opphold
                </p>
                <div className="mt-6">
                  <Link href="/book">
                    <a className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <PlusIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Ny booking
                    </a>
                  </Link>
                </div>
              </EmptyState>
            </div>
          )}
        </ol>
      </div>
    </div>
  );
}
