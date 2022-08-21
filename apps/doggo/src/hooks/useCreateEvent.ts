import { Activity } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { useSession } from 'next-auth/react';
import { trpc } from '../utils/trpc';

function useCreateEvent() {
  const session = useSession();

  const utils = trpc.useContext();

  const eventMutation = trpc.useMutation(['dogEvents.create'], {
    onSuccess(input) {
      utils.invalidateQueries([
        'dogEvents.getEventsForDate',
        {
          date: dayjs(input.createdAt).format('YYYY-MM-DD'),
        },
      ]);
    },
  });

  const createEvent = (activity: Activity, date?: Dayjs) => {
    if (session.data?.user?.id) {
      eventMutation.mutate({
        userId: session.data.user.id,
        activity: activity,
        date: date?.toDate(),
      });
    }
  };

  return createEvent;
}

export default useCreateEvent;
