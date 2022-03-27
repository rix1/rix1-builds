import { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  useEdgesState,
  useNodesState,
} from 'react-flow-renderer';

import TextAreaNode from './TextAreaNode';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },

  {
    id: '2',
    type: 'textArea',
    // you can also pass a React component as a label
    data: { label: 'rikard' },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 450, y: 450 },
  },
];

const nodeTypes = {
  textArea: TextAreaNode,
};

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  // { id: 'e2-3', source: '2', target: '3' },
];

type FlowRootProps = {};

const FlowRoot = ({}: FlowRootProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

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
      <Background />
    </ReactFlow>
  );
};

export default FlowRoot;
