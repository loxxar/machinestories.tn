'use client';

import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table des matières" className="sticky top-24">
      <h2 className="font-heading text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wide">
        Sommaire
      </h2>
      <ul className="space-y-2 border-l border-white/10">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`
                block text-sm transition-colors py-1 border-l-2 -ml-px
                ${heading.level === 2 ? 'pl-4' : heading.level === 3 ? 'pl-6' : 'pl-8'}
                ${activeId === heading.id 
                  ? 'text-cyan-400 border-cyan-400 font-medium' 
                  : 'text-slate-500 border-transparent hover:text-slate-300 hover:border-slate-500'}
              `}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(heading.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  setActiveId(heading.id);
                }
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
