import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { ChecklistItem } from '../utils/eventTypes';

const userIds = [
  'cl639np4l0022kddy0m22vs6s',
  'cl639np4r0030kddyoe0r6sfi',
] as const;

const users: Users = {
  cl639np4l0022kddy0m22vs6s: {
    id: 'cl639np4l0022kddy0m22vs6s',
    name: 'Rikard',
    email: 'rikardeide@gmail.com',
    image:
      'https://s3.eu-north-1.amazonaws.com/rix1.dev/first-thursday-450x450.jpg',
  },
  cl639np4r0030kddyoe0r6sfi: {
    id: 'cl639np4r0030kddyoe0r6sfi',
    name: 'Siri',
    email: 's.holtnaes@gmail.com',
    image: 'https://avatars.githubusercontent.com/u/6916462?v=4',
  },
} as const;

const eventState = {
  byId: {},
  allIds: [],
};

type CheckboxesProps = {
  children: React.ReactNode;
};

const Checkboxes = ({ children }: CheckboxesProps) => {
  const [allEvents, setAllEvents] = useState<{ [key: string]: Event }>({});
  const [eventIds, setEventIds] = useState<string[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>(userIds[0]);
  const [timeslots, setTimeslots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    setTimeslots([
      {
        id: nanoid(),
        label: 'Morning',
        timeFrame: '07-12',
        checklist: createChecklist('morning'),
      },
      {
        id: nanoid(),
        label: 'Lunch',
        timeFrame: '12-17',
        checklist: createChecklist('lunch'),
      },
      {
        id: nanoid(),
        label: 'Dinner',
        timeFrame: '17-23',
        checklist: createChecklist('dinner'),
      },
    ]);
  }, []);

  function createChecklist(
    timeslot: 'morning' | 'lunch' | 'dinner',
  ): ChecklistItem[] {
    return [
      {
        id: nanoid(),
        activity: 'walk',
        timeslot: timeslot,
        label: 'Walk',
      },
      {
        id: nanoid(),
        activity: 'food',
        timeslot: timeslot,
        label: 'Food',
      },
      {
        id: nanoid(),
        activity: 'poop',
        timeslot: timeslot,
        label: 'Poop',
      },
    ];
  }

  function doesEventExist(eventId: string) {
    return eventIds.includes(eventId);
  }

  return timeslots.map((timeslot) => (
    <section className="" key={timeslot.id}>
      <h2 className="text-xl font-bold inline-block">
        {timeslot.label}{' '}
        <span className="ml-1 font-normal text-base text-gray-400">
          ({timeslot.timeFrame})
        </span>
      </h2>
      <ul className="mt-3">
        {timeslot.checklist.map((item) => (
          <li key={item.id}>
            <input
              name={item.id}
              id={item.id}
              // checked={doesEventExist(
              //   `${item.activity}-${item.timeslot}`,
              // )}
              type="checkbox"
              onChange={(event) => {
                // handleCheckboxClick(event.target.checked);
                // const eventId = `${item.activity}-${item.timeslot}`;
                // if (doesEventExist(eventId)) {
                //   setEventIds((prev) =>
                //     prev.filter((id) => id !== eventId),
                //   );
                //   const events = allEvents;
                //   delete events[eventId];
                //   setAllEvents(events);
                // } else {
                //   // const newEvent = createEvent(
                //   //   item.activity,
                //   //   item.timeslot,
                //   //   currentUserId,
                //   // );
                //   // setEventIds((prev) => [...prev, newEvent.id]);
                //   // setAllEvents((prev) => ({
                //   //   ...prev,
                //   //   [newEvent.id]: newEvent,
                //   // }));
                // }
              }}
              className="mr-2"
            />
            <label htmlFor={item.id}>{item.label}</label>
          </li>
        ))}
      </ul>
    </section>
  ));
};

export default Checkboxes;
