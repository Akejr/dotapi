'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localeOptions } from '@/content';
import { locales, type Locale } from '@/content/types';
import { cn } from '@/lib/cn';

/**
 * Segmented EN / PT control. Each option is a real link to the same page in the
 * other language, so it works without JavaScript and is crawlable.
 */
export function LanguageSwitcher({
  locale,
  label,
  className,
  onNavigate,
}: {
  locale: Locale;
  label: string;
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname() ?? `/${locale}`;

  /* Strip the current locale segment to get the path we should keep. */
  const rest = locales.reduce(
    (path, candidate) =>
      path === `/${candidate}` || path.startsWith(`/${candidate}/`)
        ? path.slice(candidate.length + 1)
        : path,
    pathname,
  );

  return (
    <div
      aria-label={label}
      className={cn(
        'inline-flex items-center rounded-full border border-white/15 p-0.5',
        className,
      )}
    >
      {localeOptions.map((option) => {
        const active = option.locale === locale;
        return (
          <Link
            key={option.locale}
            href={`/${option.locale}${rest}`}
            aria-current={active ? 'true' : undefined}
            onClick={onNavigate}
            title={option.name}
            className={cn(
              'rounded-full px-2.5 py-1 text-[0.75rem] font-semibold uppercase transition-colors',
              active ? 'bg-brand text-ink' : 'text-white/65 hover:text-white',
            )}
          >
            {option.locale}
            <span className="sr-only"> — {option.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
