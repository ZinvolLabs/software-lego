import React, { useCallback, useRef } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useReactFlow,
  type Connection,
  type Edge,
  type Node,
  type NodeChange,
  type EdgeChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { BLOCK_REGISTRY } from '../config/blockRegistry';
import { BlockType, LegoNodeData } from '../types/lego';
import { nodeTypes } from './nodes';
import { Sparkles, MousePointerClick, Zap } from 'lucide-react';

interface CanvasProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  onNodeClick: (event: React.MouseEvent, node: Node) => void;
  onPaneClick: () => void;
  isSimulating: boolean;
}

export const Canvas: React.FC<CanvasProps> = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onPaneClick,
  isSimulating,
}) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition, setNodes } = useReactFlow();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as BlockType;
      if (!type || !BLOCK_REGISTRY[type]) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const meta = BLOCK_REGISTRY[type];
      const newNodeId = `node_${type}_${Date.now().toString(36)}`;

      const newNode: Node = {
        id: newNodeId,
        type,
        position,
        data: {
          title: meta.title,
          blockType: type,
          config: { ...meta.defaultData },
          status: 'idle',
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  return (
    <div ref={reactFlowWrapper} className="w-full h-full relative bg-slate-950 overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        fitView
        snapToGrid
        snapGrid={[16, 16]}
        defaultEdgeOptions={{
          animated: true,
          style: { stroke: '#6366F1', strokeWidth: 2 },
        }}
        proOptions={{ hideAttribution: true }}
        className="software-lego-flow"
      >
        <Background
          color="#334155"
          gap={24}
          size={1.5}
          variant={BackgroundVariant.Dots}
          className="opacity-40"
        />

        <Controls
          className="!bg-slate-900 !border-slate-800 !rounded-xl !shadow-2xl overflow-hidden [&>button]:!bg-slate-900 [&>button]:!border-slate-800 [&>button]:!text-slate-300 [&>button:hover]:!bg-slate-800"
          showInteractive={false}
        />

        <MiniMap
          nodeStrokeColor="#6366f1"
          nodeColor="#1e293b"
          maskColor="rgba(15, 23, 42, 0.75)"
          className="!bg-slate-950 !border !border-slate-800 !rounded-xl overflow-hidden shadow-2xl"
          zoomable
          pannable
        />

        {/* Floating Canvas Tips */}
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="max-w-md p-6 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-2xl text-center space-y-3 pointer-events-auto">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-100">Canvas is Empty</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Drag blocks like <span className="text-amber-400 font-semibold">Login</span>,{' '}
                <span className="text-emerald-400 font-semibold">Database</span>, and{' '}
                <span className="text-violet-400 font-semibold">AI Request</span> from the sidebar onto
                this canvas to start snapping Lego pieces together.
              </p>
              <div className="pt-2 text-[11px] text-slate-500 font-mono flex items-center justify-center gap-2">
                <MousePointerClick className="w-3.5 h-3.5" />
                <span>Or pick a Preset from the left sidebar</span>
              </div>
            </div>
          </div>
        )}

        {/* Simulation Banner */}
        {isSimulating && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-amber-500/20 backdrop-blur-md border border-amber-500/40 px-4 py-2 rounded-full text-xs font-semibold text-amber-300 flex items-center space-x-2 shadow-xl z-20 animate-bounce">
            <Zap className="w-4 h-4 text-amber-400 animate-spin" />
            <span>Simulating Execution Flow: Passing tokens across blocks...</span>
          </div>
        )}
      </ReactFlow>
    </div>
  );
};
