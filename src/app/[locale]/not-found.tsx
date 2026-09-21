import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { getContent } from '@/content';
import { defaultLocale } from '@/content/types';

/**
 * Rendered for unmatched paths inside a locale segment. Next does not pass
 * params to not-found boundaries, so this falls back to the default locale.
 */
export default function NotFound() {
  const { notFound: copy } = getContent(defaultLocale);

  return (
    <section className="surface-ink flex min-h-[70vh] items-center pt-[104px] pb-20 lg:pt-[150px]">
      <Container>
        <p className="text-[0.8125rem] font-semibold tracking-[0.14em] text-brand uppercase">
          {copy.eyebrow}
        </p>
        <h1 className="mt-4 max-w-[32rem] text-[2rem] leading-[1.1] tracking-[-0.035em] text-white sm:text-[2.5rem]">
          {copy.heading}
        </h1>
        <p className="mt-5 max-w-[30rem] text-[0.9375rem] leading-[1.75] text-white/75">
          {copy.body}
        </p>
        <Button href={`/${defaultLocale}`} size="lg" withArrow className="mt-8">
          {copy.cta}
        </Button>
      </Container>
    </section>
  );
}
