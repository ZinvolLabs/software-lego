import React, { useState } from 'react';
import { BLOCK_REGISTRY, BLOCK_CATEGORIES } from '../config/blockRegistry';
import { BlockType } from '../types/lego';
import {
  KeyRound,
  Database,
  Sparkles,
  CreditCard,
  UploadCloud,
  GitFork,
  Search,
  GripVertical,
  Plus,
  Layers,
  Sparkle,
  Workflow,
  HelpCircle,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  KeyRound,
  Database,
  Sparkles,
  CreditCard,
  UploadCloud,
  GitFork,
};

interface SidebarProps {
  onAddBlock: (type: BlockType) => void;
  onLoadTemplate: (templateId: string) => void;
  currentTemplateId?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onAddBlock,
  onLoadTemplate,
  currentTemplateId,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'blocks' | 'templates'>('blocks');

  const onDragStart = (event: React.DragEvent, nodeType: BlockType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const allBlocks = Object.values(BLOCK_REGISTRY);

  const filteredBlocks = allBlocks.filter((block) => {
    const matchesSearch =
      block.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      block.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      block.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || block.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <aside className="w-80 h-full bg-slate-950/95 border-r border-slate-800/80 flex flex-col z-20 backdrop-blur-md select-none shrink-0">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Layers className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100 tracking-tight flex items-center gap-1.5">
                Block Palette
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                  {allBlocks.length}
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">Drag & drop onto canvas</p>
            </div>
          </div>
        </div>

        {/* Tab switch: Blocks vs Templates */}
        <div className="grid grid-cols-2 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab('blocks')}
            className={`py-1.5 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'blocks'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Blocks
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`py-1.5 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'templates'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            Presets
          </button>
        </div>
      </div>

      {activeTab === 'blocks' ? (
        <>
          {/* Search & Filter */}
          <div className="p-3 border-b border-slate-800/80 space-y-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search blocks (login, database, ai)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* Category horizontal badges */}
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none text-[11px]">
              {BLOCK_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors border ${
                    selectedCategory === cat.id
                      ? 'bg-slate-800 text-indigo-300 border-indigo-500/40 font-semibold'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-850 hover:text-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Block Cards List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            {/* Core Trio notice badge */}
            <div className="flex items-center justify-between px-2 py-1 bg-indigo-950/40 border border-indigo-900/40 rounded-lg text-[10.5px] text-indigo-300">
              <span className="flex items-center gap-1 font-medium">
                <Sparkle className="w-3 h-3 text-indigo-400" /> Core Trio Ready
              </span>
              <span className="text-[10px] text-indigo-400/80 font-mono">v0.1</span>
            </div>

            {filteredBlocks.map((block) => {
              const Icon = ICON_MAP[block.icon] || Layers;
              const isCoreTrio = ['login', 'database', 'aiRequest'].includes(block.type);

              return (
                <div
                  key={block.type}
                  draggable
                  onDragStart={(e) => onDragStart(e, block.type)}
                  className="group relative bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-xl p-3 cursor-grab active:cursor-grabbing transition-all hover:shadow-xl hover:shadow-indigo-500/5 select-none"
                >
                  {/* Lego Top Studs motif */}
                  <div className="flex items-center space-x-1 mb-2 opacity-50 group-hover:opacity-90 transition-opacity">
                    {[0, 1, 2].map((s) => (
                      <div
                        key={s}
                        className="w-2 h-2 rounded-full bg-slate-700 border border-slate-600 shadow-inner"
                      />
                    ))}
                    <span className="text-[9px] font-mono text-slate-500 uppercase ml-1">
                      {block.badge}
                    </span>
                    {isCoreTrio && (
                      <span className="ml-auto text-[8.5px] px-1 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                        CORE
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-2.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border mt-0.5"
                        style={{
                          backgroundColor: `${block.accentColor}18`,
                          borderColor: `${block.accentColor}40`,
                          color: block.accentColor,
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                          {block.title}
                        </h3>
                        <p className="text-[10.5px] text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                          {block.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-1 ml-2">
                      <GripVertical className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
                    </div>
                  </div>

                  {/* Handle chips & Quick Add Button */}
                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1.5 text-slate-500 font-mono">
                      <span>{block.handles.filter((h) => h.type === 'target').length} in</span>
                      <span>•</span>
                      <span>{block.handles.filter((h) => h.type === 'source').length} out</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddBlock(block.type);
                      }}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all flex items-center gap-1 font-medium text-[10.5px]"
                    >
                      <Plus className="w-3 h-3" />
                      Add
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Presets / Templates Tab */
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          <div className="text-xs text-slate-400 mb-2 px-1">
            Load ready-to-run architecture flows built with modular Lego blocks:
          </div>

          <button
            onClick={() => onLoadTemplate('core_trio')}
            className={`w-full text-left p-3 rounded-xl border transition-all ${
              currentTemplateId === 'core_trio'
                ? 'bg-indigo-950/50 border-indigo-500/60 ring-1 ring-indigo-500/30'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-200">Standard AI Stack</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                Starter
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              User Login ➔ PostgreSQL DB ➔ Gemini AI Request
            </p>
          </button>

          <button
            onClick={() => onLoadTemplate('saas_monetization')}
            className={`w-full text-left p-3 rounded-xl border transition-all ${
              currentTemplateId === 'saas_monetization'
                ? 'bg-indigo-950/50 border-indigo-500/60 ring-1 ring-indigo-500/30'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-200">SaaS Paid Pipeline</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 font-mono">
                Pro
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Login ➔ DB ➔ IF/THEN Gate ➔ Stripe Pay
            </p>
          </button>

          <button
            onClick={() => onLoadTemplate('doc_ai_storage')}
            className={`w-full text-left p-3 rounded-xl border transition-all ${
              currentTemplateId === 'doc_ai_storage'
                ? 'bg-indigo-950/50 border-indigo-500/60 ring-1 ring-indigo-500/30'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-200">Document AI Pipeline</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                Enterprise
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Login ➔ Cloud Storage ➔ Gemini AI ➔ DB Analytics
            </p>
          </button>
        </div>
      )}

      {/* Footer Instructions */}
      <div className="p-3 bg-slate-950 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center gap-2">
        <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>Drag blocks onto canvas. Connect handles to define data flow.</span>
      </div>
    </aside>
  );
};
