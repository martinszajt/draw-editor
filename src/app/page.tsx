'use client'
import { Geist, Geist_Mono } from "next/font/google";
import { trpc } from "../utils/trpc";
import EditorComponent, { EditorComponentProps } from "@/components/editor/editor";
import { TLStoreSnapshot } from "@tldraw/tldraw";
import DocumentPreviewCard from "@/components/documentPreviewCard/documentPreviewCard";
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

  const getAllDocumentsQuery = trpc.getAllDocuments.useQuery();
  const allDocuments = getAllDocumentsQuery.data as IDocument[] | [];



  if (getAllDocumentsQuery.isLoading) return <div>Loading...</div>;
  if (getAllDocumentsQuery.isError) return <div>Error: {getAllDocumentsQuery.error.message}</div>;
  return (
    <div className={`${geistSans.className} ${geistMono.className} font-sans`}>
      <main>

        {allDocuments && allDocuments.map((document: IDocument) => {
return(


<DocumentPreviewCard  key={document.documentId} document={document}/>
)
        })

        }

      </main>
    </div>
  );
}
