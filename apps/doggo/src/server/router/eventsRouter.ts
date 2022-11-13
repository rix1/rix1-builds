import { createRouter } from './context';
import { z } from 'zod';
import { Activity } from '@prisma/client';
import dayjs from 'dayjs';

const createEventSerializer = z.object({
  userId: z.string(),
  activity: z.nativeEnum(Activity),
  date: z.date().nullish(),
});

const dateSerializer = z.object({
  date: z.string(),
});

const deleteEventSerializer = z.object({
  eventId: z.string(),
});

const editEventSerializer = z.object({
  eventId: z.string(),
  newDate: z.date(),
});

export const eventsRouter = createRouter()
  .mutation('create', {
    input: createEventSerializer,
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
    input: deleteEventSerializer,
    async resolve({ input, ctx }) {
      return await ctx.prisma.dogEvent.delete({
        where: {
          id: input.eventId,
        },
      });
    },
  })
  .mutation('edit', {
    input: editEventSerializer,
    async resolve({ input, ctx }) {
      return await ctx.prisma.dogEvent.update({
        where: {
          id: input.eventId,
        },
        data: {
          createdAt: input.newDate,
        },
      });
    },
  })
  .query('findFirstEvent', {
    async resolve({ ctx }) {
      return await ctx.prisma.dogEvent.findFirst({
        where: {
          createdAt: {
            lte: new Date(),
          },
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
