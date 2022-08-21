import { Disclosure, Menu, Transition } from '@headlessui/react';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { Activity } from '@prisma/client';
import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import { useSession } from 'next-auth/react';
import { Fragment } from 'react';

import useCreateEvent from '../hooks/useCreateEvent';
import activityMapping from '../utils/eventMapping';
import { titleCase } from '../utils/stringManipulation';

type EventMenuProps = {
  date: Dayjs;
};

const eventActions = [
  Activity.WALK,
  Activity.POOP,
  Activity.PEE,
  Activity.TRAINING,
  Activity.SOCIALIZE,
  Activity.FOOD,
  Activity.OTHER,
];

const EventMenu = ({ date }: EventMenuProps) => {
  const createEvent = useCreateEvent();
  const session = useSession();

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
          <Menu.Items className="origin-top absolute mt-2 right-0 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            {eventActions.map((activity) => (
              <Menu.Item key={activityMapping[activity].label}>
                {({ active }) => (
                  <button
                    onClick={() => createEvent(activity, date)}
                    className={clsx(
                      active ? 'bg-gray-100' : 'hover:bg-gray-100',
                      'px-4 py-2 text-sm text-gray-700 w-full text-left flex items-center space-x-5',
                    )}
                  >
                    <span className="mr-2">
                      {activityMapping[activity].icon}
                    </span>
                    {titleCase(activityMapping[activity].label.toLowerCase())}
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
