import create, { GetState, SetState } from 'zustand';

enum NodeType {
  Inuput = 'input',
  Output = 'output',
  TextArea = 'textArea',
}

const initialNodes = {
  '1': {
    id: '1',
    type: NodeType.Inuput,
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },

  '2': {
    id: '2',
    type: NodeType.TextArea,
    // you can also pass a React component as a label
    data: { label: 'rikard' },
    position: { x: 100, y: 125 },
  },
  '3': {
    id: '3',
    type: NodeType.Output,
    data: { label: 'Output Node' },
    position: { x: 450, y: 450 },
  },
};

const nodeIds = ['1', '2', '3'];

export type StoreSlice<T extends object, E extends object = T> = (
  set: SetState<E extends T ? E : E & T>,
  get: GetState<E extends T ? E : E & T>,
) => T;

interface INodeActionsSlice {
  addNode: (id, FlowNode) => void;
  updateNode: (id, FlowNode) => void;
}

const flowNodeActionsSlice: StoreSlice<INodeActionsSlice, INodeSlice> = (
  set,
  get,
) => ({
  addNode: (id, node) => set((prev) => ({ ...prev, [id]: node })),
  updateNode: (id, updatedFields) =>
    set((prev) => ({ ...prev, [id]: { ...prev[id], updatedFields } })),
});

type FlowNode = {
  id: string;
  type: NodeType;
  data: {
    label: string;
  };
  position: { x: number; y: number };
};

interface INodeSlice {
  byId: {
    [key: string]: FlowNode;
  };
  allIds: string[];
}

const flowNodeSlice: StoreSlice<INodeSlice> = (set, get) => ({
  byId: initialNodes,
  allIds: nodeIds,
});

type ContentShape = {
  raw: string;
};

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
  getContent: (id) => get().nodeContent[id] || { raw: '' },
  setContent: (id, content) =>
    set((prev) => ({
      ...prev,
      nodeContent: {
        ...prev.nodeContent,
        [id]: content,
      },
    })),
});

const nodeContentSlice: StoreSlice<IContentSlice> = (set, get) => ({
  nodeContent: {},
});

const createRootSlice = (set: SetState<any>, get: GetState<any>) => ({
  ...flowNodeActionsSlice(set, get),
  ...flowNodeSlice(set, get),
  ...nodeContentSlice(set, get),
  ...updateContentSlice(set, get),
});

export const useStore = create(createRootSlice);
