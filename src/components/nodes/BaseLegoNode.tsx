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
  id,
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
    <div
      className={`relative min-w-[270px] max-w-[320px] rounded-2xl bg-slate-900/95 backdrop-blur-md shadow-2xl transition-all duration-200 border-2 ${
        selected
          ? 'border-indigo-400 ring-4 ring-indigo-500/20 shadow-indigo-500/10 scale-[1.01]'
          : 'border-slate-800 hover:border-slate-700'
      }`}
    >
      {/* Lego Studs Strip along top */}
      <div className="flex items-center justify-between px-3 py-1 bg-slate-950/80 rounded-t-[14px] border-b border-slate-800/80">
        <div className="flex items-center space-x-1.5 py-0.5">
          {[0, 1, 2, 3].map((stud) => (
            <div
              key={stud}
              className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700 shadow-inner flex items-center justify-center"
              style={{
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), 0 1px 2px rgba(0,0,0,0.5)',
              }}
            >
              <div className="w-1 h-1 rounded-full bg-slate-600/50" />
            </div>
          ))}
        </div>
        <span className="text-[10px] font-mono tracking-wider font-semibold uppercase text-slate-500">
          LEGO • {blockMeta.type.toUpperCase()}
        </span>
      </div>

      {/* Header Bar */}
      <div
        className="px-3.5 py-2.5 flex items-center justify-between border-b border-slate-800/60"
        style={{
          background: `linear-gradient(90deg, ${blockMeta.accentColor}18 0%, rgba(15, 23, 42, 0.4) 100%)`,
        }}
      >
        <div className="flex items-center space-x-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-md border"
            style={{
              backgroundColor: `${blockMeta.accentColor}25`,
              borderColor: `${blockMeta.accentColor}60`,
              color: blockMeta.accentColor,
            }}
          >
            <IconComponent className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100 tracking-tight leading-snug">
              {nodeData.title || blockMeta.title}
            </h4>
            <span
              className="inline-block text-[9.5px] px-1.5 py-0.2 rounded font-medium border"
              style={{
                color: blockMeta.accentColor,
                borderColor: `${blockMeta.accentColor}40`,
                backgroundColor: `${blockMeta.accentColor}15`,
              }}
            >
              {blockMeta.badge}
            </span>
          </div>
        </div>

        {/* Hover/Selection Actions */}
        <div className="flex items-center space-x-1">
          {onOpenSettings && (
            <button
              title="Configure block"
              onClick={(e) => {
                e.stopPropagation();
                onOpenSettings();
              }}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Settings2 className="w-3.5 h-3.5" />
            </button>
          )}
          {onDuplicate && (
            <button
              title="Duplicate block"
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate();
              }}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          )}
          {onDelete && (
            <button
              title="Delete block"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-1 rounded hover:bg-red-950/60 text-slate-400 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Node Body / Configuration preview */}
      <div className="p-3 space-y-2.5 text-xs text-slate-300">
        {children}

        {/* Visual Handle labels guide */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <div className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500 inline-block" />
            <span>Inputs</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-emerald-400">Ready</span>
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          </div>
          <div className="flex items-center space-x-1">
            <span>Outputs</span>
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{ backgroundColor: blockMeta.accentColor }}
            />
          </div>
        </div>
      </div>

      {/* Render Dynamic Handles based on block definition */}
      {blockMeta.handles.map((h) => {
        let position = Position.Left;
        let style: React.CSSProperties = {
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: h.color || blockMeta.accentColor,
          border: '2px solid #0f172a',
          zIndex: 10,
        };

        if (h.position === 'right') position = Position.Right;
        if (h.position === 'top') position = Position.Top;
        if (h.position === 'bottom') position = Position.Bottom;

        return (
          <React.Fragment key={h.id}>
            <Handle
              type={h.type}
              position={position}
              id={h.id}
              style={style}
              className="hover:scale-125 transition-transform cursor-crosshair shadow-md"
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};
