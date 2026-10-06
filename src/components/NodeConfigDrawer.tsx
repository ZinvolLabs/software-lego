import React from 'react';
import { Node } from '@xyflow/react';
import { BLOCK_REGISTRY } from '../config/blockRegistry';
import { LegoNodeData, BlockType } from '../types/lego';
import {
  X,
  Settings2,
  Sliders,
  Database,
  KeyRound,
  Sparkles,
  CreditCard,
  UploadCloud,
  GitFork,
  Trash2,
  Copy,
  Info,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  KeyRound,
  Database,
  Sparkles,
  CreditCard,
  UploadCloud,
  GitFork,
};

interface NodeConfigDrawerProps {
  selectedNode: Node | null;
  onClose: () => void;
  onUpdateNode: (nodeId: string, updatedData: Partial<LegoNodeData>) => void;
  onDeleteNode: (nodeId: string) => void;
  onDuplicateNode: (nodeId: string) => void;
}

export const NodeConfigDrawer: React.FC<NodeConfigDrawerProps> = ({
  selectedNode,
  onClose,
  onUpdateNode,
  onDeleteNode,
  onDuplicateNode,
}) => {
  if (!selectedNode) return null;

  const nodeData = selectedNode.data as unknown as LegoNodeData;
  const blockType = (selectedNode.type as BlockType) || 'login';
  const meta = BLOCK_REGISTRY[blockType] || BLOCK_REGISTRY.login;
  const Icon = ICON_MAP[meta.icon] || Settings2;
  const config = nodeData.config || {};

  const handleConfigChange = (key: string, value: any) => {
    onUpdateNode(selectedNode.id, {
      ...nodeData,
      config: {
        ...config,
        [key]: value,
      },
    });
  };

  const handleTitleChange = (newTitle: string) => {
    onUpdateNode(selectedNode.id, {
      ...nodeData,
      title: newTitle,
    });
  };

  return (
    <div className="w-84 h-full bg-slate-950/95 border-l border-slate-800/80 flex flex-col z-20 backdrop-blur-md shadow-2xl shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center border"
            style={{
              backgroundColor: `${meta.accentColor}20`,
              borderColor: `${meta.accentColor}50`,
              color: meta.accentColor,
            }}
          >
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
              Block Inspector
            </span>
            <h3 className="text-xs font-bold text-slate-100">{meta.title}</h3>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body / Config fields */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* Node Label / Title */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
            Display Label
          </label>
          <input
            type="text"
            value={nodeData.title || meta.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
          />
        </div>

        {/* Node ID badge */}
        <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800/80 font-mono text-[10px] text-slate-400 flex items-center justify-between">
          <span>Node ID:</span>
          <span className="text-slate-300 select-all">{selectedNode.id}</span>
        </div>

        {/* Dynamic Fields by Block Type */}
        {blockType === 'login' && (
          <div className="space-y-3 pt-1">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Auth Provider
              </label>
              <select
                value={config.provider || 'Google OAuth + Passkey'}
                onChange={(e) => handleConfigChange('provider', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500 text-xs"
              >
                <option value="Google OAuth + Passkey">Google OAuth + Passkey</option>
                <option value="Email OTP & Magic Link">Email OTP & Magic Link</option>
                <option value="GitHub + SSO Enterprise">GitHub + SSO Enterprise</option>
                <option value="Custom JWT & Bearer">Custom JWT & Bearer</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Session Expiration
              </label>
              <select
                value={config.sessionDuration || '7 Days'}
                onChange={(e) => handleConfigChange('sessionDuration', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500 text-xs"
              >
                <option value="24 Hours">24 Hours</option>
                <option value="7 Days">7 Days (Default)</option>
                <option value="30 Days">30 Days</option>
                <option value="Session Only">Browser Session Only</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
              <div>
                <span className="text-[11px] font-medium text-slate-200 block">Enforce 2FA / MFA</span>
                <span className="text-[9.5px] text-slate-400">Requires TOTP token verification</span>
              </div>
              <input
                type="checkbox"
                checked={config.mfaRequired !== false}
                onChange={(e) => handleConfigChange('mfaRequired', e.target.checked)}
                className="w-4 h-4 rounded accent-amber-500 cursor-pointer"
              />
            </div>
          </div>
        )}

        {blockType === 'database' && (
          <div className="space-y-3 pt-1">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Database Engine
              </label>
              <select
                value={config.engine || 'PostgreSQL'}
                onChange={(e) => handleConfigChange('engine', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 text-xs"
              >
                <option value="PostgreSQL">PostgreSQL 16</option>
                <option value="MySQL">MySQL / MariaDB</option>
                <option value="SQLite">SQLite / LibSQL</option>
                <option value="Redis KV">Redis KV Store</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Target Table / Collection
              </label>
              <input
                type="text"
                value={config.table || 'users_and_projects'}
                onChange={(e) => handleConfigChange('table', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 font-mono text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Primary Operation
              </label>
              <select
                value={config.operation || 'Select & Upsert'}
                onChange={(e) => handleConfigChange('operation', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 text-xs"
              >
                <option value="Select & Upsert">Select & Upsert</option>
                <option value="Read By Primary Key">Read By Primary Key</option>
                <option value="Atomic Insert">Atomic Insert</option>
                <option value="Delete / Soft Archive">Delete / Soft Archive</option>
              </select>
            </div>
          </div>
        )}

        {blockType === 'aiRequest' && (
          <div className="space-y-3 pt-1">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Gemini Model
              </label>
              <select
                value={config.model || 'gemini-2.5-flash'}
                onChange={(e) => handleConfigChange('model', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-violet-500 text-xs"
              >
                <option value="gemini-2.5-flash">gemini-2.5-flash (Fast & Multimodal)</option>
                <option value="gemini-2.5-pro">gemini-2.5-pro (Complex Reasoning)</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-slate-300">
                  Temperature
                </label>
                <span className="font-mono text-violet-400">{config.temperature ?? 0.7}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={config.temperature ?? 0.7}
                onChange={(e) => handleConfigChange('temperature', parseFloat(e.target.value))}
                className="w-full accent-violet-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                System Instructions / Prompt
              </label>
              <textarea
                rows={3}
                value={
                  config.systemInstruction ||
                  'You are an intelligent software workflow orchestrator.'
                }
                onChange={(e) => handleConfigChange('systemInstruction', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 text-xs focus:outline-none focus:border-violet-500 leading-relaxed font-sans"
              />
            </div>
          </div>
        )}

        {blockType === 'payment' && (
          <div className="space-y-3 pt-1">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Plan ID
              </label>
              <input
                type="text"
                value={config.planId || 'pro_tier_99'}
                onChange={(e) => handleConfigChange('planId', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 font-mono text-xs focus:outline-none focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Currency
              </label>
              <select
                value={config.currency || 'USD'}
                onChange={(e) => handleConfigChange('currency', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-pink-500"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>
        )}

        {blockType === 'upload' && (
          <div className="space-y-3 pt-1">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Bucket Name
              </label>
              <input
                type="text"
                value={config.bucket || 'cdn.software-lego.app'}
                onChange={(e) => handleConfigChange('bucket', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Max File Size (MB)
              </label>
              <input
                type="number"
                value={config.maxFileSizeMB || 50}
                onChange={(e) => handleConfigChange('maxFileSizeMB', parseInt(e.target.value) || 10)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        )}

        {blockType === 'condition' && (
          <div className="space-y-3 pt-1">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Field Key to Test
              </label>
              <input
                type="text"
                value={config.fieldKey || 'user.isPremium'}
                onChange={(e) => handleConfigChange('fieldKey', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 font-mono text-xs focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Expected Value
              </label>
              <input
                type="text"
                value={config.expectedValue || 'true'}
                onChange={(e) => handleConfigChange('expectedValue', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 font-mono text-xs focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        )}

        {/* Handles description */}
        <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center space-x-1.5 text-slate-400 font-semibold text-[11px]">
            <Info className="w-3.5 h-3.5" />
            <span>Connection Handles</span>
          </div>
          <div className="space-y-1 text-[10.5px]">
            {meta.handles.map((h) => (
              <div key={h.id} className="flex items-center justify-between text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: h.color || meta.accentColor }}
                  />
                  <span>{h.label}</span>
                </div>
                <span className="font-mono text-[9.5px] text-slate-500">
                  {h.type === 'target' ? 'Input' : 'Output'} ({h.dataType})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-3 border-t border-slate-800 bg-slate-950 grid grid-cols-2 gap-2">
        <button
          onClick={() => onDuplicateNode(selectedNode.id)}
          className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 text-xs font-medium transition-colors"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>Duplicate</span>
        </button>
        <button
          onClick={() => onDeleteNode(selectedNode.id)}
          className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg bg-red-950/40 hover:bg-red-950/80 text-red-300 border border-red-900/50 text-xs font-medium transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};
