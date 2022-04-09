export enum NodeType {
  Inuput = 'input',
  Output = 'output',
  TextArea = 'textArea',
}

export type FlowNode = {
  id: string;
  type: NodeType;
  data: {
    title: string;
  };
  position: { x: number; y: number };
};

export type ContentShape = {
  raw: string;
  created_at: string;
  updated_at: string | null;
  title: string;
  id: string;
};
