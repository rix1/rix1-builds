// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { exampleRouter } from './example';
import { propertyRouter } from './property';
import { authRouter } from './auth';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('property.', propertyRouter)
  .merge('auth.', authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
