import clsx from 'clsx';
import dayjs from 'dayjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import usePortal from 'react-useportal';
import debounce from '../lib/debounce';
import { useStore } from '../lib/store';
import DescriptionItem from './DescriptionItem';
import Editor from './Editor';
import GradientBackdrop from './GradientBackdrop';
import NodeTitle from './NodeTitle';
import SaveIndicator from './SaveIndicator';

type TextAreaNodeProps = {
  data: {
    label: string;
  };
  id: string;
  xPos: number;
  yPos: number;
  selected: boolean;
};

function TextAreaNode({ data, id, xPos, yPos, selected }: TextAreaNodeProps) {
  const nodeContent = useStore((state) => state.getContent(id));
  const setContent = useStore((store) => store.setContent);

  const [isWriting, setIsWriting] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const { ref, openPortal, isOpen, Portal } = usePortal({
    bindTo: (document && document.getElementById('editor-root')) || undefined,
  });

  const debouncedOnChange = useCallback(() => {
    return debounce(() => {
      setIsWriting(false);
      if (editorRef.current?.value) {
        setContent(id, {
          ...nodeContent,
          raw: editorRef.current.value,
        });
      }
    }, 300);
  }, [nodeContent, id, setContent]);

  useEffect(() => {
    if (isOpen && editorRef.current) {
      editorRef.current.focus();
    }
  }, [isOpen]);

  const handleContentChange = useCallback((event) => {
    setIsWriting(true);
  }, []);

  const openEditor = useCallback(
    (evt) => {
      openPortal();
    },
    [openPortal],
  );

  const { updated_at, created_at } = nodeContent;

  return (
    <div className="relative">
      <GradientBackdrop active={selected} />
      <Handle type="target" position={Position.Top} />
      <div
        className={clsx(
          'w-80 rounded-md bg-white text-left shadow-xl',
          selected && 'ring-1 ring-white',
        )}
      >
        <div className="overflow-y-scroll">
          <div className="px-4 py-5 sm:px-6">
            <NodeTitle nodeId={id} />

            <p className="mt-1 text-sm text-gray-500">
              {updated_at ? dayjs(updated_at).fromNow() : 'Not saved yet'}
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <DescriptionItem label="Created" white>
                {dayjs(created_at).format('ddd D of MMM YYYY')}
              </DescriptionItem>
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
            className="w-full rounded-br-md rounded-bl-md bg-gradient-to-br from-yellow-400 to-red-400 py-2 text-slate-50 focus:bg-slate-500"
            onClick={openEditor}
          >
            Edit
          </button>
        </div>
        {isOpen && (
          <Portal className="relative h-full w-full bg-red-300">
            <div className="nodrag fixed top-0 right-0 bottom-0 w-1/2 bg-slate-100 shadow-xl ring-1 ring-slate-200">
              <SaveIndicator shouldHide={isWriting} lastSavedAt={updated_at} />
              <Editor
                ref={editorRef}
                defaultValue={nodeContent.raw}
                onChange={(event) => {
                  handleContentChange(event);
                  debouncedOnChange();
                }}
              />
            </div>
          </Portal>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default TextAreaNode;
