import { inferProcedureOutput } from '@trpc/server';
import { AppRouter } from '../server/router';

export type TQuery = keyof AppRouter['_def']['queries'];

export type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter['_def']['queries'][TRouteKey]
>;
