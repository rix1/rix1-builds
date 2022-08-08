import type { NextPage } from "next";
import dayjs from "dayjs";
import Head from "next/head";
import { useState } from "react";
// import { trpc } from "../utils/trpc";

function titleCase(word: string) {
  return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
}

type EventTypes = "walk" | "poop" | "food";

function createChecklist(type: "morning" | "lunch" | "dinner") {
  return [
    {
      id: `${type}-walk`,
      label: "Walk",
    },
    {
      id: `${type}-poop`,
      label: "Poop",
    },
    {
      id: `${type}-food`,
      label: "Food",
    },
  ];
}

function createEvent(
  type: string,
  userId: string,
  location: [lat: string, lng: string]
) {
  return {
    id: type,
    createdAt: dayjs(),
    createdBy: userId,
    eventType: type.split("-")[1],
    timeslot: type.split("-")[0],
    location: location,
  };
}

// const eventIds = []
// const allEvents = {
//   [id]: {}
// }

const users = {
  rikard: {
    id: "rikard",
    name: "Rikard",
    email: "rikardeide@gmail.com",
    emailVerified: null,
    image:
      "https://s3.eu-north-1.amazonaws.com/rix1.dev/first-thursday-450x450.jpg",
  },
  siri: {
    id: "siri",
    name: "Siri",
    email: "s.holtnaes@gmail.com",
    emailVerified: null,
    image: "https://avatars.githubusercontent.com/u/6916462?v=4",
  },
};

const Home: NextPage = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  const [allEvents, setAllEvents] = useState({});
  const [eventIds, setEventIds] = useState<string[]>([]);

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
    const newEvent = createEvent(
      itemId,
      Math.round(Math.random() * 1) === 1 ? "siri" : "rikard",
      ["lofot", "gata"]
    );
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

      <main className="container mx-auto flex flex-col min-h-screen p-4">
        <h1 className="text-3xl font-bold border-l-4 pl-4 border-green-400">
          Mon, 8th August, 2022
        </h1>
        <div className="space-y-10 pt-8">
          {timeslots.map((timeslot) => (
            <section className="" key={timeslot.id}>
              <h2 className="text-xl font-bold border-b pb-2">
                {timeslot.label} <span>({timeslot.timeFrame})</span>
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

          <section className="">
            <h2 className="text-xl font-bold border-b pb-2">Events</h2>
          </section>

          <section className="">
            <h2 className="text-xl font-bold border-b pb-2">DogLog</h2>
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
                        {event.createdAt.format("hh:mm:ss")}
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
