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
import { useHotkeys } from 'react-hotkeys-hook';
import DescriptionItem from './DescriptionItem';

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
      if (contentRef.current?.value) {
        setContent(id, { raw: contentRef.current.value });
      }
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
              {content.title || 'No title'}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {savedAt ? dayjs(savedAt).fromNow() : 'Not saved yet'}
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <DescriptionItem label="Node ID">{id}</DescriptionItem>
              <DescriptionItem label="Position" white>
                x: {Math.round(xPos)} y: {Math.round(yPos)}
              </DescriptionItem>
            </dl>
          </div>
        </div>
        <div className="text-right">
          <button
            ref={ref}
            className="w-full rounded-br-md rounded-bl-md bg-slate-700 py-2 text-slate-50 focus:bg-slate-500"
            onClick={openEditor}
          >
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
