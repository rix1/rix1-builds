// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { exampleRouter } from './example';
import { propertyRouter } from './property';
import { userRouter } from './user';
import { authRouter } from './auth';
import { bookingRouter } from './booking';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('property.', propertyRouter)
  .merge('booking.', bookingRouter)
  .merge('user.', userRouter)
  .merge('auth.', authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
