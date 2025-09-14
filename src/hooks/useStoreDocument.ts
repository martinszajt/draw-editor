import { trpc } from '../utils/trpc';
import { IDocument } from '@/types/trpc';

export function useStoreDocument() {
  const storeDocumentMutation = trpc.storeDocument.useMutation();

  const storeDocument = async (document: IDocument) => {
    try {
      await storeDocumentMutation.mutateAsync(document);
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    isLoading: storeDocumentMutation.isPending,
    isError: storeDocumentMutation.isError,
    error: storeDocumentMutation.error,
    storeDocument,
  };
}
