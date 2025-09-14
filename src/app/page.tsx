'use client'
import { Geist, Geist_Mono } from "next/font/google";
import { trpc } from "../utils/trpc";
import DocumentPreviewCard from "@/components/documentPreviewCard/documentPreviewCard";
import { IDocument } from "@/types/trpc";
import { CreateDocumentButton } from "@/components/createDocumentButton/createDocumentButton";


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
    <div className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen items-center p-6`}>
      <main>
        <div className="flex flex-col p-4 mb-4">
        {allDocuments && allDocuments.map((document: IDocument) => {
return(


  <DocumentPreviewCard key={document.documentId} document={document} />

)
        })

        }

          <CreateDocumentButton />
</div>


      </main>
    </div>
  );
}
