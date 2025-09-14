'use client';

import {
  Editor,
  getSnapshot,
  loadSnapshot,
  Tldraw,
  createTLStore,
  TLStoreSnapshot,
} from '@tldraw/tldraw';
import 'tldraw/tldraw.css';
import { useCallback, useState } from 'react';
import { IDocument } from '@/types/trpc';
import DocumentHeader from './documentHeader/documentHeader';
import { useRouter } from 'next/navigation';

export interface EditorComponentProps {
  document: IDocument;
  storeDocument: (document: IDocument) => Promise<boolean>;
}

export default function EditorComponent({ document, storeDocument }: EditorComponentProps) {
  const [editor, setEditor] = useState<Editor>();
  const router = useRouter();

  const [store] = useState(() => {
    const newStore = createTLStore();
    if (document?.snapshot) {
      const snapshot = document.snapshot;
      loadSnapshot(newStore, snapshot);
    } else {
      console.log('No snapshot to apply');
    }
    return newStore;
  });

  const setAppToState = useCallback((editor: Editor) => {
    setEditor(editor);
  }, []);

  const backToHome = () => {
    router.push('/');
  };

  const handleSaveDocument = async () => {
    if (editor) {
      const editorSnapshot = getSnapshot(editor.store);
      const storeSnapshot: TLStoreSnapshot = editorSnapshot.document;
      await storeDocument({ documentId: document?.documentId, snapshot: storeSnapshot });
    }
  };

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, background: 'white' }}>
        <DocumentHeader
          document={document}
          onSaveSnapshot={handleSaveDocument}
          backToHome={backToHome}
        />
        <Tldraw store={store} onMount={setAppToState} />
      </div>
    </>
  );
}
