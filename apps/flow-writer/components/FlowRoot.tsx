import { DocumentTextIcon } from '@heroicons/react/outline';
import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  useEdgesState,
  useNodesState,
} from 'react-flow-renderer';
import { useHotkeys } from 'react-hotkeys-hook';
import { generateUUID } from '../lib/generateUUID';
import { initialEdges, initialNodes, NodeType } from '../lib/store';
import HotkeyTooltip from './HotkeyTooltip';
import Kbd from './Kbd';
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

  const addNewNode = (event) => {
    event.preventDefault();
    setNodes([
      ...nodes,
      {
        id: generateUUID(),
        type: NodeType.TextArea,
        // you can also pass a React component as a label
        data: { label: 'lol' },
        position: {
          x:
            nodes.filter((node) => node.type === NodeType.TextArea).length *
            380,
          y: 125,
        },
      },
    ]);
  };

  useHotkeys('n', addNewNode);

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
        <HotkeyTooltip content={<Kbd>N</Kbd>} side="right" sideOffset={10}>
          <button
            className="flex h-[26px] w-[27px] items-center justify-center bg-white p-1 hover:bg-slate-100"
            onClick={addNewNode}
          >
            <DocumentTextIcon className="max-h-[18px] w-full max-w-[18px]" />
          </button>
        </HotkeyTooltip>
      </Controls>
    </ReactFlow>
  );
};

export default FlowRoot;
