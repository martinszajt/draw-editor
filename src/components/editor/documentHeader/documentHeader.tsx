'use client';

import { IDocument } from '@/types/trpc';
import { Button } from '@/components/ui/button';
import { House, Save, File } from 'lucide-react';

export interface EditorComponentProps {
  document?: IDocument;
  onSaveSnapshot: () => void;
  backToHome: () => void;
}

export const DocumentHeader = ({ document, onSaveSnapshot, backToHome }: EditorComponentProps) => {
  return (
    <div className="z-100 fixed w-full flex items-center justify-center">
      <div
        className="z-100 flex items-center justify-center bg-[#0a0a0a] p-2 rounded-b-lg
"
      >
        <Button className="mr-2" variant="secondary" onClick={backToHome}>
          <House />
          All Files
        </Button>
        <p className="p-2 flex items-center mr-4">
          <File className="mr-2" />
          {document?.documentId}
        </p>

        <Button variant="secondary" onClick={onSaveSnapshot}>
          <Save />
          Save File
        </Button>
      </div>
    </div>
  );
};
