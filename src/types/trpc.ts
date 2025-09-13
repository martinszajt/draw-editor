import { AppRouter } from "@/server/routers/_app";
import type { inferProcedureOutput } from "@trpc/server";

export type DocumentData = inferProcedureOutput<AppRouter["getDocumentData"]>;