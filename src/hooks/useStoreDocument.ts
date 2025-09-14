import { useRouter } from 'next/navigation';
import { trpc } from '../utils/trpc';
import { IDocument } from '@/types/trpc';
import { toast } from 'sonner';
import { TRPCError } from '@trpc/server';

export const useStoreDocument = () => {
  const storeDocumentMutation = trpc.storeDocument.useMutation();
  const createDocumentDocumentMutation = trpc.createDocument.useMutation();
  const router = useRouter();

  const storeDocument = async (document: IDocument) => {
    try {
      await storeDocumentMutation.mutateAsync(document);
      toast.success(`Document Saved`);
      return true;
    } catch (e) {
      const error = e as TRPCError;
      toast.error(`${error.message}`);
      return false;
    }
  };

  const createNewDocument = async (documentId: string) => {
    try {
      await createDocumentDocumentMutation.mutateAsync({ documentId });
      router.push(`/editor/${documentId}`);
      toast.success('Document Created');
      return true;
    } catch (e) {
      const error = e as TRPCError;
      toast.error(`${error.message}`);
      return false;
    }
  };

  return {
    isLoading: storeDocumentMutation.isPending,
    storeDocument,
    createNewDocument,
  };
}
