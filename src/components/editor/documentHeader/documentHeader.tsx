"use client";

import { Editor, getSnapshot, loadSnapshot, Tldraw, createTLStore, TLStoreSnapshot, TLUiOverrides, TLUiActionItem, TLUiActionsContextType, TLComponents } from "@tldraw/tldraw";
import 'tldraw/tldraw.css'
import { useCallback, useState } from "react";
import { IDocument } from "@/types/trpc";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { House, Save } from "lucide-react";

export interface EditorComponentProps {
  document?: IDocument
  saveDocumentData: () => void;
  backToHome: () => void;
}

export default function DocumentHeader({ document, saveDocumentData, backToHome }: EditorComponentProps) {


  return (
    <div className="z-100 fixed w-full flex items-center justify-center">
          <div className="z-100 flex items-center justify-center bg-[#0a0a0a] p-2 rounded-b-lg
">
  <Toaster theme="dark" />
                <p className="p-2">

          {document?.documentId}
              </p>


                <Button
              className="mr-2"

      variant="secondary"
      onClick={backToHome}

    >
      <House />
      All Files

    </Button>

          <Button

      variant="secondary"
      onClick={saveDocumentData}
    >
      <Save />
      Save File
    </Button>
          </div>

    </div>
  );
}
