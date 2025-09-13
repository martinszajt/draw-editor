'use client'

import { Geist, Geist_Mono } from "next/font/google";
import { trpc } from "../../../utils/trpc";
import EditorComponent, { EditorComponentProps } from "@/components/editor/editor";
import { TLStoreSnapshot } from "@tldraw/tldraw";
import { IDocument } from "@/types/trpc";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const getDocumentDataQuery = trpc.getDocumentData.useQuery({ documentId: "doc" });
  const storeDocumentMutation = trpc.storeDocumentData.useMutation();

  const document = getDocumentDataQuery.data as IDocument | undefined;

  if (getDocumentDataQuery.isLoading) return <div>Loading...</div>;
  if (getDocumentDataQuery.isError) return <div>Error: {getDocumentDataQuery.error.message}</div>;

  const saveDoc: EditorComponentProps['saveDocumentData'] = async (snapshot) => {
    try {
      console.log('Saving snapshot:', snapshot);
      await storeDocumentMutation.mutateAsync({ snapshot, documentId: 'doc' });
      return true;
    } catch (error) {
      console.error("Error saving document:", error);
      return false;
    }
  };

  return (
    <div className={`${geistSans.className} ${geistMono.className} font-sans`}>
      <main>
        <EditorComponent 
          document={document} 
          saveDocumentData={saveDoc} 
        />
      </main>
    </div>
  );
}
