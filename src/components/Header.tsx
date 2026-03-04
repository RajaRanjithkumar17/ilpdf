'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tools as allToolsData } from '@/lib/tools';
import { imageTools as allImageToolsData } from '@/lib/imageTools';

function getToolIcon(href: string): string | undefined {
  const id = href.replace('/tools/', '').replace('/image/', '');
  const pdfIcon = allToolsData.find((t) => t.id === id)?.icon;
  if (pdfIcon) return pdfIcon;
  return allImageToolsData.find((t) => t.id === id)?.icon;
}

// PDF Tools Categories
const pdfCategories = [
  {
    title: 'ORGANIZE PDF',
    tools: [
      { name: 'Merge PDF', href: '/tools/merge-pdf' },
      { name: 'Split PDF', href: '/tools/split-pdf' },
      { name: 'Delete Pages', href: '/tools/delete-pdf-pages' },
      { name: 'Reorder Pages', href: '/tools/reorder-pdf-pages' },
    ],
  },
  {
    title: 'OPTIMIZE PDF',
    tools: [{ name: 'Compress PDF', href: '/tools/compress-pdf' }],
  },
  {
    title: 'CONVERT TO PDF',
    tools: [{ name: 'JPG to PDF', href: '/tools/jpg-to-pdf' }],
  },
  {
    title: 'CONVERT FROM PDF',
    tools: [
      { name: 'PDF to JPG', href: '/tools/pdf-to-jpg' },
      { name: 'PDF to Word', href: '/tools/pdf-to-word' },
      { name: 'PDF to Excel', href: '/tools/pdf-to-excel' },
      { name: 'PDF to PowerPoint', href: '/tools/pdf-to-ppt' },
      { name: 'PDF to Text', href: '/tools/pdf-to-text' },
    ],
  },
  {
    title: 'EDIT PDF',
    tools: [
      { name: 'Rotate PDF', href: '/tools/rotate-pdf' },
      { name: 'Add Watermark', href: '/tools/watermark-pdf' },
    ],
  },
  {
    title: 'PDF SECURITY',
    tools: [
      { name: 'Protect PDF', href: '/tools/protect-pdf' },
      { name: 'Unlock PDF', href: '/tools/unlock-pdf' },
    ],
  },
];

// Image Tools Categories
const imageCategories = [
  {
    title: 'EDIT IMAGE',
    tools: [
      { name: 'Compress Image', href: '/image/compress-image' },
      { name: 'Resize Image', href: '/image/resize-image' },
      { name: 'Crop Image', href: '/image/crop-image' },
      { name: 'Rotate Image', href: '/image/rotate-image' },
    ],
  },
  {
    title: 'CONVERT IMAGE',
    tools: [
      { name: 'Convert to JPG', href: '/image/convert-to-jpg' },
      { name: 'Convert from JPG', href: '/image/convert-from-jpg' },
      { name: 'WebP to JPG', href: '/image/webp-to-jpg' },
      { name: 'HEIC to JPG', href: '/image/heic-to-jpg' },
    ],
  },
  {
    title: 'ENHANCE IMAGE',
    tools: [
      { name: 'Upscale Image', href: '/image/upscale-image' },
      { name: 'Image Watermark', href: '/image/watermark-image' },
      { name: 'Blur Face', href: '/image/blur-face' },
    ],
  },
];

// PDF Convert Tools
const pdfConvertTools = [
  { name: 'JPG to PDF', href: '/tools/jpg-to-pdf' },
  { name: 'PDF to JPG', href: '/tools/pdf-to-jpg' },
  { name: 'PDF to Word', href: '/tools/pdf-to-word' },
  { name: 'PDF to Excel', href: '/tools/pdf-to-excel' },
  { name: 'PDF to PowerPoint', href: '/tools/pdf-to-ppt' },
  { name: 'PDF to Text', href: '/tools/pdf-to-text' },
];

// Image Convert Tools
const imageConvertTools = [
  { name: 'Convert to JPG', href: '/image/convert-to-jpg' },
  { name: 'Convert from JPG', href: '/image/convert-from-jpg' },
  { name: 'WebP to JPG', href: '/image/webp-to-jpg' },
  { name: 'HEIC to JPG', href: '/image/heic-to-jpg' },
];

export default function Header() {
  const pathname = usePathname();
  const isImageSection = pathname.startsWith('/image');

  const [allToolsOpen, setAllToolsOpen] = useState(false);
  const [convertOpen, setConvertOpen] = useState(false);
  const allToolsTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const convertTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  function openAllTools() {
    clearTimeout(allToolsTimer.current);
    setAllToolsOpen(true);
    setConvertOpen(false);
  }

  function scheduleCloseAllTools() {
    allToolsTimer.current = setTimeout(() => setAllToolsOpen(false), 150);
  }

  function openConvert() {
    clearTimeout(convertTimer.current);
    setConvertOpen(true);
    setAllToolsOpen(false);
  }

  function scheduleCloseConvert() {
    convertTimer.current = setTimeout(() => setConvertOpen(false), 150);
  }

  // Select categories and convert tools based on current section
  const categories = isImageSection ? imageCategories : pdfCategories;
  const convertTools = isImageSection ? imageConvertTools : pdfConvertTools;
  const allToolsLabel = isImageSection ? 'All Image Tools' : 'All PDF Tools';
  const convertLabel = isImageSection ? 'Convert Image' : 'Convert PDF';

  // Navigation links based on section
  const navLinks = isImageSection
    ? [
        { name: 'Compress Image', href: '/image/compress-image' },
        { name: 'Resize Image', href: '/image/resize-image' },
        { name: 'Convert to JPG', href: '/image/convert-to-jpg' },
      ]
    : [
        { name: 'Merge PDF', href: '/tools/merge-pdf' },
        { name: 'Split PDF', href: '/tools/split-pdf' },
        { name: 'Compress PDF', href: '/tools/compress-pdf' },
      ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-14 gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 mr-2">
            <Image
              src="/logo.svg"
              alt="IL PDF"
              width={180}
              height={33}
              priority
            />
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-6 py-2 text-[11px] font-bold uppercase tracking-wide text-gray-700 hover:text-red-500 whitespace-nowrap transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              {/* Convert dropdown */}
              <div
                className="relative"
                onMouseEnter={openConvert}
                onMouseLeave={scheduleCloseConvert}
              >
                <button
                  className={`px-6 py-2 text-[11px] font-bold uppercase tracking-wide flex items-center gap-1 whitespace-nowrap transition-colors ${convertOpen ? 'text-red-500' : 'text-gray-700 hover:text-red-500'}`}
                >
                  {convertLabel}
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${convertOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {convertOpen && (
                  <div className="absolute top-full left-0 mt-0 bg-white border border-gray-200 rounded-b-md shadow-lg py-1 min-w-50 z-50">
                    {convertTools.map((tool) => {
                      const icon = getToolIcon(tool.href);
                      return (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          className="flex items-center font-semibold gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-500 transition-colors"
                        >
                          {icon && (
                            <span
                              className="w-5 h-5 shrink-0 [&>svg]:w-full [&>svg]:h-full"
                              dangerouslySetInnerHTML={{ __html: icon }}
                            />
                          )}
                          {tool.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* All Tools dropdown */}
              <div
                onMouseEnter={openAllTools}
                onMouseLeave={scheduleCloseAllTools}
              >
                <button
                  className={`px-3 py-2 text-[11px] font-bold uppercase tracking-wide flex items-center gap-1 whitespace-nowrap transition-colors ${allToolsOpen ? 'text-red-500' : 'text-gray-700 hover:text-red-500'}`}
                >
                  {allToolsLabel}
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${allToolsOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </nav>

            {/* Right side icons */}
            <div className="flex items-center gap-1 ml-auto">
              <button className="p-2 text-gray-400 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="5" cy="5" r="1.5" />
                  <circle cx="12" cy="5" r="1.5" />
                  <circle cx="19" cy="5" r="1.5" />
                  <circle cx="5" cy="12" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="19" cy="12" r="1.5" />
                  <circle cx="5" cy="19" r="1.5" />
                  <circle cx="12" cy="19" r="1.5" />
                  <circle cx="19" cy="19" r="1.5" />
                </svg>
              </button>

              <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-300 transition-colors ml-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.67 0 4.8-2.13 4.8-4.8S14.67 2.4 12 2.4 7.2 4.53 7.2 7.2 9.33 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      {/* All Tools mega menu */}
      {allToolsOpen && (
        <div
          className="absolute top-14 left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-40"
          onMouseEnter={() => clearTimeout(allToolsTimer.current)}
          onMouseLeave={scheduleCloseAllTools}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7">
              <div className={`grid gap-x-6 gap-y-6 ${isImageSection ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'}`}>
                {categories.map((cat) => (
                  <div key={cat.title}>
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                      {cat.title}
                    </h3>
                    <ul className="space-y-2">
                      {cat.tools.map((tool) => {
                        const icon = getToolIcon(tool.href);
                        return (
                          <li key={tool.href}>
                            <Link
                              href={tool.href}
                              className="flex font-medium items-center gap-4 mr-2 py-2 text-sm text-gray-700 hover:text-red-500 transition-colors"
                            >
                              {icon && (
                                <span
                                  className="w-5 h-5 shrink-0 [&>svg]:w-full [&>svg]:h-full"
                                  dangerouslySetInnerHTML={{ __html: icon }}
                                />
                              )}
                              {tool.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
  );
}