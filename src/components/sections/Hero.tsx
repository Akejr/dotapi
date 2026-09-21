import { CheckIcon } from '@/components/icons';
import { PaymentFlow } from '@/components/sections/PaymentFlow';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { localePath } from '@/content';
import type { Locale, SiteContent } from '@/content/types';

export function Hero({ locale, content }: { locale: Locale; content: SiteContent }) {
  const { hero } = content;

  return (
    <section className="surface-ink relative overflow-hidden pt-[104px] pb-14 sm:pt-[120px] lg:pt-[152px] lg:pb-16">
      <Container>
        {/* 0.78 : 1 with a 4% gap, matching the column split in the design */}
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-14 xl:gap-16">
          {/* Copy */}
          <div>
            <Reveal as="header">
              <h1 className="text-display text-white">
                <span className="block">{hero.headline.first}</span>
                <span className="block text-brand">{hero.headline.second}</span>
              </h1>

              <p className="text-lead mt-6 max-w-[29rem] text-white/75">{hero.body}</p>
            </Reveal>

            <Reveal
              delay={90}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5"
            >
              <Button
                href={localePath(locale, hero.primaryCta.href)}
                size="lg"
                withArrow
                className="w-full sm:w-auto"
              >
                {hero.primaryCta.label}
              </Button>
              <Button
                href={localePath(locale, hero.secondaryCta.href)}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                {hero.secondaryCta.label}
              </Button>
            </Reveal>

            <Reveal delay={160}>
              <ul className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-7 sm:gap-y-2">
                {hero.assurances.map((item) => (
                  <li key={item} className="text-mini flex items-center gap-2 text-white/90">
                    <CheckIcon className="size-[1.15em] shrink-0 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Flow diagram */}
          <Reveal delay={120}>
            <PaymentFlow flow={content.paymentFlow} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
