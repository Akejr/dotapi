import { CheckCircleIcon } from '@/components/icons';
import { DashboardPreview } from '@/components/sections/DashboardPreview';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { localePath } from '@/content';
import type { Locale, SiteContent } from '@/content/types';

export function Benefits({ locale, content }: { locale: Locale; content: SiteContent }) {
  const { benefits } = content;

  return (
    <section id="benefits" className="scroll-mt-24 bg-mist py-14 lg:pt-10 lg:pb-3">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1fr)] lg:gap-10 xl:gap-12">
          <div>
            <Reveal>
              <h2 className="text-h2 whitespace-pre-line">{benefits.heading}</h2>
              <p className="text-body-base mt-5 max-w-[32rem] text-body">{benefits.body}</p>
            </Reveal>

            <Reveal delay={80}>
              <ul className="mt-7 space-y-3">
                {benefits.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircleIcon className="mt-px size-[1.5rem] shrink-0 text-brand-deep" />
                    <span className="text-body-base text-heading">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={140}>
              <Button
                href={localePath(locale, benefits.cta.href)}
                size="lg"
                withArrow
                className="mt-8 w-full sm:w-auto"
              >
                {benefits.cta.label}
              </Button>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <DashboardPreview content={content} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
