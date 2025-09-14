import { AppRouter } from '@/server/routers/_app';
import { TLStoreSnapshot } from '@tldraw/tldraw';
import type { inferProcedureOutput } from '@trpc/server';

export type snapshotType = TLStoreSnapshot;

export interface IDocument {
  snapshot: snapshotType;
  documentId: string;
}
