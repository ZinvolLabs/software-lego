import React from 'react';
import { NodeProps } from '@xyflow/react';
import { BaseLegoNode } from './BaseLegoNode';
import { GitFork, Check, X } from 'lucide-react';
import { LegoNodeData } from '../../types/lego';

export const ConditionNode: React.FC<NodeProps> = (props) => {
  const data = props.data as unknown as LegoNodeData;
  const config = data?.config || {};

  return (
    <BaseLegoNode {...props}>
      <div className="space-y-2">
        <div className="flex items-center justify-between bg-slate-950/60 p-2 rounded-lg border border-slate-800">
          <div className="flex items-center space-x-2 text-[11px] text-slate-300">
            <GitFork className="w-3.5 h-3.5 text-orange-400" />
            <span className="font-mono text-slate-400">If:</span>
            <span className="font-semibold text-orange-300 font-mono text-[10.5px]">
              {config.fieldKey || 'user.isPremium'} == {config.expectedValue || 'true'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-[10px]">
          <div className="bg-emerald-950/30 p-1.5 rounded border border-emerald-900/40 flex items-center space-x-1.5">
            <Check className="w-3 h-3 text-emerald-400 shrink-0" />
            <div>
              <span className="text-emerald-400 font-medium block">Branch A</span>
              <span className="font-mono text-slate-400 text-[9px]">Right Handle</span>
            </div>
          </div>
          <div className="bg-rose-950/30 p-1.5 rounded border border-rose-900/40 flex items-center space-x-1.5">
            <X className="w-3 h-3 text-rose-400 shrink-0" />
            <div>
              <span className="text-rose-400 font-medium block">Branch B</span>
              <span className="font-mono text-slate-400 text-[9px]">Bottom Handle</span>
            </div>
          </div>
        </div>
      </div>
    </BaseLegoNode>
  );
};
