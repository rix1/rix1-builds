/* This example requires Tailwind CSS v2.0+ */
import { Menu, Transition } from '@headlessui/react';
import {
  CalendarIcon,
  DotsHorizontalIcon,
  LocationMarkerIcon,
} from '@heroicons/react/solid';
import { Fragment, useState } from 'react';

import clsx from 'clsx';
import dayjs, { Dayjs } from 'dayjs';
import constructMonthArray from '../utils/constructMonthArray';
import titleCase from '../utils/titleCase';
import Calendar from './Calendar';
import Link from 'next/link';
import useCalendar from '../hooks/useCalendar';

const meetings = [
  {
    id: 1,
    date: '10. - 14. Juli, 2022',
    time: '5:00 PM',
    datetime: '2022-01-10T17:00',
    name: 'Rikard & Siri',
    imageUrl:
      'https://s3.eu-north-1.amazonaws.com/rix1.dev/first-thursday-450x450.jpg',
    location: 'Sjøbua',
  },
  {
    id: 2,
    date: '14. - 16. Juli, 2022',
    time: '5:00 PM',
    datetime: '2022-01-14T17:00',
    name: 'Martine og Nikko',
    imageUrl:
      'https://s3.eu-north-1.amazonaws.com/rix1.dev/first-thursday-450x450.jpg',
    location: 'Sjusjøen',
  },
  {
    id: 3,
    date: '23. - 26. Juli, 2022',
    time: '5:00 PM',
    datetime: '2022-01-14T17:00',
    name: 'Ludvik m/venner',
    imageUrl:
      'https://s3.eu-north-1.amazonaws.com/rix1.dev/first-thursday-450x450.jpg',
    location: 'Sjøbua',
  },
  // More meetings...
];

export default function CalendarView() {
  const [currentDate, days, eventHandlers, selectedDates] = useCalendar();
  const { handleNext, handlePrev, handleDateSelection } = eventHandlers;

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900">
        Planlagte hytteturer
      </h2>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
        <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
          <Calendar.CalendarActions
            onNextMonth={handleNext}
            onPrevMonth={handlePrev}
          >
            {titleCase(currentDate.format('MMMM YYYY'))}
          </Calendar.CalendarActions>
          <Calendar.CalendarHeader daysToRender={days} />
          <Calendar.CalendarGrid
            onSelected={handleDateSelection}
            selectedMonth={currentDate.month()}
            daysToRender={days}
          />
          <Link
            href={
              selectedDates.length === 2
                ? `/book?from=${selectedDates[0]?.format(
                    'YYYY-MM-DD',
                  )}&to=${selectedDates[1]?.format('YYYY-MM-DD')}`
                : '#'
            }
          >
            <a
              className={clsx(
                'focus:outline-none mt-8 w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 block',
                selectedDates.length !== 2 &&
                  'cursor-not-allowed bg-indigo-600/30',
              )}
            >
              Book en hytte
            </a>
          </Link>
        </div>
        <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
          {meetings.map((meeting) => (
            <li
              key={meeting.id}
              className="relative flex space-x-6 py-6 xl:static"
            >
              <img
                src={meeting.imageUrl}
                alt=""
                className="h-14 w-14 flex-none rounded-full"
              />
              <div className="flex-auto">
                <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
                  {meeting.name}
                </h3>
                <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                  <div className="flex items-start space-x-3">
                    <dt className="mt-0.5">
                      <span className="sr-only">Date</span>
                      <CalendarIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd>
                      <time dateTime={meeting.datetime}>
                        {meeting.date} at {meeting.time}
                      </time>
                    </dd>
                  </div>
                  <div className="mt-2 flex items-start space-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                    <dt className="mt-0.5">
                      <span className="sr-only">Location</span>
                      <LocationMarkerIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd>{meeting.location}</dd>
                  </div>
                </dl>
              </div>
              <Menu
                as="div"
                className="absolute top-6 right-0 xl:relative xl:top-auto xl:right-auto xl:self-center"
              >
                <div>
                  <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                    <span className="sr-only">Open options</span>
                    <DotsHorizontalIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="focus:outline-none absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={clsx(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm',
                            )}
                          >
                            Godkjenn
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={clsx(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm',
                            )}
                          >
                            Kanseller
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
