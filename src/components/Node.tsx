import { WorkflowNode, NodeType } from '../types/workflow';

type Props = {
  node: WorkflowNode;
  onAdd: (id: string, type: NodeType) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, label: string) => void;
};

export default function Node({ node, onAdd, onDelete, onEdit }: Props) {
  return (
    <div className={'node ' + node.type}>
      <input
        value={node.label}
        onChange={(e) => onEdit(node.id, e.target.value)}
      />

      {node.type !== 'end' && (
        <div className="actions">
          <button onClick={() => onAdd(node.id, 'action')}>+ Action</button>
          <button onClick={() => onAdd(node.id, 'branch')}>+ Branch</button>
          <button onClick={() => onAdd(node.id, 'end')}>+ End</button>
        </div>
      )}

      {node.id !== 'start' && (
        <button className="delete" onClick={() => onDelete(node.id)}>
          Delete
        </button>
      )}
    </div>
  );
}