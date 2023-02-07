import { z } from "zod";
import contestants from "./data.json";

// export const people = z.array(
//   z.union([
//     z.object({ name: z.string(), work: z.string() }),
//     z.object({ name: z.string(), work: z.string(), instagram: z.string() }),
//   ])
// );

import { createTRPCRouter, publicProcedure } from "../trpc";

export const contestantsRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return {
      people: contestants,
    };
  }),
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),
});
