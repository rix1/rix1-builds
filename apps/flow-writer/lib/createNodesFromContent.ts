import { ContentShape, FlowNode, NodeType } from './types';

export function createNodesFromContent(
  content: {
    [id: string]: ContentShape;
  },
  type: NodeType,
): FlowNode[] {
  return Object.keys(content).map((key, index) => ({
    id: key,
    type: type,
    data: {
      ...content[key],
    },
    position: {
      y: 0,
      x: index * 380,
    },
  }));
}
