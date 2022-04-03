import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { FlowNode, useStore } from '../lib/store';

type NodeTitleProps = {
  nodeId: FlowNode['id'];
};

const NodeTitle = ({ nodeId }: NodeTitleProps) => {
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>();
  const nodeContent = useStore((store) => store.getContent(nodeId));
  const updateContent = useStore((store) => store.setContent);

  useEffect(() => {
    if (edit) {
      inputRef.current.focus();
    }
  }, [edit]);

  const handleSave = () => {
    setEdit(false);
    updateContent(nodeId, { ...nodeContent, title: inputRef.current.value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSave();
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex">
      <h3
        className={clsx(
          'border-b text-lg font-medium leading-6 text-gray-900',
          edit ? 'border-slate-600' : 'border-transparent',
        )}
      >
        {edit ? (
          <input
            defaultValue={nodeContent.title}
            className="outline-none"
            placeholder="Give it a name"
            ref={inputRef}
          />
        ) : (
          nodeContent.title || 'No title'
        )}
      </h3>
      {!edit && (
        <button
          onClick={() => setEdit(true)}
          className="ml-auto text-sm text-blue-600"
        >
          edit
        </button>
      )}
      {edit && (
        <button type="submit" className="ml-auto text-sm text-blue-600">
          save
        </button>
      )}
    </form>
  );
};

export default NodeTitle;
