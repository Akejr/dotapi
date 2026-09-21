'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Wordmark } from '@/components/brand/Logo';
import { CloseIcon, MenuIcon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { localePath } from '@/content';
import type { Locale, SiteContent } from '@/content/types';
import { cn } from '@/lib/cn';

/**
 * Landing-page header: the brand, the sections of this page, the language
 * switcher and the primary CTA. No dropdowns and no links off the page — the
 * documentation is reached from the hero's secondary CTA and from the footer.
 */
export function Header({ locale, content }: { locale: Locale; content: SiteContent }) {
  const { a11y, hero, nav } = content;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Swap the transparent hero treatment for a solid bar once the page moves. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Escape closes the mobile sheet. */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  /* Keep the page behind the mobile sheet from scrolling. */
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  const href = (target: string) => localePath(locale, target);
  const close = () => setMobileOpen(false);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled || mobileOpen
          ? 'border-b border-white/8 bg-ink/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container>
        <div className="flex h-[68px] items-center justify-between gap-6 lg:grid lg:h-[84px] lg:grid-cols-[1fr_auto_1fr]">
          {/* Brand */}
          <div className="flex items-center">
            <Link
              href={href('/')}
              aria-label={a11y.home}
              className="inline-flex items-center rounded-sm"
              onClick={close}
            >
              <Wordmark priority className="h-[26px] lg:h-[30px]" sizes="180px" />
            </Link>
          </div>

          {/* Section links */}
          <nav aria-label={a11y.mainNav} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={href(item.href)}
                    className="inline-flex h-9 items-center rounded-full px-3.5 text-[0.9375rem] font-medium text-white/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5">
            {/* Wrapped, not given `hidden`: the switcher sets its own `inline-flex`
                in the same Tailwind layer, which would win the override. Below
                `sm` it lives in the mobile sheet instead. */}
            <span className="hidden sm:block">
              <LanguageSwitcher locale={locale} label={a11y.languageSwitcher} />
            </span>

            {/* Wrapped rather than given `hidden`: the Button's own `inline-flex`
                sits in the same Tailwind layer and would win the override. */}
            <span className="hidden lg:block">
              <Button href={href(hero.primaryCta.href)} size="sm">
                {hero.primaryCta.label}
              </Button>
            </span>

            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? a11y.closeMenu : a11y.openMenu}
              onClick={() => setMobileOpen((open) => !open)}
              className="-mr-1.5 inline-flex size-11 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/8 lg:hidden"
            >
              {mobileOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        hidden={!mobileOpen}
        className="h-[calc(100dvh-68px)] overflow-y-auto border-t border-white/8 bg-ink lg:hidden"
      >
        <Container className="py-6">
          <nav aria-label={a11y.mainNav}>
            <ul className="divide-y divide-white/8">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={href(item.href)}
                    onClick={close}
                    className="block py-4 text-[1.0625rem] font-semibold text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Button
            href={href(hero.primaryCta.href)}
            size="lg"
            withArrow
            className="mt-7 w-full"
            onClick={close}
          >
            {hero.primaryCta.label}
          </Button>

          <div className="mt-7 sm:hidden">
            <LanguageSwitcher
              locale={locale}
              label={a11y.languageSwitcher}
              onNavigate={close}
            />
          </div>
        </Container>
      </div>
    </header>
  );
}
