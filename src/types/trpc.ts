import { AppRouter } from "@/server/routers/_app";
import { TLStoreSnapshot } from "@tldraw/tldraw";
import type { inferProcedureOutput } from "@trpc/server";

export type DocumentDataType = TLStoreSnapshot

export interface IDocument {
    documentData: DocumentDataType,
    documentId: string
}