/**
 * I'm thinking we can use this if we're in a "demo mode", prefilling the canvas
 * with some nodes if nothing is available in the storage.
 */

import { NodeType } from '../types';

export const initialEdges = [
  // { id: 'e1-2', source: '1', target: '2' },
  // { id: 'e2-3', source: '2', target: '3' },
];

export const initialNodes = [
  {
    id: '1',
    type: NodeType.Inuput,
    data: { label: 'Start' },
    position: { x: 0, y: 25 },
  },
  {
    id: '2',
    type: NodeType.TextArea,
    // you can also pass a React component as a label
    data: { label: 'rikard' },
    position: { x: 0, y: 125 },
  },
  {
    id: '3',
    type: NodeType.Output,
    data: { label: 'End' },
    position: { x: 0, y: 550 },
  },
];
