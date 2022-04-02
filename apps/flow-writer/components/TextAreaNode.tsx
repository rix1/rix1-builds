import { useCallback, useEffect, useRef, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { CheckIcon, PaperClipIcon } from '@heroicons/react/outline';

import usePortal from 'react-useportal';
import debounce from '../lib/debuounce';
import { useStore } from '../lib/store';
import clsx from 'clsx';
import dayjs from 'dayjs';
import SaveIndicator from './SaveIndicator';
import Editor from './Editor';

type TextAreaNodeProps = {
  data: {
    label: string;
  };
  id: string;
};

function TextAreaNode({ data, id, ...rest }: TextAreaNodeProps) {
  const content = useStore((state) => state.getContent(id));
  const setContent = useStore((store) => store.setContent);
  const [savedAt, setSavedAt] = useState(null);
  const [isWriting, setIsWriting] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>();

  const { ref, openPortal, closePortal, isOpen, Portal } = usePortal({
    bindTo: document && document.getElementById('editor-root'),
  });

  const debouncedOnChange = useCallback(
    debounce((event) => {
      setIsWriting(false);
      setSavedAt(new Date().getTime());
      // if (contentRef.current?.value) {
      setContent(id, { raw: contentRef.current.value });
      // }
    }, 300),
    [],
  );

  const handleContentChange = useCallback((event) => {
    setIsWriting(true);
  }, []);

  const openEditor = useCallback((evt) => {
    openPortal();
  }, []);

  const { xPos, yPos, type, selected } = rest;

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div
        className={clsx(
          'rounded-md bg-white text-left shadow-md ring-1 ring-slate-200',
          selected && 'ring-slate-500',
        )}
      >
        <div className="overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Node {id}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{}</p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Position</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <code>
                    x: {Math.round(xPos)} y: {Math.round(yPos)}
                  </code>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Last updated
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {savedAt ? dayjs(savedAt).fromNow() : 'Not saved yet'}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Content length
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {content.raw.length} characters
                </dd>
              </div>
              <div className="border-t bg-white px-4 py-5 italic sm:px-6">
                <p>{content?.raw.slice(0, 50)}...</p>
              </div>
            </dl>
          </div>
        </div>
        <div className="text-right">
          <button ref={ref} className="mt-4 mr-4 mb-4" onClick={openEditor}>
            Edit
          </button>
        </div>
        {isOpen && (
          <Portal className="relative h-full w-full bg-red-300">
            <div className="nodrag fixed top-0 right-0 bottom-0 w-1/2 bg-slate-100 shadow-xl ring-1 ring-slate-200 ">
              <SaveIndicator shouldHide={isWriting} lastSavedAt={savedAt} />
              <Editor
                ref={contentRef}
                defaultValue={content.raw}
                onChange={(event) => {
                  handleContentChange(event);
                  debouncedOnChange(event);
                }}
              />
            </div>
          </Portal>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}

export default TextAreaNode;
