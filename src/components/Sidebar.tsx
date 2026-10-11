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
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      block.title.toLowerCase().includes(q) ||
      block.description.toLowerCase().includes(q) ||
      block.type.toLowerCase().includes(q);
    const matchesCategory = selectedCategory === 'all' || block.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <aside className="retro-sidebar">
      <div className="retro-windowbar">
        <span>Block Palette&nbsp; <b>{allBlocks.length}</b></span>
        <div className="retro-window-controls"><i /><i /><i /></div>
      </div>

      <div className="retro-sidebar-top">
        <div className="retro-tabs">
          <button
            type="button"
            className={activeTab === 'blocks' ? 'active' : ''}
            onClick={() => setActiveTab('blocks')}
          >
            <Layers size={14} /> Blocks
          </button>
          <button
            type="button"
            className={activeTab === 'templates' ? 'active' : ''}
            onClick={() => setActiveTab('templates')}
          >
            <Workflow size={14} /> Presets
          </button>
        </div>
      </div>

      {activeTab === 'blocks' ? (
        <>
          <div className="retro-sidebar-search">
            <label className="retro-searchbox">
              <Search size={15} />
              <input
                type="text"
                placeholder="Search blocks (login, database, ai)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
            <div className="retro-filters">
              {BLOCK_CATEGORIES.slice(0, 3).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={selectedCategory === cat.id ? 'active' : ''}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="retro-block-list">
            <div className="retro-core-note">
              <span>✦ Core Trio Ready</span>
              <span>v0.1</span>
            </div>

            {filteredBlocks.map((block) => {
              const Icon = ICON_MAP[block.icon] || Layers;
              const isCoreTrio = ['login', 'database', 'aiRequest'].includes(block.type);
              return (
                <div
                  key={block.type}
                  draggable
                  onDragStart={(e) => onDragStart(e, block.type)}
                  className="retro-block-card"
                >
                  <div className="retro-block-studs">
                    <i /><i /><i />
                    <span>{block.badge}</span>
                    {isCoreTrio && <b>CORE</b>}
                  </div>

                  <div className="retro-block-content">
                    <div className="retro-block-icon"><Icon size={20} /></div>
                    <div className="retro-block-copy">
                      <h3>{block.title}</h3>
                      <p>{block.description}</p>
                    </div>
                    <GripVertical size={16} className="retro-grip" />
                  </div>

                  <div className="retro-block-foot">
                    <span>
                      {block.handles.filter((h) => h.type === 'target').length} in&nbsp; • &nbsp;
                      {block.handles.filter((h) => h.type === 'source').length} out
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddBlock(block.type);
                      }}
                    >
                      <Plus size={13} /> Add
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="retro-template-list">
          <p>Load ready-to-run architecture flows built with modular Lego blocks:</p>
          {[
            ['core_trio', 'Standard AI Stack', 'User Login ➔ PostgreSQL DB ➔ Gemini AI Request', 'Starter'],
            ['saas_monetization', 'SaaS Paid Pipeline', 'Login ➔ DB ➔ IF/THEN Gate ➔ Stripe Pay', 'Pro'],
            ['doc_ai_storage', 'Document AI Pipeline', 'Login ➔ Cloud Storage ➔ Gemini AI ➔ DB Analytics', 'Enterprise'],
          ].map(([id, name, desc, badge]) => (
            <button
              type="button"
              key={id}
              onClick={() => onLoadTemplate(id)}
              className={`retro-template-card ${currentTemplateId === id ? 'active' : ''}`}
            >
              <span className="retro-template-title">{name}<b>{badge}</b></span>
              <span>{desc}</span>
            </button>
          ))}
        </div>
      )}

      <div className="retro-sidebar-hint">
        <HelpCircle size={15} />
        <span>Drag blocks onto canvas. Connect handles to define data flow.</span>
      </div>
    </aside>
  );
};
