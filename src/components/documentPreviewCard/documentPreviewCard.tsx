'use client';

import { IDocument } from '@/types/trpc';

import { Card, CardAction, CardContent, CardTitle } from '@/components/ui/card';
import { TldrawImage } from '@tldraw/tldraw';
import { File, Pencil } from 'lucide-react';
import { Button } from '../ui/button';

export interface DocumentPreviewCardProps {
  document: IDocument;
  onDeleteDocument: (documentId: string) => Promise<boolean>;
  onEditDocument: (documentId: string) => void;
}

export default function DocumentPreviewCard({
  document,
  onDeleteDocument,
  onEditDocument,
}: DocumentPreviewCardProps) {
  return (
    <Card>
      <CardContent>
        <CardTitle className="flex items-center">
          <File className="mr-2" />
          {document.documentId}
        </CardTitle>
        <div className="w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale h-24 p-2 b">
          {document.snapshot && <TldrawImage snapshot={document.snapshot} />}
        </div>

        <CardAction className="flex w-full">
          <Button
            variant={'default'}
            className="flex-1 flex items-center p-1 m-1"
            onClick={() => onEditDocument(document.documentId)}
          >
            <Pencil className="mr-2" />
            Edit
          </Button>
          <Button
            className="flex-1 flex items-center p-1 m-1"
            onClick={() => onDeleteDocument(document.documentId)}
          >
            <Pencil className="mr-2" />
            Delete
          </Button>
        </CardAction>
      </CardContent>
    </Card>
  );
}
