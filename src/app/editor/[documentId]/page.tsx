'use client';
import { trpc } from '../../../utils/trpc';
import EditorComponent, { EditorComponentProps } from '@/components/editor/editor';
import { useDocument } from '@/hooks/useSingleDocument';
import { useStoreDocument } from '@/hooks/useStoreDocument';
import { IDocument } from '@/types/trpc';
import { useParams } from 'next/navigation';

export default function Home() {
  const { documentId } = useParams<{ documentId: string }>();

  const { document, isLoading, isError, error } = useDocument(documentId);

  const { storeDocument } = useStoreDocument();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  console.log('document', document)

  return (
    <div>
      <main>
        {document && <EditorComponent document={document} storeDocument={storeDocument} />}
      </main>
    </div>
  );
}
