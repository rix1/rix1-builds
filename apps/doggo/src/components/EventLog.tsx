import { TrashIcon, CheckIcon, XCircleIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import dayjs from 'dayjs';
import { useState } from 'react';
import useDeleteEvent from '../hooks/useDeleteEvent';
import activityMapping from '../utils/eventMapping';
import { titleCase } from '../utils/stringManipulation';
import { InferQueryOutput, trpc } from '../utils/trpc';

type Events = InferQueryOutput<'dogEvents.getEventsForDate'>;

type EventLogProps = {
  events?: Events;
};

type ListItemProps = {
  event: Events[0];
};

const ListItem = ({ event }: ListItemProps) => {
  const [isActive, setIsActive] = useState(false);
  const deleteEvent = useDeleteEvent(event);

  function handleDelete() {
    setIsActive(false);
    deleteEvent({
      eventId: event.id,
    });
  }

  return (
    <li key={event.id} className="flex-auto py-2 group">
      <div className="flex items-center">
        <span className="text-xl">{activityMapping[event.activity].icon}</span>
        <span className="ml-3">{titleCase(event.activity.toLowerCase())}</span>
        <div className="tabular-nums ml-auto justify-self-center text-gray-500 mr-2 flex items-center">
          {!isActive && (
            <>
              {event.user.image && event.user.name && (
                <img
                  src={event.user.image}
                  alt={event.user.name}
                  className="w-7 h-7 rounded-full inline-block mr-3"
                />
              )}
              {dayjs(event.createdAt).format('HH:mm:ss')}
            </>
          )}
        </div>
        {!isActive ? (
          <button
            onClick={() => setIsActive(true)}
            className="opacity-0 group-hover:opacity-100"
          >
            <TrashIcon className="h-5 w-5 text-gray-400" />
          </button>
        ) : (
          <>
            <button onClick={handleDelete}>
              <span className="bg-red-100 text-red-700 py-1 px-2 rounded mr-1">
                Delete?
              </span>
            </button>
            <button onClick={() => setIsActive(false)}>
              <XCircleIcon className="h-5 w-5 text-gray-400" />
            </button>
          </>
        )}
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
