import { DogEvent } from '@prisma/client';
import dayjs from 'dayjs';

type EventLogProps = {
  events?: DogEvent[];
};

const EventLog = ({ events = [] }: EventLogProps) => {
  return (
    <ul className="pt-4 flex flex-col">
      {events.map((event) => {
        // const user =
        // if (!event || !user) {
        //   return null;
        // }
        return (
          <li key={event.id} className="flex-auto space-x-4 my-2">
            <div className="flex">
              {/* <img
                        src={user.image}
                        className="w-7 h-7 rounded-full"
                        alt={user.name}
                      /> */}
              <span className="ml-3">{event.activity}</span>
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
