'use client';
import { EditorComponent } from '@/components/editor/editor';
import { EmptyDocumentWarning } from '@/components/emptyDocumentWarning/emptyDocumentWarning';
import { useDocument } from '@/hooks/useSingleDocument';
import { useStoreDocument } from '@/hooks/useStoreDocument';
import { useParams } from 'next/navigation';

const Editor = () => {
  const { documentId } = useParams<{ documentId: string }>();

  const { document, isLoading } = useDocument(documentId);

  const { storeDocument } = useStoreDocument();

  if (isLoading) return <div>Loading...</div>;

  return (
    <main>
      {document ? (
        <EditorComponent document={document} storeDocument={storeDocument} />
      ) : (
        <EmptyDocumentWarning />
      )}
    </main>
  );
}

export default Editor
