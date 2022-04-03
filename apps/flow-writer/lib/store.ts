import create, { GetState, SetState } from 'zustand';

export enum NodeType {
  Inuput = 'input',
  Output = 'output',
  TextArea = 'textArea',
}

export type StoreSlice<T extends object, E extends object = T> = (
  set: SetState<E extends T ? E : E & T>,
  get: GetState<E extends T ? E : E & T>,
) => T;

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

export type FlowNode = {
  id: string;
  type: NodeType;
  data: {
    label: string;
  };
  position: { x: number; y: number };
};

type ContentShape = {
  raw: string;
  created_at: string;
  updated_at: string | null;
  title: string;
  id: string;
};

const emptyContentNode = {
  raw: '',
  created_at: '',
  updated_at: null,
  title: '',
  id: '',
};

function createContentNode(id) {
  return {
    ...emptyContentNode,
    id: id,
    created_at: new Date().toISOString(),
  };
}

interface IContentActionsSlice {
  setContent: (id, content: ContentShape) => void;
  getContent: (id) => ContentShape;
}

interface IContentSlice {
  nodeContent: { [key: string]: ContentShape };
}

const updateContentSlice: StoreSlice<IContentActionsSlice, IContentSlice> = (
  set,
  get,
) => ({
  getContent: (id) => get().nodeContent[id] || createContentNode(id),
  setContent: (id, content) =>
    set((prev) => ({
      ...prev,
      nodeContent: {
        ...prev.nodeContent,
        [id]: { ...content, updated_at: new Date().toISOString() },
      },
    })),
});

const nodeContentSlice: StoreSlice<IContentSlice> = (set, get) => ({
  nodeContent: {},
});

const createRootSlice = (set: SetState<any>, get: GetState<any>) => ({
  ...nodeContentSlice(set, get),
  ...updateContentSlice(set, get),
});

export const useStore = create(createRootSlice);
