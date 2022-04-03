import {
  DocumentTextIcon,
  PlusCircleIcon,
  PlusSmIcon,
} from '@heroicons/react/outline';
import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  useEdgesState,
  useNodesState,
  Controls,
} from 'react-flow-renderer';
import { generateUUID } from '../lib/generateUUID';
import { initialEdges, initialNodes, NodeType, useStore } from '../lib/store';

import TextAreaNode from './TextAreaNode';

const nodeTypes = {
  textArea: TextAreaNode,
};

type FlowRootProps = {};

const FlowRoot = ({}: FlowRootProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );
  const [mounted, setMounted] = useState(false);

  const addNewNode = () => {
    setNodes([
      ...nodes,
      {
        id: generateUUID(),
        type: NodeType.TextArea,
        // you can also pass a React component as a label
        data: { label: 'lol' },
        position: { x: 500, y: 125 },
      },
    ]);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      onConnect={onConnect}
      fitView
    >
      {mounted && <Background />}

      <Controls>
        <button
          className="flex h-[26px] w-[27px] items-center justify-center bg-white p-1 hover:bg-slate-100"
          onClick={addNewNode}
        >
          <DocumentTextIcon className="max-h-[18px] w-full max-w-[18px]" />
        </button>
      </Controls>
    </ReactFlow>
  );
};

export default FlowRoot;
