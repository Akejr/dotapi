'use client';

import { useCallback, type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type RevealTag = 'div' | 'section' | 'article' | 'header' | 'li';

type RevealProps = {
  children: ReactNode;
  /** Element to render, for when the surrounding markup needs specific semantics. */
  as?: RevealTag;
  /** Stagger offset in milliseconds. */
  delay?: number;
  className?: string;
  id?: string;
};

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.08,
  rootMargin: '0px 0px -8% 0px',
};

/**
 * Fades content up the first time it scrolls into view.
 *
 * Progressive enhancement by design: the hidden state only applies once the
 * bootstrap script in the document head has added `js-reveal`, so with
 * JavaScript disabled — or when the visitor prefers reduced motion — everything
 * renders in its final, fully visible state.
 *
 * The visible flag is written straight to the DOM node rather than held in state.
 * There is nothing for React to re-render, and it keeps the whole effect to a
 * single observer per element.
 */
export function Reveal({ children, as = 'div', delay = 0, className, id }: RevealProps) {
  const observe = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      node.setAttribute('data-visible', 'true');
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute('data-visible', 'true');
        observer.disconnect();
      }
    }, OBSERVER_OPTIONS);

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const shared = {
    ref: observe,
    id,
    className: cn('reveal', className),
    'data-visible': 'false',
    style: delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined,
  };

  switch (as) {
    case 'section':
      return <section {...shared}>{children}</section>;
    case 'article':
      return <article {...shared}>{children}</article>;
    case 'header':
      return <header {...shared}>{children}</header>;
    case 'li':
      return <li {...shared}>{children}</li>;
    default:
      return <div {...shared}>{children}</div>;
  }
}
