import dayjs from 'dayjs';
import { titleCase } from '../utils/stringManipulation';
import { InferQueryOutput } from '../utils/trpc';

type EventLogProps = {
  events?: InferQueryOutput<'dogEvents.getAll'>;
};

const EventLog = ({ events = [] }: EventLogProps) => {
  return (
    <ul className="pt-4 flex flex-col">
      {events.map((event) => {
        return (
          <li key={event.id} className="flex-auto space-x-4 my-2">
            <div className="flex">
              {event.user.image && event.user.name && (
                <img
                  src={event.user.image}
                  alt={event.user.name}
                  className="w-7 h-7 rounded-full"
                />
              )}

              <span className="ml-3">
                {titleCase(event.activity.toLowerCase())}
              </span>
              <div className="tabular-nums ml-auto justify-self-center text-gray-500">
                {dayjs(event.createdAt).format('hh:mm:ss')}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default EventLog;
