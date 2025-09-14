'use client';
import { Geist, Geist_Mono } from 'next/font/google';
import DocumentPreviewCard from '@/components/documentPreviewCard/documentPreviewCard';
import { IDocument } from '@/types/trpc';
import { CreateDocumentButton } from '@/components/createDocumentButton/createDocumentButton';
import { useAllDocuments } from '@/hooks/useAllDocuments';
import { useStoreDocument } from '@/hooks/useStoreDocument';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function Home() {
  const { documents, isLoading, isError, error } = useAllDocuments();
  const { createNewDocument } = useStoreDocument();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen items-center p-6`}
    >
      <main>
        <div className="flex flex-col p-4 mb-4">
          {documents &&
            documents.map((document: IDocument) => {
              return <DocumentPreviewCard key={document.documentId} document={document} />;
            })}

          <CreateDocumentButton onCreateDocument={createNewDocument} />
        </div>
      </main>
    </div>
  );
}
