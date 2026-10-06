import React from 'react';
import { NodeProps } from '@xyflow/react';
import { BaseLegoNode } from './BaseLegoNode';
import { Database, HardDrive, Table } from 'lucide-react';
import { LegoNodeData } from '../../types/lego';

export const DatabaseNode: React.FC<NodeProps> = (props) => {
  const data = props.data as unknown as LegoNodeData;
  const config = data?.config || {};

  return (
    <BaseLegoNode {...props}>
      <div className="space-y-2">
        <div className="flex items-center justify-between bg-slate-950/60 p-2 rounded-lg border border-slate-800">
          <div className="flex items-center space-x-2 text-[11px] text-slate-300">
            <Table className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono text-slate-400">Target:</span>
            <span className="font-semibold text-emerald-300">
              {config.table || 'users_and_projects'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-[10px]">
          <div className="bg-slate-950/40 p-1.5 rounded border border-slate-800/80 flex items-center space-x-1.5">
            <Database className="w-3 h-3 text-cyan-400 shrink-0" />
            <div>
              <span className="text-slate-500 block">Engine:</span>
              <span className="font-mono text-slate-300 font-medium">
                {config.engine || 'PostgreSQL'}
              </span>
            </div>
          </div>
          <div className="bg-slate-950/40 p-1.5 rounded border border-slate-800/80 flex items-center space-x-1.5">
            <HardDrive className="w-3 h-3 text-indigo-400 shrink-0" />
            <div>
              <span className="text-slate-500 block">Op:</span>
              <span className="font-mono text-indigo-300 font-medium">
                {config.operation || 'Select & Upsert'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </BaseLegoNode>
  );
};
