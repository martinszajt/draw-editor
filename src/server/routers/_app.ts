import { snapshotType } from '@/types/trpc';
import { router, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

const documents = new Map<string, snapshotType | null>();

export const appRouter = router({
  getDocument: publicProcedure.input(z.object({ documentId: z.string() })).query(({ input }) => {
    if(!input.documentId){
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Invalid Document ID`,
      });
    }
    if (documents.has(input.documentId)) {
      const document = documents.get(input.documentId);
      return {
        snapshot: document,
        documentId: input.documentId,
      };
    } else {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Document not found`,
      });
    }
  }),
  storeDocument: publicProcedure
    .input(z.object({ snapshot: z.any(), documentId: z.string() }))
    .mutation(async ({ input }) => {
      documents.set(input.documentId, input.snapshot);
    }),
  createDocument: publicProcedure
    .input(z.object({ documentId: z.string() }))
    .mutation(async ({ input }) => {
          if(!input.documentId){
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Invalid Document ID`,
      });
    }
      if (!documents.has(input.documentId)) {
        documents.set(input.documentId, null);
      } else {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Document already exist`,
        });
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
