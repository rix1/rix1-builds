import { createRouter } from './context';

export const propertyRouter = createRouter().query('getAll', {
  async resolve({ ctx }) {
    return await ctx.prisma.property.findMany();
  },
});
