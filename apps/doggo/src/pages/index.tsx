import dayjs, { Dayjs, UnitType } from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import Day from '../components/Day';
import Navbar from '../components/Navbar';

dayjs.extend(isToday);

function constructDateArray(center: Dayjs, padding: number, unit: UnitType) {
  const startDate = center.subtract(padding / 2, 'days');
  return new Array(padding * 2).fill(undefined).map((el, index) => {
    return startDate.add(index, 'days').startOf('day');
  });
}

const Home: NextPage = () => {
  const [daysToRender, setDaysToRender] = useState(
    constructDateArray(dayjs(), 7, 'days'),
  );
  const todayRef = useRef<HTMLDivElement>(null);

  useHotkeys('option+d', () => {
    todayRef.current?.scrollIntoView();
  });

  useEffect(() => {
    todayRef.current?.scrollIntoView();
  });

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

      <main className="container mx-auto flex flex-col min-h-screen p-4 space-y-28">
        {daysToRender.map((day) => (
          <Day
            ref={day.isToday() ? todayRef : undefined}
            date={day}
            key={day.toISOString()}
            isToday={day.isToday()}
          />
        ))}
        {/* {first && <Day date={first} />} */}
        {/* {last && <Day date={last} />} */}
      </main>
    </>
  );
};

export default Home;
