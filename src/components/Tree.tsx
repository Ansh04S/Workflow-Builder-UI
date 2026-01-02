import Node from './Node';
import { Workflow } from '../types/workflow';

type Props = {
  nodeId: string;
  workflow: Workflow;
  onAdd: any;
  onDelete: any;
  onEdit: any;
};

export default function Tree({ nodeId, workflow, onAdd, onDelete, onEdit }: Props) {
  const node = workflow[nodeId];

  return (
    <div className="tree">
      <Node node={node} onAdd={onAdd} onDelete={onDelete} onEdit={onEdit} />
      {node.children.length > 0 && (
        <div className="children">
          {node.children.map((child) => (
            <Tree
              key={child}
              nodeId={child}
              workflow={workflow}
              onAdd={onAdd}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}