import React from 'react';
import {
  Sparkles,
  Play,
  RotateCcw,
  Boxes,
  Layers,
  ArrowRight,
  Workflow,
  Download,
  CheckCircle2,
  Share2,
} from 'lucide-react';

interface HeaderProps {
  nodeCount: number;
  edgeCount: number;
  onGenerateBuild: () => void;
  onSimulateRun: () => void;
  isSimulating: boolean;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  nodeCount,
  edgeCount,
  onGenerateBuild,
  onSimulateRun,
  isSimulating,
  onReset,
}) => {
  return (
    <header className="h-14 bg-slate-950/95 border-b border-slate-800/80 px-4 flex items-center justify-between z-30 select-none">
      {/* Brand & Identity */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          {/* Lego stylized logo */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 relative group">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-2 h-2 rounded-full bg-white/90 shadow-sm" />
              <div className="w-2 h-2 rounded-full bg-white/90 shadow-sm" />
              <div className="w-2 h-2 rounded-full bg-white/90 shadow-sm" />
              <div className="w-2 h-2 rounded-full bg-white/90 shadow-sm" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-sm font-extrabold tracking-tight text-white flex items-center gap-1.5">
                Software Lego
              </h1>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                v0.1 BUILDER
              </span>
            </div>
            <p className="text-[10.5px] text-slate-400">
              Visual node-based architecture engine
            </p>
          </div>
        </div>

        {/* Live Canvas Metrics */}
        <div className="hidden md:flex items-center space-x-2 pl-4 border-l border-slate-800 text-xs font-mono">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-slate-900 rounded-md border border-slate-800 text-slate-300">
            <Boxes className="w-3.5 h-3.5 text-indigo-400" />
            <span>{nodeCount} Blocks</span>
          </div>
          <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-slate-900 rounded-md border border-slate-800 text-slate-300">
            <Workflow className="w-3.5 h-3.5 text-emerald-400" />
            <span>{edgeCount} Edges</span>
          </div>
        </div>
      </div>

      {/* Right Controls & Generate Build */}
      <div className="flex items-center space-x-2.5">
        <button
          onClick={onReset}
          title="Reset Canvas"
          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onSimulateRun}
          disabled={isSimulating || nodeCount === 0}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
            isSimulating
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
          }`}
        >
          <Play className={`w-3.5 h-3.5 ${isSimulating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
          <span>{isSimulating ? 'Simulating...' : 'Test Flow'}</span>
        </button>

        {/* Generate Build primary CTA */}
        <button
          onClick={onGenerateBuild}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 border border-indigo-400/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Sparkles className="w-4 h-4 text-indigo-200" />
          <span>Generate Build</span>
        </button>
      </div>
    </header>
  );
};
