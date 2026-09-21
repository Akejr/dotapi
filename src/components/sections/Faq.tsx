import { ChevronDownIcon } from '@/components/icons';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import type { SiteContent } from '@/content/types';

/**
 * Long-tail question coverage, placed right before the contact CTA so it answers
 * objections at the point of decision.
 *
 * Built on native <details>/<summary> rather than a JS accordion: the answers are
 * present in the DOM whether or not they are open, so they are crawlable and
 * findable with the browser's own in-page search, and the disclosure works with
 * JavaScript disabled. The same items are emitted as FAQPage structured data from
 * the layout.
 */
export function Faq({ content }: { content: SiteContent }) {
  const { faq } = content;

  return (
    <section id="faq" className="scroll-mt-24 bg-paper pt-14 pb-14 lg:pt-16 lg:pb-16">
      <Container>
        <Reveal className="mx-auto max-w-[46rem] text-center">
          <h2 className="text-h2">{faq.heading}</h2>
          <p className="text-body-base mx-auto mt-4 max-w-[40rem] text-body">{faq.body}</p>
        </Reveal>

        <Reveal delay={80} className="mx-auto mt-10 max-w-[52rem] lg:mt-12">
          <ul className="space-y-3">
            {faq.items.map((item) => (
              <li key={item.question}>
                <details className="group rounded-[var(--radius-card)] border border-mist-line bg-white px-5 py-1 transition-colors open:border-brand/35 hover:border-brand/35">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-body-base font-semibold text-heading">{item.question}</h3>
                    <ChevronDownIcon
                      className="size-5 shrink-0 text-brand-deep transition-transform duration-200 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="text-body-base pr-9 pb-4 text-body">{item.answer}</p>
                </details>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
