import contestants from "./data.json";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const contestantsRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return {
      people: contestants,
    };
  }),
});
