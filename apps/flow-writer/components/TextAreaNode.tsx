import { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { CheckIcon } from '@heroicons/react/outline';

import usePortal from 'react-useportal';
import debounce from '../lib/debuounce';
import { useStore } from '../lib/store';
import clsx from 'clsx';
import dayjs from 'dayjs';

type TextAreaNodeProps = {
  data: {
    label: string;
  };
};

function TextAreaNode({ data, id }: TextAreaNodeProps) {
  const nodeData = useStore((state) => state.nodeContent);
  const [savedAt, setSavedAt] = useState(null);
  const [isWriting, setIsWriting] = useState(false);

  const { ref, openPortal, closePortal, isOpen, Portal } = usePortal({
    bindTo: document && document.getElementById('editor-root'),
  });

  useEffect(() => {
    console.log('isWriting', isWriting);
  }, [isWriting]);

  const debouncedOnChange = useCallback(
    debounce((evt) => {
      setIsWriting(false);
      setSavedAt(new Date().getTime());
    }, 500),
    [],
  );

  const handleEdit = useCallback((evt) => {
    openPortal();
    console.log('should edit');
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="rounded-md bg-white p-3 shadow-md ring-1 ring-slate-200">
        <label className="sr-only block text-left" htmlFor="text">
          Text:
        </label>
        <textarea
          id="text"
          className="h-32 w-48 bg-slate-50 p-3 text-slate-600"
          disabled
          name="text"
        />
        <div className="text-right">
          <button ref={ref} className="mt-2" onClick={handleEdit}>
            Edit
          </button>
        </div>
        {isOpen && (
          <Portal className="relative h-full w-full bg-red-300">
            <div className="nodrag fixed top-0 right-0 bottom-0 w-1/2 bg-slate-100 shadow-xl ring-1 ring-slate-200 ">
              <span
                className={clsx(
                  'absolute bottom-1 left-1 flex text-xs text-slate-400 transition duration-300 ease-in-out',
                  isWriting ? 'opacity-0' : 'opacity-100',
                )}
              >
                <CheckIcon className="mr-1 h-4 w-4" /> Saved{' '}
                {dayjs(savedAt).fromNow()}
              </span>
              <textarea
                onChange={() => {
                  setIsWriting(true);
                  debouncedOnChange();
                }}
                className="h-full w-full resize-none bg-transparent p-3"
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
