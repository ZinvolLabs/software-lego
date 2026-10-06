export type BlockCategoryId = 'auth' | 'data' | 'ai' | 'commerce' | 'storage' | 'logic' | 'trigger';

export type BlockType = 
  | 'login'
  | 'database'
  | 'aiRequest'
  | 'payment'
  | 'upload'
  | 'condition';

export interface HandleDefinition {
  id: string;
  type: 'source' | 'target';
  position: 'left' | 'right' | 'top' | 'bottom';
  label: string;
  dataType?: string;
  color?: string;
}

export interface BlockMeta {
  type: BlockType;
  title: string;
  category: BlockCategoryId;
  description: string;
  icon: string;
  badge: string;
  accentColor: string; // Tailwind color or hex
  borderColor: string;
  bgColor: string;
  handles: HandleDefinition[];
  defaultData: Record<string, any>;
}

export interface LegoNodeData {
  title: string;
  blockType: BlockType;
  config: Record<string, any>;
  status?: 'idle' | 'configured' | 'warning' | 'active';
  description?: string;
  onChange?: (key: string, value: any) => void;
  [key: string]: any;
}

export interface BuildArchitectureNode {
  id: string;
  type: BlockType;
  label: string;
  config: Record<string, any>;
  inputs: string[];
  outputs: string[];
  status: string;
}

export interface BuildArchitectureEdge {
  id: string;
  fromNode: string;
  fromHandle: string | null;
  toNode: string;
  toHandle: string | null;
  label?: string;
}

export interface BuildArchitecture {
  version: string;
  appName: string;
  generatedAt: string;
  summary: {
    totalBlocks: number;
    totalConnections: number;
    entryPoints: string[];
    terminalPoints: string[];
    pipelineStages: number;
    blockTypesCount: Record<string, number>;
  };
  executionPipeline: {
    stage: number;
    nodeIds: string[];
  }[];
  nodes: BuildArchitectureNode[];
  edges: BuildArchitectureEdge[];
  rawGraph: {
    nodeCount: number;
    edgeCount: number;
  };
}
