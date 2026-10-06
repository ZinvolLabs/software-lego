import { Node, Edge } from '@xyflow/react';
import { BLOCK_REGISTRY } from './blockRegistry';

export const STARTER_PRESET_NODES: Node[] = [
  {
    id: 'node_login_1',
    type: 'login',
    position: { x: 80, y: 140 },
    data: {
      title: 'User Login',
      blockType: 'login',
      config: {
        provider: 'Google OAuth + Passkey',
        sessionDuration: '7 Days',
        mfaRequired: true,
      },
    },
  },
  {
    id: 'node_db_1',
    type: 'database',
    position: { x: 440, y: 140 },
    data: {
      title: 'Postgres DB',
      blockType: 'database',
      config: {
        engine: 'PostgreSQL 16',
        table: 'user_profiles_and_sessions',
        operation: 'Select & Upsert',
      },
    },
  },
  {
    id: 'node_ai_1',
    type: 'aiRequest',
    position: { x: 800, y: 140 },
    data: {
      title: 'Gemini AI Assistant',
      blockType: 'aiRequest',
      config: {
        model: 'gemini-2.5-flash',
        temperature: 0.7,
        systemInstruction: 'Analyze incoming user session & database profile to generate personalized onboarding plan.',
      },
    },
  },
];

export const STARTER_PRESET_EDGES: Edge[] = [
  {
    id: 'edge_login_to_db',
    source: 'node_login_1',
    sourceHandle: 'session',
    target: 'node_db_1',
    targetHandle: 'in',
    animated: true,
    style: { stroke: '#10B981', strokeWidth: 2 },
  },
  {
    id: 'edge_db_to_ai',
    source: 'node_db_1',
    sourceHandle: 'out',
    target: 'node_ai_1',
    targetHandle: 'context',
    animated: true,
    style: { stroke: '#8B5CF6', strokeWidth: 2 },
  },
];

export const TEMPLATES = [
  {
    id: 'core_trio',
    name: 'Standard AI Stack',
    desc: 'Login ➔ Database ➔ AI Request',
    badge: 'Recommended',
    nodes: STARTER_PRESET_NODES,
    edges: STARTER_PRESET_EDGES,
  },
  {
    id: 'saas_monetization',
    name: 'SaaS Paid Pipeline',
    desc: 'Login ➔ DB ➔ Condition ➔ Stripe Pay',
    badge: 'Pro Tier',
    nodes: [
      {
        id: 'tpl_login',
        type: 'login',
        position: { x: 60, y: 160 },
        data: {
          title: 'User Login',
          blockType: 'login',
          config: { ...BLOCK_REGISTRY.login.defaultData },
        },
      },
      {
        id: 'tpl_db',
        type: 'database',
        position: { x: 420, y: 160 },
        data: {
          title: 'Database Store',
          blockType: 'database',
          config: { ...BLOCK_REGISTRY.database.defaultData },
        },
      },
      {
        id: 'tpl_cond',
        type: 'condition',
        position: { x: 780, y: 160 },
        data: {
          title: 'Check Subscription',
          blockType: 'condition',
          config: { fieldKey: 'user.hasProLicense', expectedValue: 'false' },
        },
      },
      {
        id: 'tpl_pay',
        type: 'payment',
        position: { x: 1140, y: 160 },
        data: {
          title: 'Stripe Checkout',
          blockType: 'payment',
          config: { ...BLOCK_REGISTRY.payment.defaultData },
        },
      },
    ],
    edges: [
      {
        id: 'e1',
        source: 'tpl_login',
        sourceHandle: 'session',
        target: 'tpl_db',
        targetHandle: 'in',
        animated: true,
        style: { stroke: '#10B981', strokeWidth: 2 },
      },
      {
        id: 'e2',
        source: 'tpl_db',
        sourceHandle: 'out',
        target: 'tpl_cond',
        targetHandle: 'input',
        animated: true,
        style: { stroke: '#F97316', strokeWidth: 2 },
      },
      {
        id: 'e3',
        source: 'tpl_cond',
        sourceHandle: 'then',
        target: 'tpl_pay',
        targetHandle: 'charge_req',
        animated: true,
        style: { stroke: '#EC4899', strokeWidth: 2 },
      },
    ],
  },
  {
    id: 'doc_ai_storage',
    name: 'Document AI Pipeline',
    desc: 'Login ➔ File Upload ➔ AI Request ➔ DB',
    badge: 'Enterprise',
    nodes: [
      {
        id: 'doc_login',
        type: 'login',
        position: { x: 60, y: 160 },
        data: {
          title: 'User Login',
          blockType: 'login',
          config: { ...BLOCK_REGISTRY.login.defaultData },
        },
      },
      {
        id: 'doc_upload',
        type: 'upload',
        position: { x: 420, y: 160 },
        data: {
          title: 'Cloud Storage',
          blockType: 'upload',
          config: { ...BLOCK_REGISTRY.upload.defaultData },
        },
      },
      {
        id: 'doc_ai',
        type: 'aiRequest',
        position: { x: 780, y: 160 },
        data: {
          title: 'Gemini Document OCR',
          blockType: 'aiRequest',
          config: {
            model: 'gemini-2.5-flash',
            systemInstruction: 'Extract structured tables and key entities from the uploaded file.',
          },
        },
      },
      {
        id: 'doc_db',
        type: 'database',
        position: { x: 1140, y: 160 },
        data: {
          title: 'Analytics DB',
          blockType: 'database',
          config: { ...BLOCK_REGISTRY.database.defaultData, table: 'extracted_documents' },
        },
      },
    ],
    edges: [
      {
        id: 'de1',
        source: 'doc_login',
        sourceHandle: 'session',
        target: 'doc_upload',
        targetHandle: 'file_in',
        animated: true,
        style: { stroke: '#06B6D4', strokeWidth: 2 },
      },
      {
        id: 'de2',
        source: 'doc_upload',
        sourceHandle: 'cdn_url',
        target: 'doc_ai',
        targetHandle: 'context',
        animated: true,
        style: { stroke: '#8B5CF6', strokeWidth: 2 },
      },
      {
        id: 'de3',
        source: 'doc_ai',
        sourceHandle: 'response',
        target: 'doc_db',
        targetHandle: 'in',
        animated: true,
        style: { stroke: '#10B981', strokeWidth: 2 },
      },
    ],
  },
];
