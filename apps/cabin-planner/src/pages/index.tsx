import type { NextPage } from 'next';
import Head from 'next/head';
import CalendarView from '../components/CalendarView';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const hello = trpc.useQuery(['auth.getSession', { text: 'from tRPC' }]);

  return (
    <>
      <Head>
        <title>Cabin planner</title>
        <meta
          name="description"
          content="An app for managing resources in large families, FRP if you want."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <CalendarView />
      </div>
    </>
  );
};

export default Home;
