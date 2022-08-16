import { Activity } from '@prisma/client';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import EventLog from '../components/EventLog';
import Navbar from '../components/Navbar';
import { ChecklistItem, Event, TimeSlot, Users } from '../utils/eventTypes';
import { trpc } from '../utils/trpc';

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
  const dogEvents = trpc.useQuery(['dogEvents.getAll']);
  const eventMutation = trpc.useMutation(['dogEvents.create']);
  const [allEvents, setAllEvents] = useState<{ [key: string]: Event }>({});
  const [eventIds, setEventIds] = useState<string[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>(userIds[0]);
  const [timeslots, setTimeslots] = useState<TimeSlot[]>([]);
  const session = useSession();

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

  function createNewEvent(activity: Activity) {
    return () => {
      if (session.data?.user?.id) {
        eventMutation.mutate({
          userId: session.data.user.id,
          activity: activity,
        });
      }
    };
  }

  console.log(dogEvents);

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
          ))}

          {/* <section className="">
            <h2 className="text-xl font-bold">Events</h2>
          </section> */}

          <section className="flex-1">
            <div className="flex">
              <h2 className="text-xl font-bold">DogLog</h2>
              <div className="ml-auto">
                <button
                  onClick={createNewEvent(Activity.WALK)}
                  className="bg-green-100 px-3 py-2 rounded text-green-700 ring-2 ring-green-600 font-semibold text-sm tracking-tight hover:bg-green-200 hover:shadow-sm shadow shadow-green-800"
                >
                  <span className="text-base">+</span> Add walk
                </button>
                <button
                  onClick={createNewEvent(Activity.POOP)}
                  className="bg-green-100 px-3 py-2 rounded text-green-700 ring-2 ring-green-600 font-semibold text-sm tracking-tight hover:bg-green-200 hover:shadow-sm shadow shadow-green-800"
                >
                  <span className="text-base">+</span> Add Poop
                </button>
                <button
                  onClick={createNewEvent(Activity.FOOD)}
                  className="bg-green-100 px-3 py-2 rounded text-green-700 ring-2 ring-green-600 font-semibold text-sm tracking-tight hover:bg-green-200 hover:shadow-sm shadow shadow-green-800"
                >
                  <span className="text-base">+</span> Add Food
                </button>
                <button
                  onClick={createNewEvent(Activity.PEE)}
                  className="bg-green-100 px-3 py-2 rounded text-green-700 ring-2 ring-green-600 font-semibold text-sm tracking-tight hover:bg-green-200 hover:shadow-sm shadow shadow-green-800"
                >
                  <span className="text-base">+</span> Add Pee
                </button>
                <button
                  onClick={createNewEvent(Activity.PLAY)}
                  className="bg-green-100 px-3 py-2 rounded text-green-700 ring-2 ring-green-600 font-semibold text-sm tracking-tight hover:bg-green-200 hover:shadow-sm shadow shadow-green-800"
                >
                  <span className="text-base">+</span> Add play
                </button>
                <button
                  onClick={createNewEvent(Activity.UNKNOWN)}
                  className="bg-green-100 px-3 py-2 rounded text-green-700 ring-2 ring-green-600 font-semibold text-sm tracking-tight hover:bg-green-200 hover:shadow-sm shadow shadow-green-800"
                >
                  <span className="text-base">+</span> Add other
                </button>
              </div>
            </div>

            <EventLog events={dogEvents.data} key={dogEvents.status} />
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
