'use client';

import { IDocument } from '@/types/trpc';

import { Card, CardAction, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export interface DocumentPreviewCardProps {
  document: IDocument;
}

export default function DocumentPreviewCard({ document }: DocumentPreviewCardProps) {
  return (
    <Card className="mb-4">
      <CardContent>
        <CardTitle>{document.documentId}</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>
          <Link target={'_blank'} href={`/editor/${document.documentId}`}>
            Edit
          </Link>
        </CardAction>
      </CardContent>
    </Card>
  );
}
