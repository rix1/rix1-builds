import create, { GetState, SetState } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateUUID } from './generateUUID';
import { ContentShape } from './types';

export type StoreSlice<T extends object, E extends object = T> = (
  set: SetState<E extends T ? E : E & T>,
  get: GetState<E extends T ? E : E & T>,
) => T;

const emptyContentNode = {
  raw: '',
  created_at: '',
  updated_at: null,
  title: '',
  id: '',
};

function createContentNode(id: string) {
  return {
    ...emptyContentNode,
    id: id,
    created_at: new Date().toISOString(),
  };
}

interface IContentActionsSlice {
  setContent: (id: string, content: ContentShape) => void;
  getContent: (id: string) => ContentShape;
  addContent: () => ContentShape;
  deleteContent: (id: string) => void;
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
  addContent: () => {
    const newContent = createContentNode(generateUUID());
    set((prev) => ({
      ...prev,
      nodeContent: { ...prev.nodeContent, [newContent.id]: newContent },
    }));
    return newContent;
  },
  deleteContent: (id) => {
    const content = get().nodeContent;
    delete content[id];
    set((prev) => ({ ...prev, nodeContent: content }));
  },
});

const nodeContentSlice: StoreSlice<IContentSlice> = (set, get) => ({
  nodeContent: {},
});

const createRootSlice = (set: SetState<any>, get: GetState<any>) => ({
  ...nodeContentSlice(set, get),
  ...updateContentSlice(set, get),
});

export const useStore = create(
  persist(createRootSlice, {
    name: 'fw-local-v1',
    onRehydrateStorage: (state) => {
      // optional
      return (state, error) => {
        if (error) {
          console.log('an error happened during hydration', error);
        } else {
          console.log('hydration finished', state);
        }
      };
    },
  }),
);
