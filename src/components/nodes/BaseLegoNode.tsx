import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { BLOCK_REGISTRY } from '../../config/blockRegistry';
import { LegoNodeData } from '../../types/lego';
import {
  KeyRound,
  Database,
  Sparkles,
  CreditCard,
  UploadCloud,
  GitFork,
  Trash2,
  Copy,
  Settings2,
  CheckCircle2,
  CircleDot,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  KeyRound,
  Database,
  Sparkles,
  CreditCard,
  UploadCloud,
  GitFork,
};

interface BaseLegoNodeProps extends NodeProps {
  children?: React.ReactNode;
  onOpenSettings?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
}

export const BaseLegoNode: React.FC<BaseLegoNodeProps> = ({
  data,
  selected,
  children,
  onOpenSettings,
  onDuplicate,
  onDelete,
}) => {
  const nodeData = data as unknown as LegoNodeData;
  const blockMeta = BLOCK_REGISTRY[nodeData.blockType] || BLOCK_REGISTRY.login;
  const IconComponent = ICON_MAP[blockMeta.icon] || CircleDot;

  return (
    <div className={`retro-node ${selected ? 'is-selected' : ''}`}>
      <div className="retro-node-windowbar">
        <div className="retro-node-controls"><i /><i /><i /></div>
        <span>LEGO • {blockMeta.type.toUpperCase()}</span>
      </div>

      <div className="retro-node-heading">
        <div className="retro-node-identity">
          <div className="retro-node-icon"><IconComponent size={21} /></div>
          <div>
            <h4>{nodeData.title || blockMeta.title}</h4>
            <span className="retro-node-badge">{blockMeta.badge}</span>
          </div>
        </div>

        <div className="retro-node-actions">
          {onOpenSettings && (
            <button title="Configure block" type="button" onClick={(e) => { e.stopPropagation(); onOpenSettings(); }}>
              <Settings2 size={14} />
            </button>
          )}
          {onDuplicate && (
            <button title="Duplicate block" type="button" onClick={(e) => { e.stopPropagation(); onDuplicate(); }}>
              <Copy size={14} />
            </button>
          )}
          {onDelete && (
            <button title="Delete block" type="button" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="retro-node-content">
        {children}
        <div className="retro-node-foot">
          <span>● Inputs</span>
          <span className="retro-ready">Ready <CheckCircle2 size={13} /></span>
          <span>Outputs ●</span>
        </div>
      </div>

      {blockMeta.handles.map((h) => {
        let position = Position.Left;
        if (h.position === 'right') position = Position.Right;
        if (h.position === 'top') position = Position.Top;
        if (h.position === 'bottom') position = Position.Bottom;

        return (
          <Handle
            key={h.id}
            type={h.type}
            position={position}
            id={h.id}
            style={{
              width: 13,
              height: 13,
              borderRadius: 0,
              backgroundColor: '#f75999',
              border: '3px solid #111111',
              zIndex: 10,
            }}
            className="retro-handle"
          />
        );
      })}
    </div>
  );
};
