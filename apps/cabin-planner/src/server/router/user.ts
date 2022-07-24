import { createRouter } from './context';

export const userRouter = createRouter().query('getAll', {
  async resolve({ ctx }) {
    return await ctx.prisma.user.findMany();
  },
});
