import dayjs from 'dayjs';
import { InferQueryOutput, trpc } from '../utils/trpc';

type Event = InferQueryOutput<'dogEvents.getEventsForDate'>[0];

function useEventMutations() {
  const utils = trpc.useContext();
  const deleteMutation = trpc.useMutation(['dogEvents.delete'], {
    onSuccess(input) {
      utils.invalidateQueries([
        'dogEvents.getEventsForDate',
        {
          date: dayjs(input.createdAt).format('YYYY-MM-DD'),
        },
      ]);
    },
  });

  const editEvent = trpc.useMutation(['dogEvents.edit'], {
    onSuccess(input) {
      utils.invalidateQueries([
        'dogEvents.getEventsForDate',
        {
          date: dayjs(input.createdAt).format('YYYY-MM-DD'),
        },
      ]);
    },
  });

  return [editEvent.mutate, deleteMutation.mutate] as const;
}

export default useEventMutations;
