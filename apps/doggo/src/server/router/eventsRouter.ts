import { createRouter } from './context';
import { z } from 'zod';
import { Activity } from '@prisma/client';
import dayjs from 'dayjs';

const eventSerializer = z.object({
  userId: z.string(),
  activity: z.nativeEnum(Activity),
  date: z.date().nullish(),
});

const dateSerializer = z.object({
  date: z.string(),
});

const deleteSerializer = z.object({
  eventId: z.string(),
});

export const eventsRouter = createRouter()
  .mutation('create', {
    input: eventSerializer,
    async resolve({ input, ctx }) {
      return await ctx.prisma.dogEvent.create({
        data: {
          user: { connect: { id: input.userId } },
          activity: input.activity,
          createdAt: input.date || undefined,
        },
      });
    },
  })
  .mutation('delete', {
    input: deleteSerializer,
    async resolve({ input, ctx }) {
      return await ctx.prisma.dogEvent.delete({
        where: {
          id: input.eventId,
        },
      });
    },
  })
  .query('getEventsForDate', {
    input: dateSerializer,
    async resolve({ input, ctx }) {
      return await ctx.prisma.dogEvent.findMany({
        where: {
          createdAt: {
            gte: dayjs(input.date).startOf('day').toDate(),
            lte: dayjs(input.date).endOf('day').toDate(),
          },
        },
        include: {
          user: {
            select: {
              name: true,
              id: true,
              image: true,
            },
          },
        },
        orderBy: [
          {
            createdAt: 'asc',
          },
        ],
      });
    },
  });
