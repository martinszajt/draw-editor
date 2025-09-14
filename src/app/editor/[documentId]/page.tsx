'use client'
import { trpc } from "../../../utils/trpc";
import EditorComponent, { EditorComponentProps } from "@/components/editor/editor";
import { IDocument } from "@/types/trpc";
import { useParams } from "next/navigation";



export default function Home() {

      const { documentId } = useParams<{ documentId: string }>();;
  const getDocumentDataQuery = trpc.getDocumentData.useQuery({ documentId: documentId });
  const storeDocumentMutation = trpc.storeDocumentData.useMutation();

  const document = getDocumentDataQuery.data as IDocument | undefined;

  if (getDocumentDataQuery.isLoading) return <div>Loading...</div>;
  if (getDocumentDataQuery.isError) return <div>Error: {getDocumentDataQuery.error.message}</div>;

  const saveDoc: EditorComponentProps['saveDocumentData'] = async (snapshot) => {
    try {
      console.log('Saving snapshot:', snapshot);
      await storeDocumentMutation.mutateAsync({ snapshot, documentId: documentId });
      return true;
    } catch (error) {
      console.error("Error saving document:", error);
      return false;
    }
  };

  return (
    <div>
      <main>
        <EditorComponent 
          document={document} 
          saveDocumentData={saveDoc} 
        />
      </main>
    </div>
  );
}
