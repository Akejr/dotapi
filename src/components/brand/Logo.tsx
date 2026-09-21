import Image from 'next/image';
import { cn } from '@/lib/cn';

/**
 * The DOT lockup and the standalone O, cropped out of "Novos assets/Logo.png" by
 * scripts/build-assets.ps1. That source already ships real transparency, so the
 * white letterforms and the gradient on the bolt are the original pixels.
 */

const WORDMARK = { src: '/brand/dot-wordmark.png', width: 1024, height: 287 } as const;
const MARK = { src: '/brand/dot-mark.png', width: 387, height: 353 } as const;

export function Wordmark({
  className,
  priority = false,
  sizes = '200px',
}: {
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      {...WORDMARK}
      alt="DOT"
      priority={priority}
      sizes={sizes}
      className={cn('w-auto select-none', className)}
    />
  );
}

export function Mark({
  className,
  priority = false,
  sizes = '96px',
}: {
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      {...MARK}
      alt=""
      aria-hidden="true"
      priority={priority}
      sizes={sizes}
      className={cn('w-auto select-none', className)}
    />
  );
}
