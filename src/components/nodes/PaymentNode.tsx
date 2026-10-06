import React from 'react';
import { NodeProps } from '@xyflow/react';
import { BaseLegoNode } from './BaseLegoNode';
import { CreditCard, DollarSign, CheckCircle } from 'lucide-react';
import { LegoNodeData } from '../../types/lego';

export const PaymentNode: React.FC<NodeProps> = (props) => {
  const data = props.data as unknown as LegoNodeData;
  const config = data?.config || {};

  return (
    <BaseLegoNode {...props}>
      <div className="space-y-2">
        <div className="flex items-center justify-between bg-slate-950/60 p-2 rounded-lg border border-slate-800">
          <div className="flex items-center space-x-2 text-[11px] text-slate-300">
            <CreditCard className="w-3.5 h-3.5 text-pink-400" />
            <span className="font-mono text-slate-400">Plan:</span>
            <span className="font-semibold text-pink-300">{config.planId || 'pro_tier_99'}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-[10px]">
          <div className="bg-slate-950/40 p-1.5 rounded border border-slate-800/80 flex items-center space-x-1.5">
            <DollarSign className="w-3 h-3 text-emerald-400 shrink-0" />
            <div>
              <span className="text-slate-500 block">Currency:</span>
              <span className="font-mono text-slate-300 font-medium">{config.currency || 'USD'}</span>
            </div>
          </div>
          <div className="bg-slate-950/40 p-1.5 rounded border border-slate-800/80 flex items-center space-x-1.5">
            <CheckCircle className="w-3 h-3 text-cyan-400 shrink-0" />
            <div>
              <span className="text-slate-500 block">Billing:</span>
              <span className="font-mono text-cyan-300 font-medium">Auto-renew</span>
            </div>
          </div>
        </div>
      </div>
    </BaseLegoNode>
  );
};
