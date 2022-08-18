import { Activity } from '@prisma/client';
import dayjs from 'dayjs';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import EventLog from '../components/EventLog';
import Navbar from '../components/Navbar';
import { trpc } from '../utils/trpc';

function titleCase(word: string) {
  return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
}

const Home: NextPage = () => {
  const dogEvents = trpc.useQuery(['dogEvents.getAll']);
  const eventMutation = trpc.useMutation(['dogEvents.create']);
  const session = useSession();

  function createNewEvent(activity: Activity) {
    return () => {
      if (session.data?.user?.id) {
        eventMutation.mutate({
          userId: session.data.user.id,
          activity: activity,
        });
        dogEvents.refetch();
      }
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
