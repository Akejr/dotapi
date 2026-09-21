import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import type { SiteContent } from '@/content/types';

/**
 * Full-bleed split: the globe render on the left, the headline numbers on the
 * right. Stacks into two full-width bands on small screens.
 *
 * "Novos assets/World.png" is composed with the globe on the right and clear
 * navy on the left, at 1.86:1 — almost exactly this panel's ratio at desktop.
 * So the art is used untouched and the copy simply occupies the space the
 * illustration already leaves for it.
 */
export function Bridge({ content }: { content: SiteContent }) {
  const { bridge } = content;

  return (
    <section id="bridge" className="scroll-mt-24">
      <div className="grid lg:grid-cols-[minmax(0,1.38fr)_minmax(0,1fr)]">
        {/* Globe */}
        <div className="relative isolate flex min-h-[24rem] flex-col justify-end overflow-hidden bg-ink px-[var(--page-gutter)] pt-56 pb-12 sm:pt-64 lg:min-h-[28.5rem] lg:justify-center lg:py-20">
          <Image
            src="/images/globe.png"
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="-z-20 object-cover object-[70%_32%] lg:object-center"
          />
          {/* Light veil over the copy only — the artwork is left alone on desktop. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--color-ink)_16%,color-mix(in_oklab,var(--color-ink)_60%,transparent)_48%,transparent_76%)] lg:bg-[linear-gradient(to_right,var(--color-ink)_4%,color-mix(in_oklab,var(--color-ink)_55%,transparent)_30%,transparent_58%)]"
          />

          <Reveal className="relative max-w-[30rem]">
            <h2 className="text-h2 whitespace-pre-line text-white">{bridge.heading}</h2>
            <p className="text-body-sm mt-5 max-w-[19rem] whitespace-pre-line text-white/70">
              {bridge.body}
            </p>
          </Reveal>
        </div>

        {/* Stats */}
        <div className="flex items-center bg-paper-soft py-14 pr-[var(--page-gutter)] pl-[var(--page-gutter)] lg:py-20 lg:pl-[3.5rem] xl:pl-[4.5rem]">
          <dl className="grid w-full grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-10">
            {bridge.stats.map((stat, index) => (
              <Reveal key={stat.value} delay={index * 70}>
                <dt className="text-stat font-bold text-brand-deep">{stat.value}</dt>
                <dd className="text-body-sm mt-3.5 max-w-[12rem] text-body">{stat.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
