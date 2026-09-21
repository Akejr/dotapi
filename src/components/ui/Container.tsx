import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * The single horizontal rhythm for the page, driven by the `--page-*` custom
 * properties in globals.css so full-bleed sections can align to the same measure.
 */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn('mx-auto w-full max-w-[var(--page-max)] px-[var(--page-pad)]', className)}
    >
      {children}
    </div>
  );
}
