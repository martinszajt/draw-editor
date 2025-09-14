import { trpc } from '../utils/trpc';
import { IDocument } from '@/types/trpc';

export const useDocument = (documentId: string) => {
  const getDocumentQuery = trpc.getDocument.useQuery({ documentId: documentId! });

  const document = getDocumentQuery.data as IDocument | undefined;

  return {
    documentId,
    document,
    isLoading: getDocumentQuery.isLoading,
    error: getDocumentQuery.error,
  };
};
