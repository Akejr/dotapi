import { industryIcons } from '@/components/icons';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import type { SiteContent } from '@/content/types';

export function Industries({ content }: { content: SiteContent }) {
  const { industries } = content;

  return (
    <section className="bg-paper pt-14 pb-12 lg:pt-14 lg:pb-0">
      <Container>
        <Reveal className="mx-auto max-w-[56rem] text-center">
          <h2 className="text-h2">{industries.heading}</h2>
          <p className="text-body-base mx-auto mt-4 max-w-[54rem] text-body">{industries.body}</p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-3 gap-x-4 gap-y-9 sm:gap-x-8 lg:mt-10 lg:grid-cols-6">
          {industries.items.map((item, index) => {
            const Icon = industryIcons[item.icon];
            return (
              <Reveal
                as="li"
                key={item.label}
                delay={index * 55}
                className="flex flex-col items-center gap-3 text-center"
              >
                <Icon className="size-9 text-heading lg:size-10" />
                <span className="text-mini text-body">{item.label}</span>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
