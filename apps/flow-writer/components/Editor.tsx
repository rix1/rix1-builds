import { Switch } from '@headlessui/react';
import { forwardRef, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type EditorProps = {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  defaultValue: string;
};

const Editor = ({ onChange, defaultValue }: EditorProps, editorRef) => {
  const [preview, setPreview] = useState(false);
  useHotkeys(
    'cmd+shift+p',
    (event) => {
      event.preventDefault();
      setPreview((prev) => !prev);
    },
    {
      enableOnTags: ['TEXTAREA'],
    },
  );

  useEffect(() => {
    if (!preview) {
      const end = editorRef.current.value.length;
      editorRef.current.setSelectionRange(end, end);
      editorRef.current.focus();
    }
  }, [preview]);

  return (
    <>
      <div className="absolute right-2 top-2 flex">
        <span className="mr-2">Preview</span>
        <Switch
          checked={preview}
          onChange={setPreview}
          className={`${
            preview ? 'bg-green-400' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span
            className={`${
              preview ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white`}
          />
        </Switch>
      </div>
      {preview ? (
        <div className="prose h-full w-full resize-none bg-transparent px-6 py-4">
          <ReactMarkdown children={defaultValue} remarkPlugins={[remarkGfm]} />
        </div>
      ) : (
        <textarea
          className="h-full w-full resize-none bg-transparent px-6 py-4 font-mono"
          defaultValue={defaultValue}
          ref={editorRef}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default forwardRef(Editor);
