import { Switch } from '@headlessui/react';
import useHotkeys from '@reecelucas/react-use-hotkeys';
import { forwardRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type EditorProps = {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  defaultValue: string;
};

const markdown = `A paragraph with *emphasis* and **strong importance**.


Sometimes!!


Hahah
`;

const Editor = ({ onChange, defaultValue }: EditorProps, ref) => {
  const [preview, setPreview] = useState(true);

  useHotkeys('Meta+Shift+p', () => {
    setPreview((prev) => !prev);
  });

  return (
    <>
      <div className="absolute right-2 top-2">
        <Switch
          checked={preview}
          onChange={setPreview}
          className={`${
            preview ? 'bg-green-400' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
              preview ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white`}
          />
        </Switch>
      </div>
      {preview ? (
        <div className="h-full w-full resize-none bg-transparent px-6 py-4 text-left text-xl">
          <ReactMarkdown children={defaultValue} remarkPlugins={[remarkGfm]} />
        </div>
      ) : (
        <textarea
          className="h-full w-full resize-none bg-transparent px-6 py-4 text-xl"
          defaultValue={defaultValue}
          ref={ref}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default forwardRef(Editor);
