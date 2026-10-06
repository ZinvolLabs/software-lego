import { BlockMeta, BlockType } from '../types/lego';

export const BLOCK_CATEGORIES = [
  { id: 'all', label: 'All Blocks' },
  { id: 'auth', label: 'Identity & Auth' },
  { id: 'data', label: 'Data & Storage' },
  { id: 'ai', label: 'AI & Intelligence' },
  { id: 'commerce', label: 'Commerce' },
  { id: 'logic', label: 'Control Flow' },
] as const;

export const BLOCK_REGISTRY: Record<BlockType, BlockMeta> = {
  login: {
    type: 'login',
    title: 'User Login',
    category: 'auth',
    description: 'Authenticates users via OAuth, Email/Pass, or Passkeys and yields session token.',
    icon: 'KeyRound',
    badge: 'Auth 2.0',
    accentColor: '#F59E0B', // Amber
    borderColor: 'border-amber-500/40',
    bgColor: 'bg-amber-950/20',
    handles: [
      {
        id: 'trigger',
        type: 'target',
        position: 'left',
        label: 'Auth Trigger',
        dataType: 'Request',
        color: '#F59E0B',
      },
      {
        id: 'session',
        type: 'source',
        position: 'right',
        label: 'Auth Session',
        dataType: 'SessionUser',
        color: '#10B981',
      },
      {
        id: 'unauthorized',
        type: 'source',
        position: 'bottom',
        label: 'Auth Fail',
        dataType: 'Error',
        color: '#EF4444',
      },
    ],
    defaultData: {
      provider: 'Google & Email OTP',
      sessionDuration: '7 Days',
      mfaRequired: true,
      roleMapping: 'Admin, Member',
    },
  },

  database: {
    type: 'database',
    title: 'Database Store',
    category: 'data',
    description: 'Postgres / Cloud DB with reactive reads, transactional writes, and schema indexing.',
    icon: 'Database',
    badge: 'Postgres SQL',
    accentColor: '#10B981', // Emerald
    borderColor: 'border-emerald-500/40',
    bgColor: 'bg-emerald-950/20',
    handles: [
      {
        id: 'in',
        type: 'target',
        position: 'left',
        label: 'Query In',
        dataType: 'Payload',
        color: '#10B981',
      },
      {
        id: 'out',
        type: 'source',
        position: 'right',
        label: 'Records Out',
        dataType: 'Rows[]',
        color: '#3B82F6',
      },
      {
        id: 'error',
        type: 'source',
        position: 'bottom',
        label: 'DB Error',
        dataType: 'DBError',
        color: '#EF4444',
      },
    ],
    defaultData: {
      engine: 'PostgreSQL',
      table: 'users_and_projects',
      operation: 'Select & Upsert',
      maxPoolSize: 20,
      enableCaching: true,
    },
  },

  aiRequest: {
    type: 'aiRequest',
    title: 'AI Request (Gemini)',
    category: 'ai',
    description: 'Transforms structured inputs using Gemini model with prompt chaining & function calling.',
    icon: 'Sparkles',
    badge: 'Gemini 2.5',
    accentColor: '#8B5CF6', // Purple/Violet
    borderColor: 'border-violet-500/40',
    bgColor: 'bg-violet-950/20',
    handles: [
      {
        id: 'context',
        type: 'target',
        position: 'left',
        label: 'Prompt & Context',
        dataType: 'PromptContext',
        color: '#8B5CF6',
      },
      {
        id: 'response',
        type: 'source',
        position: 'right',
        label: 'Completion Out',
        dataType: 'AIOutput',
        color: '#EC4899',
      },
      {
        id: 'tokens',
        type: 'source',
        position: 'bottom',
        label: 'Stream Tokens',
        dataType: 'StreamChunk',
        color: '#A855F7',
      },
    ],
    defaultData: {
      model: 'gemini-2.5-flash',
      temperature: 0.7,
      systemInstruction: 'You are an intelligent software workflow orchestrator.',
      structuredOutput: true,
      maxOutputTokens: 2048,
    },
  },

  payment: {
    type: 'payment',
    title: 'Stripe Payment',
    category: 'commerce',
    description: 'Processes credit cards, subscriptions, customer billing portals, and webhooks.',
    icon: 'CreditCard',
    badge: 'Stripe Pay',
    accentColor: '#EC4899', // Pink
    borderColor: 'border-pink-500/40',
    bgColor: 'bg-pink-950/20',
    handles: [
      {
        id: 'charge_req',
        type: 'target',
        position: 'left',
        label: 'Order Info',
        dataType: 'OrderPayload',
        color: '#EC4899',
      },
      {
        id: 'success',
        type: 'source',
        position: 'right',
        label: 'Payment Success',
        dataType: 'Receipt',
        color: '#10B981',
      },
      {
        id: 'fail',
        type: 'source',
        position: 'bottom',
        label: 'Payment Declined',
        dataType: 'DeclineError',
        color: '#EF4444',
      },
    ],
    defaultData: {
      currency: 'USD',
      pricingMode: 'Recurring Subscription',
      planId: 'pro_tier_99',
      collectTax: true,
    },
  },

  upload: {
    type: 'upload',
    title: 'Cloud Storage',
    category: 'data',
    description: 'Handles multipart uploads to secure object storage bucket with signed URLs.',
    icon: 'UploadCloud',
    badge: 'S3 / GCS',
    accentColor: '#06B6D4', // Cyan
    borderColor: 'border-cyan-500/40',
    bgColor: 'bg-cyan-950/20',
    handles: [
      {
        id: 'file_in',
        type: 'target',
        position: 'left',
        label: 'File Stream',
        dataType: 'Blob/File',
        color: '#06B6D4',
      },
      {
        id: 'cdn_url',
        type: 'source',
        position: 'right',
        label: 'CDN Asset URL',
        dataType: 'StorageURI',
        color: '#3B82F6',
      },
    ],
    defaultData: {
      bucket: 'cdn.software-lego.app',
      maxFileSizeMB: 50,
      allowedMimeTypes: 'images/*, application/pdf',
      autoThumbnail: true,
    },
  },

  condition: {
    type: 'condition',
    title: 'Condition (IF/THEN)',
    category: 'logic',
    description: 'Evaluates logic conditions to branch graph execution between True and False paths.',
    icon: 'GitFork',
    badge: 'Branch Logic',
    accentColor: '#F97316', // Orange
    borderColor: 'border-orange-500/40',
    bgColor: 'bg-orange-950/20',
    handles: [
      {
        id: 'input',
        type: 'target',
        position: 'left',
        label: 'Data Input',
        dataType: 'AnyData',
        color: '#F97316',
      },
      {
        id: 'then',
        type: 'source',
        position: 'right',
        label: 'True Branch',
        dataType: 'PassData',
        color: '#22C55E',
      },
      {
        id: 'else',
        type: 'source',
        position: 'bottom',
        label: 'False Branch',
        dataType: 'AltData',
        color: '#EF4444',
      },
    ],
    defaultData: {
      conditionType: 'field_equals',
      fieldKey: 'user.isPremium',
      expectedValue: 'true',
    },
  },
};

export const DEFAULT_BLOCK_LIST: BlockType[] = ['login', 'database', 'aiRequest', 'payment', 'upload', 'condition'];
