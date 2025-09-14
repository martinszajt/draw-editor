import { useParams } from 'next/navigation';
import { trpc } from '../utils/trpc';
import { IDocument } from '@/types/trpc';

export function useDocument(documentId: string) {
  const getDocumentQuery = trpc.getDocument.useQuery({ documentId: documentId! });

  const document = getDocumentQuery.data as IDocument | undefined;

  return {
    documentId,
    document,
    isLoading: getDocumentQuery.isLoading,
    isError: getDocumentQuery.isError,
    error: getDocumentQuery.error,
  };
}
