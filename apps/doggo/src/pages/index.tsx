import type { NextPage } from 'next';
import Head from 'next/head';
import Day from '../components/Day';
import Navbar from '../components/Navbar';
import { daysBetween } from '../utils/dateUtils';
import { InferQueryOutput, trpc } from '../utils/trpc';

function getDateBoundaries(dogEvents?: InferQueryOutput<'dogEvents.getAll'>) {
  if (!dogEvents?.length) {
    return [undefined, undefined];
  }

  return [dogEvents[0]?.createdAt, dogEvents[dogEvents.length - 1]?.createdAt];
}

const Home: NextPage = () => {
  const dogEvents = trpc.useQuery(['dogEvents.getAll']);

  const [first, last] = getDateBoundaries(dogEvents.data);

  const diff = daysBetween(first, last);
  console.log(diff);

  return (
    <>
      <Head>
        <title>Doggo</title>
        <meta name="description" content="Your favourite Dog tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="container mx-auto flex flex-col min-h-screen p-4 space-y-28">
        {first && <Day date={first} />}
        {last && <Day date={last} />}
      </main>
    </>
  );
};

export default Home;
