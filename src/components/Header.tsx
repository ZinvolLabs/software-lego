import React from 'react';
import { Sparkles, Play, RotateCcw, Boxes, Workflow } from 'lucide-react';

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
    <header className="retro-header">
      <div className="retro-brand">
        <div className="retro-logo" aria-hidden="true">
          <i /><i /><i /><i />
        </div>
        <div className="retro-brand-copy">
          <div className="retro-brand-line">
            <h1>Software Lego</h1>
            <span className="retro-version">v0.1 BUILDER</span>
          </div>
          <p>Visual node-based architecture engine</p>
        </div>
      </div>

      <div className="retro-header-metrics">
        <div className="retro-metric">
          <Boxes size={15} />
          <span>{nodeCount} Blocks</span>
        </div>
        <div className="retro-metric">
          <Workflow size={15} />
          <span>{edgeCount} Edges</span>
        </div>
      </div>

      <div className="retro-header-spacer" />

      <div className="retro-header-actions">
        <button className="retro-square-button" onClick={onReset} title="Reset Canvas" type="button">
          <RotateCcw size={15} />
        </button>
        <button
          className={`retro-action-button ${isSimulating ? 'is-running' : ''}`}
          onClick={onSimulateRun}
          disabled={isSimulating || nodeCount === 0}
          type="button"
        >
          <Play size={16} />
          <span>{isSimulating ? 'Simulating...' : 'Test Flow'}</span>
        </button>
        <button className="retro-action-button retro-primary" onClick={onGenerateBuild} type="button">
          <Sparkles size={16} />
          <span>Generate Build</span>
        </button>
      </div>
    </header>
  );
};
