import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import { forwardRef } from 'react';
import { trpc } from '../utils/trpc';
import EventLog from './EventLog';
import EventMenu from './EventMenu';

type DayProps = {
  date: Dayjs;
  isToday: boolean;
};

const Day = forwardRef<HTMLDivElement, DayProps>(({ isToday, date }, ref) => {
  const dogEvents = trpc.useQuery([
    'dogEvents.getEventsForDate',
    {
      date: date.format('YYYY-MM-DD'),
    },
  ]);

  return (
    <div
      className={clsx(
        'min-h-[30vh]',
        'border-t pt-6 border-gray-200 first-of-type:border-t-0',
      )}
      ref={ref}
    >
      <div className="flex items-center mt-4">
        <h1
          className={clsx(
            'text-2xl md:text-3xl font-bold border-l-4 pl-4 mr-4',
            isToday ? 'border-green-400' : 'border-transparent',
          )}
        >
          {date.format('ddd, D[th] MMMM, YYYY')}
        </h1>
        <EventMenu date={date} />
      </div>
      <div className="space-y-10 sm:space-y-0 space-x-0 sm:space-x-10 pt-8 flex flex-col sm:flex-row pl-4">
        <section className="flex-1">
          {dogEvents.status === 'loading' && 'Loading...'}
          <EventLog events={dogEvents.data} />
        </section>
      </div>
    </div>
  );
});

Day.displayName = 'Day';

export default Day;
