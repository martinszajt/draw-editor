import { TLEditorSnapshot } from "@tldraw/tldraw";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";

var document: TLEditorSnapshot | undefined = undefined

export const appRouter = router({
  getDocumentData: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return { documentData: document };
    }),
      storeDocumentData: publicProcedure
    .input(z.object({ snapshot: z.any() }))
    .mutation(async ({ input }) => {
      document = input.snapshot
      return { success: true };
    }),
});

export type AppRouter = typeof appRouter;
