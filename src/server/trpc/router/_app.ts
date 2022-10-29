// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authUserRouter } from "./authUser";

export const appRouter = router({
  example: exampleRouter,
  authUser: authUserRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
