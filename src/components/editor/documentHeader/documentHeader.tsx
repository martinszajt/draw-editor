'use client';

import { IDocument } from '@/types/trpc';
import { Button } from '@/components/ui/button';
import { House, Save, File, PaintBucket } from 'lucide-react';
import { PromptDialog } from './promptDialog/promptDialog';

export interface EditorComponentProps {
  document?: IDocument;
  onSaveSnapshot: () => void;
  backToHome: () => void;
  onRandomColor: () => void;
  onGenerateImage: (prompt: string) => void;
}

export const DocumentHeader = ({
  document,
  onSaveSnapshot,
  backToHome,
  onRandomColor,
  onGenerateImage,
}: EditorComponentProps) => {
  return (
    <div className="z-100 fixed w-full flex items-center justify-center">
      <div
        className="z-100 flex items-center justify-center bg-[#0a0a0a] p-2 rounded-b-lg gap-2 flex-wrap
"
      >
        <Button className="mr-2" variant="outline" onClick={backToHome}>
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
        <Button variant="secondary" onClick={onRandomColor}>
          <PaintBucket />
          Random Color
        </Button>
        <PromptDialog onConfirm={onGenerateImage} />
      </div>
    </div>
  );
};
