import { trpc } from '../utils/trpc';

function useBooking() {
  const { data } = trpc.useQuery(['booking.getAll']);
  if (Array.isArray(data) && data.length) {
    return data[0];
  }
  return undefined;
}
export default useBooking;
