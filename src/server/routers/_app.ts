import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { IDocument } from '@/types/trpc';

const documents = new Map<string, IDocument>();

export const appRouter = router({
  getDocument: publicProcedure.input(z.object({ documentId: z.string() })).query(({ input }) => {
    const doc = documents.get(input.documentId);
    return {
      snapshot: doc ?? null,
      documentId: doc?.documentId ?? input.documentId,
      error: doc ? null : 'Document not found',
    };
  }),
  storeDocument: publicProcedure
    .input(z.object({ snapshot: z.any(), documentId: z.string() }))
    .mutation(async ({ input }) => {
      if (documents.has(input.documentId)) {
        const existing = documents.get(input.documentId)!;
        existing.snapshot = input.snapshot;
        documents.set(existing.documentId, existing);
      } else {
        console.log('creating new', input.documentId);
        console.log('with snap', input.snapshot);
        documents.set(input.documentId, input.snapshot);
        console.log('document', documents);
      }
    }),
  getAllDocuments: publicProcedure.query(() => {
    const docs = Array.from(documents.keys()).map((documentId) => {
      return {
        documentId: documentId,
        snapshot: documents.get(documentId),
      };
    });
    return docs;
  }),
});

export type AppRouter = typeof appRouter;
