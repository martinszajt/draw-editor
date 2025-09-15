'use client';

import {
  Editor,
  getSnapshot,
  loadSnapshot,
  Tldraw,
  createTLStore,
  TLStoreSnapshot,
  AssetRecordType,
  TLUiComponents,
} from '@tldraw/tldraw';
import 'tldraw/tldraw.css';
import { useCallback, useState } from 'react';
import { IDocument } from '@/types/trpc';
import { DocumentHeader } from './documentHeader/documentHeader';
import { useRouter } from 'next/navigation';
import { APP_URL, routes } from '@/utils/routes';
import { getRandomColor } from '@/utils/colors';

const components: Partial<TLUiComponents> = {
	MenuPanel: null,
}

export interface EditorComponentProps {
  document: IDocument;
  storeDocument: (document: IDocument) => Promise<boolean>;
  generateImage: (prompt: string) => Promise<string | boolean>;
}

export const EditorComponent = ({
  document,
  storeDocument,
  generateImage,
}: EditorComponentProps) => {
  const [editor, setEditor] = useState<Editor>();
  const router = useRouter();

  const [store] = useState(() => {
    const newStore = createTLStore();
    if (document?.snapshot) {
      const snapshot = document.snapshot;
      loadSnapshot(newStore, snapshot);
    }
    return newStore;
  });

  const setAppToState = useCallback((editor: Editor) => {
    setEditor(editor);
  }, []);

  const backToHome = () => {
    router.push(routes.home);
  };

  const randomEditShape = () => {
    if (editor) {
      const selected = editor.getSelectedShapes();

      if (selected.length === 0) return;

      selected.forEach((shape) => {
        editor.updateShape({
          id: shape.id,
          type: shape.type,
          props: { ...shape.props, color: getRandomColor()},
          meta: {
            ...shape.meta,
          },
        });
      });
    }
  };

  const handleGenerateImage = async (prompt: string) => {
    const image = await generateImage(prompt);
    if (editor && image && typeof(image) === 'string') {
      const assetId = AssetRecordType.createId();
      const imageWidth = 400;
      const imageHeight = 400;
      editor.createAssets([
        {
          id: assetId,
          type: 'image',
          typeName: 'asset',
          props: {
            name: prompt,
            src: `${APP_URL}/api/proxy-image?url=${encodeURIComponent(image)}`,
            w: imageWidth,
            h: imageHeight,
            mimeType: 'image/webp',
            isAnimated: false,
          },
          meta: {},
        },
      ]);
      editor.createShape({
        type: 'image',
        x: (window.innerWidth - imageWidth) / 2,
        y: (window.innerHeight - imageHeight) / 2,
        props: {
          assetId,
          w: imageWidth,
          h: imageHeight,
        },
      });
    }
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
          onRandomColor={randomEditShape}
          onGenerateImage={handleGenerateImage}
        />
        <Tldraw store={store} onMount={setAppToState} components={components} />
      </div>
    </>
  );
};
