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

  return (
    <li key={booking.id} className="relative flex space-x-6 py-6 xl:static">
      <img
        src={booking.user.image}
        alt=""
        className="h-14 w-14 flex-none rounded-full"
      />
      <div className="flex-auto">
        <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
          {booking.user.name} er {booking.property.preposisjon}{' '}
          {booking.property.name} i {duration} dager
        </h3>
        <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row space-y-1">
          <div className="flex items-start space-x-3">
            <dt className="mt-0.5">
              <span className="sr-only">Beskrivelse</span>
              <ChatIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </dt>
            <dd className="italic">{booking.description}</dd>
          </div>
          <div className="flex items-start space-x-3">
            <dt className="mt-0.5">
              <span className="sr-only">Dato</span>
              <CalendarIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd>
              <time dateTime={dayjs(booking.startDate).format('YYYY-MM-DD')}>
                Fra {dayjs(booking.startDate).format('dddd D.')} til{' '}
                {dayjs(booking.endDate).format('dddd D. MMMM')}
              </time>
            </dd>
          </div>
          <div className="flex items-start space-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
            <dt className="mt-0.5">
              <span className="sr-only">Lokasjon</span>
              <LocationMarkerIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd>
              {booking.property.name}
              <small className="leading-none text-gray-400 ml-1">
                &middot;
                <a
                  className="ml-1"
                  href={`http://maps.google.com/?q=${booking.property.address}`}
                >
                  {booking.property.address}
                </a>
              </small>
            </dd>
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
                    Godkjenn
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
