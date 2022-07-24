import type { NextPage } from 'next';
import Head from 'next/head';
import CalendarView from '../components/CalendarView';
import Navbar from '../components/Navbar';

const Home: NextPage = () => {
  // const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }]);

  return (
    <div className="bg-slate-100 min-h-screen">
      <Head>
        <title>Cabin planner</title>
        <meta
          name="description"
          content="An app for managing resources in large families, FRP if you want."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar activeRoute="/" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <CalendarView />
      </div>
    </div>
  );
};

export default Home;
