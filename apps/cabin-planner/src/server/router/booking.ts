import { bookingSchema_server } from '../forms/booking';
import { createRouter } from './context';

export const bookingRouter = createRouter()
  .mutation('create', {
    input: bookingSchema_server,
    async resolve({ input, ctx }) {
      await ctx.prisma.booking.create({
        data: {
          startDate: input.startDate,
          endDate: input.endDate,
          bedsRequired: input.bedCount,
          description: input.description,
          arrivalTime: input.arrivalTime,
          user: { connect: { id: input.userId } },
          property: { connect: { id: input.propertyId } },
        },
      });
    },
  })
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.booking.findMany({
        orderBy: [
          {
            startDate: 'asc',
          },
        ],
        include: {
          user: {
            select: {
              name: true,
              id: true,
              image: true,
            },
          },
          property: {
            select: {
              name: true,
              beds: true,
              address: true,
              preposisjon: true,
            },
          },
        },
      });
    },
  });
