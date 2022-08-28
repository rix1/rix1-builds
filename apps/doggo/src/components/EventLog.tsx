import { Transition } from '@headlessui/react';
import { PencilIcon, TrashIcon, XCircleIcon } from '@heroicons/react/outline';
import dayjs from 'dayjs';
import { useState } from 'react';
import useDeleteEvent from '../hooks/useDeleteEvent';
import activityMapping from '../utils/eventMapping';
import { titleCase } from '../utils/stringManipulation';
import { InferQueryOutput } from '../utils/trpc';

type Events = InferQueryOutput<'dogEvents.getEventsForDate'>;

type EventLogProps = {
  events?: Events;
};

type ListItemProps = {
  event: Events[0];
};

const ListItem = ({ event }: ListItemProps) => {
  const [state, setState] = useState<'default' | 'edit' | 'confirmDelete'>(
    'default',
  );
  const [editEvent, deleteEvent] = useDeleteEvent();
  const [currentTime, setCurrentTime] = useState(
    dayjs(event.createdAt).format('HH:mm'),
  );

  function handleDelete() {
    setState('default');
    deleteEvent({
      eventId: event.id,
    });
  }

  function changeEventTime() {
    const [hours, minutes] = currentTime.split(':');
    editEvent({
      eventId: event.id,
      newDate: dayjs(event.createdAt)
        .set('hour', Number(hours))
        .set('minute', Number(minutes))
        .toDate(),
    });
    setState('default');
  }

  return (
    <>
      <li key={event.id} className="flex-auto py-2 group">
        <div className="flex items-center">
          <span className="text-xl self-start leading-6">
            {activityMapping[event.activity].icon}
          </span>
          <div className="ml-3">
            <span>{titleCase(event.activity.toLowerCase())}</span>
            <EventMeta data={event.meta} />
          </div>
          <div className="tabular-nums ml-auto self-start text-gray-500 flex items-center space-x-2">
            {state === 'default' && (
              <button
                type="button"
                onClick={() => setState('edit')}
                className="opacity-0 group-hover:opacity-100"
              >
                <PencilIcon className="h-5 w-5 text-gray-400" />
              </button>
            )}
            {state === 'edit' && (
              <button onClick={changeEventTime}>
                <span className="bg-green-100 text-green-700 py-1 px-2 rounded">
                  Save
                </span>
              </button>
            )}
            {state === 'edit' && (
              <>
                <input
                  type="time"
                  value={currentTime}
                  onChange={(ev) => setCurrentTime(ev.currentTarget.value)}
                />
              </>
            )}
            {state === 'default' && event.user.image && event.user.name && (
              <img
                src={event.user.image}
                alt={event.user.name}
                className="w-7 h-7 rounded-full inline-block"
              />
            )}
            {state === 'default' && <span>{currentTime}</span>}
            {state === 'default' && (
              <button
                onClick={() => setState('confirmDelete')}
                className="opacity-0 group-hover:opacity-100"
              >
                <TrashIcon className="h-5 w-5 text-gray-400" />
              </button>
            )}
            {state === 'confirmDelete' && (
              <>
                <button onClick={handleDelete}>
                  <span className="bg-red-100 text-red-700 py-1 px-2 rounded">
                    Delete?
                  </span>
                </button>
                <button onClick={() => setState('default')}>
                  <XCircleIcon className="h-5 w-5 text-gray-400" />
                </button>
              </>
            )}
          </div>
        </div>
      </li>
      <Transition
        show={state === 'edit'}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div className="divide-y divide-gray-200 bg-gray-50 border-t">
          <div className="flex space-x-4 bg-gray-50 px-2 py-3">
            <label htmlFor="amount" className="text-gray-500 text-sm">
              Amount
            </label>
            <div className="relative ">
              <input
                id="amount"
                type="text"
                placeholder="Amount"
                className="ring-1 ring-slate-400 pl-1 w-32 text-sm"
              />
              <div className="absolute inset-y-0 right-1 flex items-center pointer-events-none">
                <span className="text-gray-400 text-xs" id="price-currency">
                  g
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-4 bg-white px-2 py-3">
            <label htmlFor="amount" className="text-gray-500 text-sm">
              Amount
            </label>
            <input
              id="amount"
              type="text"
              placeholder="Amount in grams"
              className="ring-1 ring-slate-400 px-1 w-32 text-sm"
            />
          </div>
          <div className="flex space-x-4 bg-gray-50 px-2 py-3">
            <label htmlFor="amount" className="text-gray-500 text-sm">
              Amount
            </label>
            <input
              id="amount"
              type="text"
              placeholder="Amount in grams"
              className="ring-1 ring-slate-400 px-1 w-32 text-sm"
            />
          </div>
        </div>
      </Transition>
    </>
  );
};

type EventMetaProps = {
  data: any;
};

const EventMeta = ({ data = {} }: EventMetaProps) => {
  return null;
  if (data?.size) {
    return <span className="block text-slate-500 font-xs">{data.size}</span>;
  }

  return <span className="block text-slate-500 font-xs">Pooped the bed!!</span>;
};
const EventLog = ({ events = [] }: EventLogProps) => {
  return (
    <ul className="pt-4 flex flex-col">
      {events.map((event) => (
        <ListItem event={event} key={event.id} />
      ))}
    </ul>
  );
};

export default EventLog;
