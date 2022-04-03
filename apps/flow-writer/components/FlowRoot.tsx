import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  useEdgesState,
  useNodesState,
} from 'react-flow-renderer';
import { initialEdges, initialNodes } from '../lib/store';
import CustomControls from './CustomControls';
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
        <CustomControls />
      </Controls>
    </ReactFlow>
  );
};

export default FlowRoot;
