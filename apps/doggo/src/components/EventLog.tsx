import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/outline';
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
  const [state, setState] = useState('default');
  const deleteEvent = useDeleteEvent();

  function handleDelete() {
    setState('default');
    deleteEvent({
      eventId: event.id,
    });
  }

  return (
    <li key={event.id} className="flex-auto py-2 group">
      <div className="flex items-center">
        <span className="text-xl">{activityMapping[event.activity].icon}</span>
        <span className="ml-3">{titleCase(event.activity.toLowerCase())}</span>
        <div className="tabular-nums ml-auto justify-self-center text-gray-500 flex items-center space-x-2">
          {state === 'default' && (
            <button
              onClick={() => setState('edit')}
              className="opacity-0 group-hover:opacity-100"
            >
              <PencilIcon className="h-5 w-5 text-gray-400" />
            </button>
          )}
          {state === 'edit' && (
            <button onClick={() => setState('default')} className="">
              <span className="bg-green-100 text-green-700 py-1 px-2 rounded">
                Save
              </span>
            </button>
          )}
          {state === 'edit' && (
            <>
              <input type={'time'} />
            </>
          )}
          {state === 'default' && event.user.image && event.user.name && (
            <img
              src={event.user.image}
              alt={event.user.name}
              className="w-7 h-7 rounded-full inline-block"
            />
          )}
          {state === 'default' && (
            <span>{dayjs(event.createdAt).format('HH:mm')}</span>
          )}
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
  );
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
