import type { ReactNode } from 'react';
import { Mark } from '@/components/brand/Logo';
import { BoltIcon, methodIcons } from '@/components/icons';
import type { SiteContent } from '@/content/types';
import { cn } from '@/lib/cn';

/**
 * The hero diagram: local methods in Angola on one side, the settlement
 * currencies on the other, the DOT mark as the rail in between.
 *
 * Horizontal on large screens and stacked vertically on small ones, exactly as
 * the two design files specify. Card, row and node dimensions are traced from
 * the reference mockups (231px cards, a 137px node, 56px connectors).
 */
export function PaymentFlow({ flow }: { flow: SiteContent['paymentFlow'] }) {
  return (
    <div className="relative">
      {/* Blue bloom behind the rail */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl [background:radial-gradient(circle,color-mix(in_oklab,var(--color-brand)_22%,transparent),transparent_65%)]"
      />

      <div className="flex flex-col items-center lg:flex-row lg:items-center">
        {/* Source: local methods */}
        <FlowCard
          title={flow.source.title}
          className="w-full max-w-[17rem] sm:max-w-[20rem] lg:max-w-none lg:min-w-0 lg:flex-1"
        >
          <ul className="space-y-5">
            {flow.source.methods.map((method) => {
              const Icon = methodIcons[method.icon];
              return (
                <li
                  key={method.name}
                  className="row-on-ink flex items-center gap-3 rounded-xl px-3.5 py-[1.375rem]"
                >
                  {/* The design uses a plain white glyph on a barely-there tile */}
                  <span className="grid size-11 shrink-0 place-items-center rounded-[0.75rem] bg-white/5 text-white">
                    <Icon className="size-[1.6rem]" />
                  </span>
                  <span className="min-w-0 leading-[1.35]">
                    <span className="block text-[1.0625rem] font-semibold text-white">
                      {method.name}
                    </span>
                    <span className="block text-[1.0625rem] font-semibold text-white">
                      {method.suffix}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </FlowCard>

        {/* Rail: vertical on mobile, horizontal from lg up */}
        <Connector />

        {/* The DOT mark */}
        <div className="relative shrink-0">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 scale-150 rounded-full opacity-80 blur-2xl [animation:dot-breathe_5s_ease-in-out_infinite] [background:radial-gradient(circle,color-mix(in_oklab,var(--color-brand)_30%,transparent),transparent_60%)]"
          />
          <div className="grid size-[11rem] place-items-center rounded-[1.75rem] border border-brand/35 bg-ink-raised/90 shadow-[inset_0_1px_0_color-mix(in_oklab,var(--color-brand)_22%,transparent),0_30px_60px_-30px_#000] lg:size-[8.5rem] lg:rounded-[1.375rem]">
            <Mark
              priority
              className="h-[5.5rem] lg:h-[4.25rem]"
              sizes="(max-width: 1024px) 104px, 80px"
            />
          </div>
        </div>

        <Connector />

        {/* Destination: settlement currencies */}
        <FlowCard
          title={flow.destination.title}
          className="w-full max-w-[17rem] sm:max-w-[20rem] lg:max-w-none lg:min-w-0 lg:flex-1"
        >
          <ul className="space-y-2.5">
            {flow.destination.currencies.map((currency) => (
              <li
                key={currency.code}
                className="row-on-ink flex items-center gap-3 rounded-xl px-3.5 py-3"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/8 text-[0.9375rem] font-semibold text-white">
                  {currency.symbol}
                </span>
                <span className="text-[1.0625rem] font-semibold text-white">{currency.code}</span>
              </li>
            ))}
            {/* The design shows a "more currencies" affordance on desktop only. */}
            <li
              aria-hidden="true"
              className="row-on-ink hidden items-center justify-center rounded-xl py-4 text-[0.875rem] leading-none tracking-[0.25em] text-white/45 lg:flex"
            >
              ...
            </li>
          </ul>
        </FlowCard>
      </div>

      {/* Badge */}
      <div className="mt-6 flex justify-center lg:-mt-3">
        <p className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/12 px-4 py-2.5 text-[0.875rem] font-medium text-white backdrop-blur-sm">
          <span className="grid size-5 place-items-center rounded-full bg-brand text-ink">
            <BoltIcon className="size-3" />
          </span>
          {flow.badge}
        </p>
      </div>
    </div>
  );
}

function FlowCard({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-[1.25rem] border border-brand/18 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-brand)_9%,transparent),color-mix(in_oklab,var(--color-brand)_2%,transparent))] p-5 backdrop-blur-sm',
        className,
      )}
    >
      <p className="mb-7 whitespace-pre-line text-center text-[0.875rem] leading-[1.35] font-medium text-brand">
        {title}
      </p>
      {children}
    </div>
  );
}

/** Dotted rail — vertical while stacked, horizontal once the row layout kicks in. */
function Connector() {
  return (
    <>
      <span
        aria-hidden="true"
        className="connector-y my-2 h-7 w-px [animation:dot-flow-y_900ms_linear_infinite] lg:hidden"
      />
      <span
        aria-hidden="true"
        className="connector-x hidden h-px w-12 shrink-0 [animation:dot-flow-x_900ms_linear_infinite] lg:block xl:w-14"
      />
    </>
  );
}
