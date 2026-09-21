import Link from 'next/link';
import { Wordmark } from '@/components/brand/Logo';
import { socialIcons } from '@/components/icons';
import { Container } from '@/components/ui/Container';
import { localePath } from '@/content';
import type { Locale, SiteContent } from '@/content/types';
import { brand } from '@/lib/brand';

export function Footer({ locale, content }: { locale: Locale; content: SiteContent }) {
  const { a11y, footer, meta } = content;
  const year = new Date().getFullYear();
  const href = (target: string) => localePath(locale, target);

  return (
    <footer className="bg-ink text-white">
      <Container>
        <div className="flex flex-col gap-9 pt-12 pb-8 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8 lg:pt-12 lg:pb-7">
          {/* Brand */}
          <div>
            <Link href={href('/')} aria-label={a11y.home} className="inline-flex">
              <Wordmark className="h-8" sizes="200px" />
            </Link>
            <p className="mt-3 text-[0.9375rem] text-on-dark-muted">{meta.tagline}</p>
          </div>

          {/* Links */}
          <nav aria-label={a11y.footerNav}>
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {footer.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={href(link.href)}
                    className="text-[0.9375rem] text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <ul className="flex items-center gap-2 lg:justify-end">
            {brand.social.map((item) => {
              const Icon = socialIcons[item.icon];
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="grid size-10 place-items-center rounded-full text-on-dark-muted transition-colors hover:bg-white/8 hover:text-white"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/8 py-[1.125rem] text-[0.8125rem] text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brand.name}. {footer.legal}
          </p>
          <p>{footer.note}</p>
        </div>
      </Container>
    </footer>
  );
}
