import { capabilityIcons } from '@/components/icons';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import type { SiteContent } from '@/content/types';

export function Capabilities({ content }: { content: SiteContent }) {
  const { capabilities } = content;

  return (
    <section id="product" className="scroll-mt-24 bg-paper pt-14 pb-12 lg:pt-16 lg:pb-14">
      <Container>
        <Reveal className="mx-auto max-w-[46rem] text-center">
          <h2 className="text-h2 whitespace-pre-line">{capabilities.heading}</h2>
          <p className="text-body-base mx-auto mt-5 max-w-[42rem] text-body">
            {capabilities.body}
          </p>
        </Reveal>

        {/* 279px columns with a 68px gutter, matching the four-up grid in the design */}
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-11 lg:mt-14 lg:grid-cols-4 lg:gap-x-[4.25rem]">
          {capabilities.items.map((item, index) => {
            const Icon = capabilityIcons[item.icon];
            return (
              <Reveal as="li" key={item.title} delay={index * 70}>
                <div className="flex items-start gap-4 sm:block">
                  <span className="grid size-14 shrink-0 place-items-center rounded-[var(--radius-tile)] bg-mist text-brand-deep sm:mb-9 sm:size-[4.25rem]">
                    <Icon className="size-7 sm:size-[2.125rem]" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-h3">{item.title}</h3>
                    <p className="text-body-base mt-2.5 max-w-[19rem] text-body">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
