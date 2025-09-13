// server/routers/_app.ts
import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const appRouter = router({
  getDocumentData: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return { documentData: {} };
    }),
    storeDocumentData: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return { documentData: {} };
    }),
});

// Export type for tRPC client
export type AppRouter = typeof appRouter;
