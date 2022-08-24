import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  useEdgesState,
  useNodesState,
} from 'react-flow-renderer';
import { createNodesFromContent } from '../lib/createNodesFromContent';
import { useStore } from '../lib/store';
import { NodeType } from '../lib/types';
import CustomControls from './CustomControls';
import TextAreaNode from './TextAreaNode';

const nodeTypes = {
  textArea: TextAreaNode,
};

type FlowRootProps = {};

const FlowRoot = ({}: FlowRootProps) => {
  const content = useStore((store) => store.nodeContent);
  const deleteContent = useStore((store) => store.deleteContent);
  const [nodes, onNodesChange] = useNodesState(
    createNodesFromContent(content, NodeType.TextArea),
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const handleChange = useCallback((changes) => {
    const deleteChanges = changes.filter(
      ({ type }: { type: string }) => type === 'remove',
    );

    deleteChanges.forEach((toBeDeleted: { id: string }) => {
      deleteContent(toBeDeleted.id);
    });

    onNodesChange(changes);
  }, []);

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
      onNodesChange={handleChange}
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
