import { useRouter } from 'next/navigation';
import { trpc } from '../utils/trpc';
import { IDocument } from '@/types/trpc';
import { toast } from 'sonner';
import { TRPCError } from '@trpc/server';
import { routes } from '@/utils/routes';

export const useStoreDocument = () => {
  const storeDocumentMutation = trpc.storeDocument.useMutation();
  const createDocumentDocumentMutation = trpc.createDocument.useMutation();
  const deleteDocumentDocumentMutation = trpc.deleteDocument.useMutation();
  const utils = trpc.useUtils();
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

  const deleteDocument = async (documentId: string) => {
    try {
      await deleteDocumentDocumentMutation.mutateAsync({ documentId });
      toast.success('Document Deleted');
      utils.getAllDocuments.invalidate();
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
      router.push(`${routes.editor}/${documentId}`);
      toast.success('Document Created');
      return true;
    } catch (e) {
      const error = e as TRPCError;
      toast.error(`${error.message}`);
      return false;
    }
  };

  const isLoading =
    storeDocumentMutation.isPending ||
    createDocumentDocumentMutation.isPending ||
    deleteDocumentDocumentMutation.isPending;

  return {
    isLoading,
    storeDocument,
    deleteDocument,
    createNewDocument,
  };
};
