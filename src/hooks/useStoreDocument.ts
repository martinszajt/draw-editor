import { useRouter } from 'next/navigation';
import { trpc } from '../utils/trpc';
import { IDocument } from '@/types/trpc';
import { toast } from 'sonner';
import { TRPCError } from '@trpc/server';

export function useStoreDocument() {
  const storeDocumentMutation = trpc.storeDocument.useMutation();
  const createDocumentDocumentMutation = trpc.createDocument.useMutation();
  const router = useRouter();

  const storeDocument = async (document: IDocument) => {
    console.log('document', document);
    try {
      await storeDocumentMutation.mutateAsync(document);
      return true;
    } catch (error) {
      return false;
      toast('Document not!');
    }
  };

  const createNewDocument = async (documentId: string) => {
    console.log('document', document);
    try {
      await createDocumentDocumentMutation.mutateAsync({ documentId });
      router.push(`/editor/${documentId}`);
      toast('Document Created!');
      return true;
    } catch (e) {
      const error = e as TRPCError;
      alert('false');
      toast(`'Document not!', ${error.message}`);
      return false;
    }
  };

  return {
    isLoading: storeDocumentMutation.isPending,
    isError: storeDocumentMutation.isError,
    error: storeDocumentMutation.error,
    storeDocument,
    createNewDocument,
  };
}
