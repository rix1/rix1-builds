import type { NextPage } from "next";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import Head from "next/head";
import { useState } from "react";
import Navbar from "../components/Navbar";

function titleCase(word: string) {
  return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
}

type EventTypes = "walk" | "poop" | "food";

type User = {
  id: String;
  name: String;
  email: String;
  image: String;
};

type TimeSlot = "morning" | "lunch" | "dinner";
type Activity = "walk" | "poop" | "food";
type ChecklistItem = {
  id: string;
  timeslot: TimeSlot;
  activity: Activity;
  label: string;
};

function createChecklist(
  timeslot: "morning" | "lunch" | "dinner"
): ChecklistItem[] {
  return [
    {
      id: nanoid(),
      activity: "walk",
      timeslot: timeslot,
      label: "Walk",
    },
    {
      id: nanoid(),
      activity: "food",
      timeslot: timeslot,
      label: "Food",
    },
    {
      id: nanoid(),
      activity: "poop",
      timeslot: timeslot,
      label: "Poop",
    },
  ];
}

type Event = {
  id: string;
  createdAt: string;
  createdBy: string;
  activity: Activity;
  timeslot: TimeSlot;
};

function createEvent(
  activity: Activity,
  timeslot: TimeSlot,
  userId: string
): Event {
  return {
    id: nanoid(),
    createdAt: dayjs().toISOString(),
    createdBy: userId,
    activity: activity,
    timeslot: timeslot,
  };
}

const userIds = ["rikard", "siri"];

const users = {
  cl639np4l0022kddy0m22vs6s: {
    id: "cl639np4l0022kddy0m22vs6s",
    name: "Rikard",
    email: "rikardeide@gmail.com",
    image:
      "https://s3.eu-north-1.amazonaws.com/rix1.dev/first-thursday-450x450.jpg",
  },
  cl639np4r0030kddyoe0r6sfi: {
    id: "cl639np4r0030kddyoe0r6sfi",
    name: "Siri",
    email: "s.holtnaes@gmail.com",
    image: "https://avatars.githubusercontent.com/u/6916462?v=4",
  },
};

const eventState = {
  byId: {},
  allIds: [],
};

const Home: NextPage = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  const [allEvents, setAllEvents] = useState<{ [key: string]: Event }>({});
  const [eventIds, setEventIds] = useState<string[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>("siri");

  const timeslots = [
    {
      id: "morning",
      label: "Morning",
      timeFrame: "07-12",
      checklist: createChecklist("morning"),
    },
    {
      id: "lunch",
      label: "Lunch",
      timeFrame: "12-17",
      checklist: createChecklist("lunch"),
    },
    {
      id: "dinner",
      label: "Dinner",
      timeFrame: "17-23",
      checklist: createChecklist("dinner"),
    },
  ];

  function doesEventExist(eventId: string) {
    return eventIds.includes(eventId);
  }

  function addEvent(itemId: string) {
    const newEvent = createEvent(itemId, currentUserId, ["lofot", "gata"]);
    setEventIds((prev) => [...prev, newEvent.id]);
    setAllEvents((prev) => ({
      ...prev,
      [newEvent.id]: newEvent,
    }));
  }

  function removeEvent(itemId: string) {
    setEventIds((prev) => prev.filter((id) => id !== itemId));
    const events = allEvents;
    delete events[itemId];
    setAllEvents(events);
  }

  return (
    <>
      <Head>
        <title>Doggo</title>
        <meta name="description" content="Your favourite Dog tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar
        selectedUserId={currentUserId}
        users={users}
        userIds={userIds}
        onClick={(userId) => setCurrentUserId(userId)}
      />

      <main className="container mx-auto flex flex-col min-h-screen p-4">
        <h1 className="text-3xl font-bold border-l-4 pl-4 border-green-400 mt-4">
          {dayjs().format("ddd, D[th] MMMM, YYYY")}
        </h1>
        <div className="space-y-10 sm:space-y-0 space-x-0 sm:space-x-10 pt-8 flex flex-col sm:flex-row">
          {timeslots.map((timeslot) => (
            <section className="" key={timeslot.id}>
              <h2 className="text-xl font-bold inline-block">
                {timeslot.label}{" "}
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
                      checked={doesEventExist(item.id)}
                      type="checkbox"
                      onClick={() => {
                        if (doesEventExist(item.id)) {
                          removeEvent(item.id);
                        } else {
                          addEvent(item.id);
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
                return (
                  <li key={eventId} className="flex-auto space-x-4 my-2">
                    <div className="flex">
                      <img
                        src={users[event.createdBy].image}
                        className="w-7 h-7 rounded-full"
                        alt={users[event.createdBy].name}
                      />
                      <span className="ml-3">
                        {titleCase(event.timeslot)} {event.eventType}
                      </span>
                      <div className="tabular-nums ml-auto justify-self-center text-gray-500">
                        {dayjs(event.createdAt).format("hh:mm:ss")}
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
