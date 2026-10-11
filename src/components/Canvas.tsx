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
import { BlockType } from '../types/lego';
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
      if (!type || !BLOCK_REGISTRY[type]) return;

      const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      const meta = BLOCK_REGISTRY[type];
      const newNodeId = `node_${type}_${Date.now().toString(36)}`;

      setNodes((nds) => nds.concat({
        id: newNodeId,
        type,
        position,
        data: {
          title: meta.title,
          blockType: type,
          config: { ...meta.defaultData },
          status: 'idle',
        },
      }));
    },
    [screenToFlowPosition, setNodes]
  );

  return (
    <div ref={reactFlowWrapper} className="retro-canvas">
      <div className="retro-landscape" aria-hidden="true">
        <span className="retro-planet" />
        <span className="retro-mountain m1" />
        <span className="retro-mountain m2" />
        <span className="retro-pole p1" />
        <span className="retro-pole p2" />
        <span className="retro-pole p3" />
        <span className="retro-pole p4" />
      </div>

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
          style: { stroke: '#111111', strokeWidth: 3 },
        }}
        proOptions={{ hideAttribution: true }}
        className="software-lego-flow retro-flow"
      >
        <Background
          color="#222222"
          gap={22}
          size={1.1}
          variant={BackgroundVariant.Dots}
          className="retro-flow-dots"
        />

        <Controls className="retro-flow-controls" showInteractive={false} />

        <div className="retro-minimap-window">
          <div className="retro-minimap-title">
            <span>Navigator</span>
            <div className="retro-window-controls"><i /><i /><i /></div>
          </div>
          <MiniMap
            nodeStrokeColor="#111111"
            nodeColor="#f58db0"
            maskColor="rgba(220,220,220,.50)"
            className="retro-minimap"
            zoomable
            pannable
          />
        </div>

        {nodes.length === 0 && (
          <div className="retro-empty-state">
            <div className="retro-empty-card">
              <Sparkles size={24} />
              <h3>Canvas is Empty</h3>
              <p>
                Drag blocks like <b>Login</b>, <b>Database</b>, and <b>AI Request</b> from the sidebar onto this canvas.
              </p>
              <small><MousePointerClick size={14} /> Or pick a Preset from the left sidebar</small>
            </div>
          </div>
        )}

        {isSimulating && (
          <div className="retro-simulation-banner">
            <Zap size={16} />
            <span>SIMULATING EXECUTION FLOW — PASSING TOKENS ACROSS BLOCKS...</span>
          </div>
        )}
      </ReactFlow>
    </div>
  );
};
