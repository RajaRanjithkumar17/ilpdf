'use client';

import { useState } from 'react';
import type { Tool } from '@/lib/tools';
import ToolCard from './ToolCard';

const categories = [
  { label: 'All', ids: null },
  { label: 'Organize PDF', ids: ['merge-pdf', 'split-pdf', 'delete-pdf-pages', 'reorder-pdf-pages'] },
  { label: 'Optimize PDF', ids: ['compress-pdf'] },
  { label: 'Convert PDF', ids: ['jpg-to-pdf', 'pdf-to-jpg', 'pdf-to-word', 'pdf-to-excel', 'pdf-to-ppt', 'pdf-to-text'] },
  { label: 'Edit PDF', ids: ['rotate-pdf', 'watermark-pdf', 'redact-pdf'] },
  { label: 'PDF Security', ids: ['protect-pdf', 'unlock-pdf'] },
  { label: 'Advanced', ids: ['ocr-pdf'] },
];

export default function ToolGrid({ tools }: { tools: Tool[] }) {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? tools
    : tools.filter((t) => {
        const cat = categories.find((c) => c.label === active);
        return cat?.ids?.includes(t.id);
      });

  return (
    <>
      {/* Category tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setActive(cat.label)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
              active === cat.label
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tool cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {filtered.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </>
  );
}
