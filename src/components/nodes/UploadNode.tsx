import React from 'react';
import { NodeProps } from '@xyflow/react';
import { BaseLegoNode } from './BaseLegoNode';
import { UploadCloud, FolderCheck, HardDrive } from 'lucide-react';
import { LegoNodeData } from '../../types/lego';

export const UploadNode: React.FC<NodeProps> = (props) => {
  const data = props.data as unknown as LegoNodeData;
  const config = data?.config || {};

  return (
    <BaseLegoNode {...props}>
      <div className="space-y-2">
        <div className="flex items-center justify-between bg-slate-950/60 p-2 rounded-lg border border-slate-800">
          <div className="flex items-center space-x-2 text-[11px] text-slate-300">
            <UploadCloud className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-slate-400">Bucket:</span>
            <span className="font-semibold text-cyan-300 truncate max-w-[130px]">
              {config.bucket || 'cdn.software-lego.app'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-[10px]">
          <div className="bg-slate-950/40 p-1.5 rounded border border-slate-800/80 flex items-center space-x-1.5">
            <HardDrive className="w-3 h-3 text-cyan-400 shrink-0" />
            <div>
              <span className="text-slate-500 block">Max Size:</span>
              <span className="font-mono text-slate-300 font-medium">{config.maxFileSizeMB || 50} MB</span>
            </div>
          </div>
          <div className="bg-slate-950/40 p-1.5 rounded border border-slate-800/80 flex items-center space-x-1.5">
            <FolderCheck className="w-3 h-3 text-emerald-400 shrink-0" />
            <div>
              <span className="text-slate-500 block">Signed URL:</span>
              <span className="font-mono text-emerald-400 font-medium">TTL 15m</span>
            </div>
          </div>
        </div>
      </div>
    </BaseLegoNode>
  );
};
