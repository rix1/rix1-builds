import { Disclosure, Menu, Transition } from '@headlessui/react';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { Activity } from '@prisma/client';
import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import { Fragment } from 'react';

import useCreateEvent from '../hooks/useCreateEvent';
import { titleCase } from '../utils/stringManipulation';

type EventMenuProps = {
  date: Dayjs;
};

const eventActions = [
  { type: Activity.WALK, label: Activity.WALK },
  { type: Activity.POOP, label: Activity.POOP },
  { type: Activity.PEE, label: Activity.PEE },
  { type: Activity.PLAY, label: 'Socialize' },
  { type: Activity.FOOD, label: Activity.FOOD },
  { type: Activity.UNKNOWN, label: Activity.UNKNOWN },
];

const EventMenu = ({ date }: EventMenuProps) => {
  const createEvent = useCreateEvent();

  return (
    <Disclosure>
      <Menu as="div" className="relative">
        <Menu.Button>
          <span className="sr-only">Open event menu</span>
          <PlusCircleIcon className="w-6 h-6 text-gray-400" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top absolute mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            {eventActions.map((activity) => (
              <Menu.Item key={activity.type}>
                {({ active }) => (
                  <button
                    onClick={() => createEvent(activity.type, date)}
                    className={clsx(
                      active ? 'bg-gray-100' : 'hover:bg-gray-100',
                      'px-4 py-2 text-sm text-gray-700 w-full text-left flex items-center',
                    )}
                  >
                    {titleCase(activity.label.toLowerCase())}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </Disclosure>
  );
};

export default EventMenu;
