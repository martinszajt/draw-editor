'use client';

import {
  Editor,
  getSnapshot,
  loadSnapshot,
  Tldraw,
  createTLStore,
  TLStoreSnapshot,
  TLUiOverrides,
  TLUiActionItem,
  TLUiActionsContextType,
  TLComponents,
} from '@tldraw/tldraw';
import 'tldraw/tldraw.css';
import { useCallback, useState } from 'react';
import { IDocument } from '@/types/trpc';
import DocumentHeader from './documentHeader/documentHeader';
import { useRouter } from 'next/navigation';

export interface EditorComponentProps {
  document?: IDocument;
  saveDocumentData: (snapshot: TLStoreSnapshot) => Promise<boolean>;
}

export default function EditorComponent({ document, saveDocumentData }: EditorComponentProps) {
  const [editor, setEditor] = useState<Editor>();
  const router = useRouter();
  const [store] = useState(() => {
    const newStore = createTLStore();

    if (document?.documentData) {
      const snapshot = document.documentData;
      console.log('Applying snapshot', snapshot);
      loadSnapshot(newStore, snapshot);
    } else {
      console.log('No snapshot to apply');
    }

    return newStore;
  });

  const backToHome = () => {
    router.push('/');
  };
  const save = async () => {
    if (editor) {
      const editorSnapshot = getSnapshot(editor.store);
      const storeSnapshot: TLStoreSnapshot = editorSnapshot.document;
      console.log('Saving store snapshot', storeSnapshot);
      await saveDocumentData(storeSnapshot);
    }
  };

  const setAppToState = useCallback((editor: Editor) => {
    setEditor(editor);
  }, []);

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, background: 'white' }}>
        <DocumentHeader document={document} saveDocumentData={save} backToHome={backToHome} />
        <Tldraw store={store} onMount={setAppToState} />
      </div>
    </>
  );
}
