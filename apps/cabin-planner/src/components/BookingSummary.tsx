import { Menu, Transition } from '@headlessui/react';
import {
  CalendarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  LocationMarkerIcon,
} from '@heroicons/react/outline';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { Fragment } from 'react';
import { InferQueryOutput } from '../utils/tsUtils';

type BookingSummaryProps = {
  booking: InferQueryOutput<'booking.getAll'>[0];
};

const BookingSummary = ({ booking }: BookingSummaryProps) => {
  const duration = dayjs
    .duration(dayjs(booking.endDate).diff(booking.startDate))
    .asDays();

  const startDate = dayjs(booking.startDate);
  const endDate = dayjs(booking.endDate);
  const today = dayjs();

  return (
    <li
      key={booking.id}
      onMouseMove={() => {
        console.log('moving!', booking.id);
      }}
      className="relative flex space-x-6 py-6 xl:static hover:bg-gray-50 px-4 sm:px-6 first:rounded-t-md last:rounded-b-md"
    >
      <div className="text-center">
        <img
          src={booking.user.image}
          alt=""
          className="h-14 w-14 flex-none rounded-full"
        />
        {startDate.isBefore(today) && endDate.isAfter(today) && (
          <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Aktiv
          </span>
        )}
        {endDate.isBefore(today) && (
          <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Utgått
          </span>
        )}
      </div>
      <div className="flex-auto">
        <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
          {booking.user.name} er {booking.property.preposisjon}{' '}
          {booking.property.name} i {duration} dager
        </h3>
        <dl className="mt-2 flex flex-col text-gray-500 space-y-1">
          <div className="flex items-start space-x-3 w-1/2 order-2 mt-3">
            <dt className="mt-0.5">
              <span className="sr-only">Beskrivelse</span>
              <ChatIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </dt>
            <dd className="">{booking.description}</dd>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start space-x-3">
              <dt className="mt-0.5">
                <span className="sr-only">Dato</span>
                <CalendarIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </dt>
              <dd>
                Fra
                <time dateTime={startDate.format('YYYY-MM-DD')}>
                  {startDate.format('dddd D.')}
                </time>
                til
                <time dateTime={endDate.format('YYYY-MM-DD')}>
                  {endDate.format('dddd D. MMMM')}
                </time>
                <small className="leading-none text-gray-400 ml-1 block xl:ml-0">
                  Uke {startDate.week()}
                </small>
              </dd>
            </div>
            <div className="flex items-start space-x-3 xl:mt-0">
              <dt className="mt-0.5">
                <span className="sr-only">Lokasjon</span>
                <LocationMarkerIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </dt>
              <dd className="text-ellipsis truncate">
                {booking.property.name}
                <small className="leading-none text-gray-400 ml-1 block xl:ml-0">
                  <span className="xl:hidden">&middot;</span>
                  <a
                    className="ml-1 xl:ml-0"
                    href={`http://maps.google.com/?q=${booking.property.address}`}
                  >
                    {booking.property.address}
                  </a>
                </small>
              </dd>
            </div>
          </div>
        </dl>
      </div>
      <Menu
        as="div"
        className="absolute top-6 right-4 xl:relative xl:top-auto xl:right-auto xl:self-center"
      >
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <DotsHorizontalIcon className="h-5 w-5" aria-hidden="true" />
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
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    )}
                  >
                    Endre
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={clsx(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
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
  );
};

export default BookingSummary;
