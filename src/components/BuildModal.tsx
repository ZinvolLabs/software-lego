import React, { useState } from 'react';
import { BuildArchitecture } from '../types/lego';
import { generateBackendCode } from '../utils/architectureGenerator';
import {
  X,
  Copy,
  Check,
  Download,
  Terminal,
  Code2,
  Workflow,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  FileJson,
} from 'lucide-react';

interface BuildModalProps {
  isOpen: boolean;
  onClose: () => void;
  architecture: BuildArchitecture | null;
}

export const BuildModal: React.FC<BuildModalProps> = ({
  isOpen,
  onClose,
  architecture,
}) => {
  const [activeTab, setActiveTab] = useState<'json' | 'pipeline' | 'code'>('json');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !architecture) return null;

  const jsonString = JSON.stringify(architecture, null, 2);
  const generatedCode = generateBackendCode(architecture);

  const handleCopy = () => {
    const textToCopy = activeTab === 'code' ? generatedCode : jsonString;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `software-lego-build-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-slate-100 tracking-tight">
                  Architecture Build Generated
                </h3>
                <span className="inline-flex items-center gap-1 text-[10.5px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  <ShieldCheck className="w-3 h-3" /> Valid State
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Software Lego full instance state compiled to structured architecture spec.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Summary Bar */}
        <div className="px-6 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex flex-wrap items-center gap-4 text-xs font-mono">
          <div className="flex items-center space-x-1.5 text-slate-300">
            <span className="text-slate-500">Blocks:</span>
            <span className="font-semibold text-indigo-400">{architecture.summary.totalBlocks}</span>
          </div>
          <span className="text-slate-700">•</span>
          <div className="flex items-center space-x-1.5 text-slate-300">
            <span className="text-slate-500">Connections:</span>
            <span className="font-semibold text-emerald-400">{architecture.summary.totalConnections}</span>
          </div>
          <span className="text-slate-700">•</span>
          <div className="flex items-center space-x-1.5 text-slate-300">
            <span className="text-slate-500">Pipeline Stages:</span>
            <span className="font-semibold text-purple-400">{architecture.summary.pipelineStages}</span>
          </div>
          <span className="text-slate-700">•</span>
          <div className="flex items-center space-x-1.5 text-slate-300">
            <span className="text-slate-500">Entry Points:</span>
            <span className="font-semibold text-amber-400">{architecture.summary.entryPoints.length}</span>
          </div>

          <div className="ml-auto text-[11px] text-slate-400 font-sans flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-emerald-400" />
            <span>Also logged to browser console</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 bg-slate-900 border-b border-slate-800 flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('json')}
            className={`pb-2 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'json'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileJson className="w-3.5 h-3.5" />
            Architecture JSON
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`pb-2 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'pipeline'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            Execution Pipeline ({architecture.executionPipeline.length} stages)
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`pb-2 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'code'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Generated Backend Code
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-950 font-mono text-xs">
          {activeTab === 'json' && (
            <pre className="text-slate-200 whitespace-pre leading-relaxed select-text font-mono text-[11.5px] p-4 bg-slate-900/90 rounded-xl border border-slate-800 overflow-x-auto">
              <code>{jsonString}</code>
            </pre>
          )}

          {activeTab === 'pipeline' && (
            <div className="space-y-4 font-sans text-xs">
              <div className="p-3 bg-indigo-950/30 rounded-xl border border-indigo-900/40 text-slate-300 text-xs">
                Topologically sorted execution order based on connected React Flow edges.
              </div>

              {architecture.executionPipeline.map((stage) => (
                <div
                  key={stage.stage}
                  className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-xs font-bold text-indigo-300 font-mono flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-400" />
                      STAGE {stage.stage}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {stage.nodeIds.length} node(s) executing in parallel
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {stage.nodeIds.map((nid) => {
                      const node = architecture.nodes.find((n) => n.id === nid);
                      if (!node) return null;
                      return (
                        <div
                          key={nid}
                          className="bg-slate-950/80 rounded-lg p-3 border border-slate-800 space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-200 text-xs">{node.label}</span>
                            <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                              {node.type}
                            </span>
                          </div>
                          <div className="text-[10.5px] text-slate-400 font-mono">ID: {node.id}</div>
                          <div className="pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                            <span>Inputs: {node.inputs.length}</span>
                            <ArrowRight className="w-3 h-3 text-slate-500" />
                            <span>Outputs: {node.outputs.length}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'code' && (
            <pre className="text-emerald-300 whitespace-pre leading-relaxed select-text font-mono text-[11.5px] p-4 bg-slate-900/90 rounded-xl border border-slate-800 overflow-x-auto">
              <code>{generatedCode}</code>
            </pre>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Ready to integrate into CI/CD or code export workflow.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
