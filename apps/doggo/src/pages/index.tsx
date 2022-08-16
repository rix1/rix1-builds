import dayjs from 'dayjs';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Navbar from '../components/Navbar';
import {
  Activity,
  ChecklistItem,
  Event,
  TimeSlot,
  TimeSlotType,
  Users,
} from '../utils/eventTypes';

function titleCase(word: string) {
  return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
}

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

const Home: NextPage = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
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

  function doesEventExist(eventId: string) {
    return eventIds.includes(eventId);
  }
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

  function createEvent(
    activity: Activity,
    timeslot: TimeSlotType,
    userId: string,
  ): Event {
    return {
      id: `${activity}-${timeslot}`, // workaround until we get DB up and running
      createdAt: dayjs().toISOString(),
      createdBy: userId,
      activity: activity,
      timeslot: timeslot,
    };
  }

  return (
    <>
      <Head>
        <title>Doggo</title>
        <meta name="description" content="Your favourite Dog tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="container mx-auto flex flex-col min-h-screen p-4">
        <h1 className="text-3xl font-bold border-l-4 pl-4 border-green-400 mt-4">
          {dayjs().format('ddd, D[th] MMMM, YYYY')}
        </h1>
        <div className="space-y-10 sm:space-y-0 space-x-0 sm:space-x-10 pt-8 flex flex-col sm:flex-row">
          {timeslots.map((timeslot) => (
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
                      checked={doesEventExist(
                        `${item.activity}-${item.timeslot}`,
                      )}
                      type="checkbox"
                      onChange={() => {
                        const eventId = `${item.activity}-${item.timeslot}`;
                        if (doesEventExist(eventId)) {
                          setEventIds((prev) =>
                            prev.filter((id) => id !== eventId),
                          );
                          const events = allEvents;
                          delete events[eventId];
                          setAllEvents(events);
                        } else {
                          const newEvent = createEvent(
                            item.activity,
                            item.timeslot,
                            currentUserId,
                          );
                          setEventIds((prev) => [...prev, newEvent.id]);
                          setAllEvents((prev) => ({
                            ...prev,
                            [newEvent.id]: newEvent,
                          }));
                        }
                      }}
                      className="mr-2"
                    />
                    <label htmlFor={item.id}>{item.label}</label>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {/* <section className="">
            <h2 className="text-xl font-bold">Events</h2>
          </section> */}

          <section className="flex-1">
            <h2 className="text-xl font-bold">DogLog</h2>
            <ul className="pt-4 flex flex-col">
              {eventIds.map((eventId) => {
                const event = allEvents[eventId];
                const user = users[event?.createdBy || ''];
                if (!event || !user) {
                  return null;
                }
                return (
                  <li key={eventId} className="flex-auto space-x-4 my-2">
                    <div className="flex">
                      <img
                        src={user.image}
                        className="w-7 h-7 rounded-full"
                        alt={user.name}
                      />
                      <span className="ml-3">
                        {titleCase(event.timeslot)} {event.activity}
                      </span>
                      <div className="tabular-nums ml-auto justify-self-center text-gray-500">
                        {dayjs(event.createdAt).format('hh:mm:ss')}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
