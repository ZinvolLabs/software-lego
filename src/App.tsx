/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  useReactFlow,
} from '@xyflow/react';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { NodeConfigDrawer } from './components/NodeConfigDrawer';
import { BuildModal } from './components/BuildModal';
import { BLOCK_REGISTRY } from './config/blockRegistry';
import { STARTER_PRESET_NODES, STARTER_PRESET_EDGES, TEMPLATES } from './config/presets';
import { BlockType, LegoNodeData, BuildArchitecture } from './types/lego';
import { generateAppArchitecture } from './utils/architectureGenerator';

function LegoBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(STARTER_PRESET_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(STARTER_PRESET_EDGES);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeTemplateId, setActiveTemplateId] = useState<string>('core_trio');
  const [isBuildModalOpen, setIsBuildModalOpen] = useState(false);
  const [buildArchitecture, setBuildArchitecture] = useState<BuildArchitecture | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const { getNodes, getEdges, setCenter } = useReactFlow();

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;

  // Connecting handles
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            animated: true,
            style: { stroke: '#6366F1', strokeWidth: 2.5 },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  // Clicking a node selects it for configuration
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  // Adding a block directly (via "+" button)
  const handleAddBlock = useCallback(
    (type: BlockType) => {
      const meta = BLOCK_REGISTRY[type];
      const newNodeId = `node_${type}_${Date.now().toString(36)}`;

      // Calculate staggered offset based on current nodes
      const offsetX = 100 + (nodes.length % 5) * 50;
      const offsetY = 120 + (nodes.length % 5) * 50;

      const newNode: Node = {
        id: newNodeId,
        type,
        position: { x: offsetX, y: offsetY },
        data: {
          title: meta.title,
          blockType: type,
          config: { ...meta.defaultData },
          status: 'idle',
        },
      };

      setNodes((nds) => nds.concat(newNode));
      setSelectedNodeId(newNodeId);
    },
    [nodes.length, setNodes]
  );

  // Updating a node configuration live
  const handleUpdateNode = useCallback(
    (nodeId: string, updatedData: Partial<LegoNodeData>) => {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === nodeId) {
            return {
              ...n,
              data: {
                ...n.data,
                ...updatedData,
              },
            };
          }
          return n;
        })
      );
    },
    [setNodes]
  );

  // Deleting a node and its attached edges
  const handleDeleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((n) => n.id !== nodeId));
      setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
      if (selectedNodeId === nodeId) {
        setSelectedNodeId(null);
      }
    },
    [selectedNodeId, setNodes, setEdges]
  );

  // Duplicating a node
  const handleDuplicateNode = useCallback(
    (nodeId: string) => {
      const sourceNode = nodes.find((n) => n.id === nodeId);
      if (!sourceNode) return;

      const newNodeId = `node_${sourceNode.type}_${Date.now().toString(36)}`;
      const duplicatedNode: Node = {
        ...sourceNode,
        id: newNodeId,
        position: {
          x: sourceNode.position.x + 40,
          y: sourceNode.position.y + 40,
        },
        data: {
          ...sourceNode.data,
          title: `${sourceNode.data.title || 'Block'} (Copy)`,
        },
      };

      setNodes((nds) => nds.concat(duplicatedNode));
      setSelectedNodeId(newNodeId);
    },
    [nodes, setNodes]
  );

  // Loading preset template
  const handleLoadTemplate = useCallback(
    (templateId: string) => {
      const template = TEMPLATES.find((t) => t.id === templateId);
      if (template) {
        setNodes(template.nodes);
        setEdges(template.edges);
        setActiveTemplateId(templateId);
        setSelectedNodeId(null);
      }
    },
    [setNodes, setEdges]
  );

  // Reset Canvas
  const handleReset = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setSelectedNodeId(null);
    setActiveTemplateId('');
  }, [setNodes, setEdges]);

  // Generate Build Action
  const handleGenerateBuild = useCallback(() => {
    const currentNodes = getNodes();
    const currentEdges = getEdges();

    // Read entire React Flow instance state & generate clean architecture spec
    const architecture = generateAppArchitecture(currentNodes, currentEdges);

    // 1. Output to browser console as specified in user prompt
    console.log('==============================================');
    console.log('🚀 SOFTWARE LEGO BUILD: GENERATED ARCHITECTURE');
    console.log('==============================================');
    console.log(JSON.stringify(architecture, null, 2));
    console.log('Raw Architecture Object:', architecture);

    // 2. Output to UI modal
    setBuildArchitecture(architecture);
    setIsBuildModalOpen(true);
  }, [getNodes, getEdges]);

  // Flow Simulation Runner
  const handleSimulateRun = useCallback(() => {
    if (isSimulating || nodes.length === 0) return;

    setIsSimulating(true);

    // Animate edges with high-energy colors
    const originalStyles = edges.map((e) => ({ id: e.id, style: e.style }));
    
    setEdges((eds) =>
      eds.map((e) => ({
        ...e,
        animated: true,
        style: { ...e.style, stroke: '#F59E0B', strokeWidth: 4 },
      }))
    );

    setTimeout(() => {
      setEdges((eds) =>
        eds.map((e) => {
          const original = originalStyles.find((o) => o.id === e.id);
          return {
            ...e,
            style: original?.style || { stroke: '#6366F1', strokeWidth: 2.5 },
          };
        })
      );
      setIsSimulating(false);
    }, 2400);
  }, [isSimulating, nodes.length, edges, setEdges]);

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Application Header */}
      <Header
        nodeCount={nodes.length}
        edgeCount={edges.length}
        onGenerateBuild={handleGenerateBuild}
        onSimulateRun={handleSimulateRun}
        isSimulating={isSimulating}
        onReset={handleReset}
      />

      {/* Main Studio Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Modular Lego Block Palette */}
        <Sidebar
          onAddBlock={handleAddBlock}
          onLoadTemplate={handleLoadTemplate}
          currentTemplateId={activeTemplateId}
        />

        {/* Center React Flow Canvas */}
        <main className="flex-1 h-full relative">
          <Canvas
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            isSimulating={isSimulating}
          />
        </main>

        {/* Right Inspector Drawer (active when node selected) */}
        {selectedNode && (
          <NodeConfigDrawer
            selectedNode={selectedNode}
            onClose={() => setSelectedNodeId(null)}
            onUpdateNode={handleUpdateNode}
            onDeleteNode={handleDeleteNode}
            onDuplicateNode={handleDuplicateNode}
          />
        )}
      </div>

      {/* Architecture Build Modal */}
      <BuildModal
        isOpen={isBuildModalOpen}
        onClose={() => setIsBuildModalOpen(false)}
        architecture={buildArchitecture}
      />
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <LegoBuilder />
    </ReactFlowProvider>
  );
}
