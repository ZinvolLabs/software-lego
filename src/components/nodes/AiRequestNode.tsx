import React from 'react';
import { NodeProps } from '@xyflow/react';
import { BaseLegoNode } from './BaseLegoNode';
import { Sparkles, Cpu, Sliders } from 'lucide-react';
import { LegoNodeData } from '../../types/lego';

export const AiRequestNode: React.FC<NodeProps> = (props) => {
  const data = props.data as unknown as LegoNodeData;
  const config = data?.config || {};

  return (
    <BaseLegoNode {...props}>
      <div className="space-y-2">
        <div className="flex items-center justify-between bg-slate-950/60 p-2 rounded-lg border border-slate-800">
          <div className="flex items-center space-x-2 text-[11px] text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-violet-400" />
            <span className="font-mono text-slate-400">Model:</span>
            <span className="font-semibold text-violet-300">
              {config.model || 'gemini-2.5-flash'}
            </span>
          </div>
        </div>

        <div className="bg-slate-950/40 p-2 rounded border border-slate-800/80 text-[10.5px]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-slate-500 font-mono text-[9.5px]">System Prompt</span>
            <div className="flex items-center space-x-1 text-[9.5px] text-pink-400">
              <Sliders className="w-3 h-3" />
              <span>temp: {config.temperature ?? 0.7}</span>
            </div>
          </div>
          <p className="text-slate-300 line-clamp-2 italic text-[10px]">
            "{config.systemInstruction || 'Process incoming request and return structured JSON response.'}"
          </p>
        </div>
      </div>
    </BaseLegoNode>
  );
};
