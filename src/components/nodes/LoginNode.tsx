import React from 'react';
import { NodeProps } from '@xyflow/react';
import { BaseLegoNode } from './BaseLegoNode';
import { ShieldCheck, UserCheck, Key } from 'lucide-react';
import { LegoNodeData } from '../../types/lego';

export const LoginNode: React.FC<NodeProps> = (props) => {
  const data = props.data as unknown as LegoNodeData;
  const config = data?.config || {};

  return (
    <BaseLegoNode {...props}>
      <div className="space-y-2">
        <div className="flex items-center justify-between bg-slate-950/60 p-2 rounded-lg border border-slate-800">
          <div className="flex items-center space-x-2 text-[11px] text-slate-300">
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-slate-400">Method:</span>
            <span className="font-semibold text-slate-200">
              {config.provider || 'Google OAuth + Passkey'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-[10px]">
          <div className="bg-slate-950/40 p-1.5 rounded border border-slate-800/80 flex items-center space-x-1.5">
            <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
            <div>
              <span className="text-slate-500 block">Session:</span>
              <span className="font-mono text-slate-300 font-medium">{config.sessionDuration || '7 Days'}</span>
            </div>
          </div>
          <div className="bg-slate-950/40 p-1.5 rounded border border-slate-800/80 flex items-center space-x-1.5">
            <UserCheck className="w-3 h-3 text-amber-400 shrink-0" />
            <div>
              <span className="text-slate-500 block">MFA 2FA:</span>
              <span className="font-mono text-emerald-400 font-medium">
                {config.mfaRequired !== false ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </BaseLegoNode>
  );
};
