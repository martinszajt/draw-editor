import { TLStoreSnapshot } from '@tldraw/tldraw';

export type snapshotType = TLStoreSnapshot;

export interface IDocument {
  snapshot: snapshotType;
  documentId: string;
}
