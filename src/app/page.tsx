'use client';
import DocumentPreviewCard from '@/components/documentPreviewCard/documentPreviewCard';
import { IDocument } from '@/types/trpc';
import { CreateDocumentDialog } from '@/components/createDocumentDialog/createDocumentDialog';
import { useAllDocuments } from '@/hooks/useAllDocuments';
import { useStoreDocument } from '@/hooks/useStoreDocument';
import { useRouter } from 'next/navigation';
import { routes } from '@/utils/routes';

const Home = () => {
  const router = useRouter();
  const allDocuments = useAllDocuments();
  const storeDocument = useStoreDocument();

  const handleEditDocument = (documentId: string) => {
    router.push(`${routes.editor}/${documentId}`);
  };

  return (
    <main>
      <CreateDocumentDialog onCreateDocument={storeDocument.createNewDocument} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {allDocuments.documents &&
          allDocuments.documents.map((document: IDocument) => {
            return (
              <DocumentPreviewCard
                key={document.documentId}
                document={document}
                onDeleteDocument={storeDocument.deleteDocument}
                onEditDocument={handleEditDocument}
              />
            );
          })}
      </div>
    </main>
  );
};

export default Home;
