import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import duration from 'dayjs/plugin/duration';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import DayList from '../components/DayList';
import Navbar from '../components/Navbar';
import { trpc } from '../utils/trpc';

dayjs.extend(isToday);
dayjs.extend(duration);

const Home: NextPage = () => {
  const firstEvent = trpc.useQuery(['dogEvents.findFirstEvent']);

  const todayRef = useRef<HTMLDivElement>(null);
  useHotkeys('option+d', () => {
    todayRef.current?.scrollIntoView();
  });

  useEffect(() => {
    todayRef.current?.scrollIntoView();
  });

  const Tag = {
    loading: () => <>Loading...</>,
    success: () => (
      <DayList todayRef={todayRef} firstDate={firstEvent.data?.createdAt} />
    ),
    idle: () => <>Idle!</>,
    error: () => <>Error</>,
  }[firstEvent.status];

  console.log(firstEvent.status);

  return (
    <>
      <Head>
        <title>Dog Log</title>
        <meta name="description" content="Your favourite Dog tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar
        onClick={() => {
          todayRef.current?.scrollIntoView();
        }}
      />

      <Tag />
    </>
  );
};

export default Home;
