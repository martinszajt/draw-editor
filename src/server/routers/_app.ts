import { snapshotType } from '@/types/trpc';
import { router, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { open_ai_generation } from '../services/image_generation';
import { documentIdRegex } from '@/utils/regex';

const documents = new Map<string, snapshotType | null>();

export const appRouter = router({
  getDocument: publicProcedure.input(z.object({ documentId: z.string() })).query(({ input }) => {
    if (!input.documentId) {
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
  deleteDocument: publicProcedure
    .input(z.object({ documentId: z.string() }))
    .mutation(async ({ input }) => {
      if (!input.documentId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Invalid Document ID`,
        });
      }
      if (documents.has(input.documentId)) {
        try {
          documents.delete(input.documentId);
          return {
            documentId: input.documentId,
          };
        } catch {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: `Failed to delete`,
          });
        }
      } else {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Document not found`,
        });
      }
    }),
  createDocument: publicProcedure
    .input(z.object({ documentId: z.string() }))
    .mutation(async ({ input }) => {
      if (!documentIdRegex.test(input.documentId)) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Document ID can only contain letters, numbers, hyphens, or underscores`,
        });
      }
      if (documents.size > 8) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Document limit exceeded`,
        });
      }
      if (!input.documentId) {
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
  generateImage: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ input }) => {
      if(!process.env.OPENAI_API_KEY){
                throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: `OpenAI key not set`,
        });
      }
      try {
        const image = await open_ai_generation(input.prompt);
        return image;
      } catch (e) {
        console.log(e);
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No Caption Found`,
        });
      }
    }),
});

export type AppRouter = typeof appRouter;
