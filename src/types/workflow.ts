export type NodeType = 'action' | 'branch' | 'end';

export type WorkflowNode = {
  id: string;
  type: NodeType;
  label: string;
  children: string[];
};

export type Workflow = Record<string, WorkflowNode>;