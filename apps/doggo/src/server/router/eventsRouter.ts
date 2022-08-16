import { createRouter } from './context';
import { z } from 'zod';
import { Activity } from '@prisma/client';

const eventSerializer = z.object({
  userId: z.string().nullish(),
  activity: z.nativeEnum(Activity),
});

export const eventsRouter = createRouter()
  .mutation('create', {
    input: eventSerializer,
    async resolve({ input, ctx }) {
      await ctx.prisma.dogEvent.create({
        data: {
          user: { connect: { id: input.userId } },
          activity: input.activity,
        },
      });
    },
  })
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.dogEvent.findMany({
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
      });
    },
  });
