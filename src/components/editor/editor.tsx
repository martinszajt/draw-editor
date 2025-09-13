"use client";

import { Editor, getSnapshot, loadSnapshot, Tldraw, createTLStore, TLStoreSnapshot } from "@tldraw/tldraw";
import 'tldraw/tldraw.css'
import { useCallback, useState } from "react";

export interface EditorComponentProps {
  documentData?: {
    documentData?: TLStoreSnapshot;
  };
  saveDocumentData: (snapshot: TLStoreSnapshot) => Promise<boolean>;
}

export default function EditorComponent({ documentData, saveDocumentData }: EditorComponentProps) {
  const [editor, setEditor] = useState<Editor>();
  
  const [store] = useState(() => {
    const newStore = createTLStore();

    if (documentData?.documentData) {
      const snapshot = documentData.documentData;
      console.log('Applying snapshot', snapshot);
      loadSnapshot(newStore, snapshot);
    } else {
      console.log('No snapshot to apply');
    }

    return newStore;
  });

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
      <button 
        style={{ position: 'absolute', zIndex: 10000, background: 'red', cursor: 'pointer', bottom: 0, right: 0, padding: '32px'}} 
        onClick={save}
      >
        Save
      </button>
      <div style={{ position: 'fixed', inset: 0, background: 'white' }}>
        <Tldraw store={store} onMount={setAppToState}/>
      </div>
    </>
  );
}
