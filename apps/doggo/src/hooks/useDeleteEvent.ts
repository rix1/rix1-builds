import dayjs from 'dayjs';
import { InferQueryOutput, trpc } from '../utils/trpc';

type Event = InferQueryOutput<'dogEvents.getEventsForDate'>[0];

function useDeleteEvent() {
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

  return deleteMutation.mutate;
}

export default useDeleteEvent;
