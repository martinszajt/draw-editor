import { trpc } from '../utils/trpc';
import { IDocument } from '@/types/trpc';

export const useAllDocuments = () => {
  const getAllDocumentsQuery = trpc.getAllDocuments.useQuery();

  const documents = getAllDocumentsQuery.data as IDocument[] | [];

  return {
    documents,
    isLoading: getAllDocumentsQuery.isLoading,
    isError: getAllDocumentsQuery.isError,
    error: getAllDocumentsQuery.error,
  };
}
