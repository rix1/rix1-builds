import { useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import usePortal from 'react-useportal';

type TextAreaNodeProps = {
  data: {
    label: string;
  };
};

function TextAreaNode({ data }: TextAreaNodeProps) {
  const { ref, openPortal, closePortal, isOpen, Portal } = usePortal({
    bindTo: document && document.getElementById('editor-root'),
    // onOpen({ portal }) {
    //   portal.current.className =
    //     'fixed right-0 top-0 bottom-0 z-10 h-full w-3/5 bg-slate-100';
    // },
    // onClose({ portal }) {
    //   portal.current.className = '';
    // },
  });

  const onChange = useCallback((evt) => {
    // console.log(evt.target.value);
  }, []);

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
          onChange={onChange}
        />
        <div className="text-right">
          <button ref={ref} className="mt-2" onClick={handleEdit}>
            Edit
          </button>
        </div>
        {isOpen && (
          <Portal className="h-full w-full bg-red-300">
            <textarea className="fixed top-0 right-0 bottom-0 w-1/2 resize-none bg-slate-100 p-3 shadow-xl ring-1 ring-slate-200" />
          </Portal>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}

export default TextAreaNode;
