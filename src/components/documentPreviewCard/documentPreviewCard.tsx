'use client';

import { IDocument } from '@/types/trpc';

import { Card, CardAction, CardContent, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { TldrawImage } from '@tldraw/tldraw';
import { File, Pencil } from 'lucide-react';

export interface DocumentPreviewCardProps {
  document: IDocument;
}

export default function DocumentPreviewCard({ document }: DocumentPreviewCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale h-24 p-2 b">
          {document.snapshot && <TldrawImage snapshot={document.snapshot} />}
        </div>
        <CardTitle className="flex items-center">
          <File className="mr-2" />
          {document.documentId}
        </CardTitle>
        <CardAction>
          <Link
            className="flex items-center"
            target={'_blank'}
            href={`/editor/${document.documentId}`}
          >
            <Pencil className="mr-2" />
            Edit
          </Link>
        </CardAction>
      </CardContent>
    </Card>
  );
}
