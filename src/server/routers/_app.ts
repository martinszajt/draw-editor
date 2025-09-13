import { TLEditorSnapshot } from "@tldraw/tldraw";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

interface IDocument {
    documentId: string
    documentData: TLEditorSnapshot | undefined
}

const documents = new Map<string, IDocument>();

export const appRouter = router({
  getDocumentData: publicProcedure
    .input(z.object({ documentId: z.string() }))
    .query(({ input }) => {
      const doc = documents.get(input.documentId);
    return {
        documentData: doc ?? null,
        documentId: doc?.documentId ?? input.documentId,
        error: doc ? null : 'Document not found',
    };
    }),
  storeDocumentData: publicProcedure
    .input(z.object({ snapshot: z.any(), documentId: z.string() }))
    .mutation(async ({ input }) => {
  if (documents.has(input.documentId)) {
    const existing = documents.get(input.documentId)!;
    existing.documentData = input.snapshot;
    documents.set(existing.documentId, existing);
  } else {
    console.log('creating new', input.documentId)
    console.log('with snap', input.snapshot)
    documents.set(input.documentId, input.snapshot);
    console.log('document', documents)
  }
    }),
    getAllDocuments: publicProcedure.query(() => {
    const allDocs = Array.from(documents.values());
    return allDocs;
  }),
});

export type AppRouter = typeof appRouter;
