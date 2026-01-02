import { useState } from 'react';
import Tree from './components/Tree';
import { Workflow, NodeType } from './types/workflow';
import { uid } from './utils/uid';
import './styles/app.css';

const initialWorkflow: Workflow = {
  start: { id: 'start', type: 'action', label: 'Start', children: [] },
};

export default function App() {
  const [workflow, setWorkflow] = useState<Workflow>(initialWorkflow);

  const addNode = (parentId: string, type: NodeType) => {
    const id = uid();
    setWorkflow((prev) => ({
      ...prev,
      [id]: { id, type, label: type, children: [] },
      [parentId]: {
        ...prev[parentId],
        children: [...prev[parentId].children, id],
      },
    }));
  };

  const deleteNode = (id: string) => {
    setWorkflow((prev) => {
      const flow = { ...prev };
      const parent = Object.values(flow).find((n) =>
        n.children.includes(id)
      );
      if (parent) parent.children = parent.children.filter((c) => c !== id);
      delete flow[id];
      return flow;
    });
  };

  const editNode = (id: string, label: string) => {
    setWorkflow((prev) => ({
      ...prev,
      [id]: { ...prev[id], label },
    }));
  };

  return (
    <div className="app">
      <h2>Workflow Builder</h2>
      <button onClick={() => console.log(workflow)}>Save Workflow</button>
      <Tree
        nodeId="start"
        workflow={workflow}
        onAdd={addNode}
        onDelete={deleteNode}
        onEdit={editNode}
      />
    </div>
  );
}