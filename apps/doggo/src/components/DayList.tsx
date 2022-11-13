import dayjs, { Dayjs, UnitType } from 'dayjs';
import { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import Day from './Day';

function constructDateArray(first: Dayjs) {
  const diff = dayjs().diff(first, 'days');
  if (diff < 0) {
    // this means the first event is in the future! woo00tt?
    // should't happen, but everything can happen so we better handle it
    return [];
  }
  return new Array(diff).fill(undefined).map((el, index) => {
    return first.add(index, 'days').startOf('day');
  });
}

type DayListProps = {
  todayRef: React.Ref<HTMLDivElement>;
  firstDate: Date | void;
};

const DayList = ({ todayRef, firstDate }: DayListProps) => {
  // const [daysToRender, setDaysToRender] = useState<Dayjs[]>([]);

  if (!firstDate) {
    return (
      <>
        No events found... <pre>TODO Add empty state here?</pre>
      </>
    );
  }

  const daysToRender = constructDateArray(dayjs(firstDate));

  return (
    <main className="container mx-auto flex flex-col min-h-screen p-4 space-y-28">
      {daysToRender.map((day) => (
        <Day
          ref={day.isToday() ? todayRef : undefined}
          date={day}
          key={day.toISOString()}
          isToday={day.isToday()}
        />
      ))}
    </main>
  );
};

export default DayList;
