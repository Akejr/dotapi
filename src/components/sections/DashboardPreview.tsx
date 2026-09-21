import { Wordmark } from '@/components/brand/Logo';
import { ArrowRightIcon, ChevronDownIcon, dashboardIcons, TrendUpIcon } from '@/components/icons';
import { cn } from '@/lib/cn';
import type { SiteContent } from '@/content/types';

/**
 * The DOT dashboard, rebuilt in markup rather than dropped in as a bitmap so it
 * stays sharp at every density and reflows on small screens the way the mobile
 * design shows it. Surfaces, the solid blue active row, the blue "Paid" badges
 * and the green deltas all come from "Novos assets/Dashboard.png".
 *
 * The numbers are illustrative, so the whole block is exposed to assistive tech
 * as a single labelled image instead of a wall of fake data.
 */
export function DashboardPreview({
  content,
  className,
}: {
  content: SiteContent;
  className?: string;
}) {
  const { a11y, dashboard, meta } = content;

  return (
    <div
      role="img"
      aria-label={a11y.dashboardAlt}
      className={cn(
        'relative overflow-hidden rounded-[var(--radius-panel)] border border-brand/15 bg-ink-panel',
        'shadow-[0_40px_90px_-40px_rgba(0,0,0,0.65)]',
        className,
      )}
    >
      {/* Rim light, matching the soft blue edge in the source render */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[var(--radius-panel)] ring-1 ring-inset ring-white/6"
      />

      <div aria-hidden="true" className="relative">
        {/* Mobile-only top bar: brand on the left, range picker on the right */}
        <div className="flex items-center justify-between gap-3 px-4 pt-4 lg:hidden">
          <Wordmark className="h-[17px]" sizes="120px" />
          <RangePicker label={dashboard.range} />
        </div>

        <div className="flex">
          {/* Rail */}
          <div className="shrink-0 border-r border-white/6 px-3 py-4 lg:w-[27%] lg:px-4 lg:py-5">
            <div className="mb-6 hidden lg:block">
              <Wordmark className="h-[19px]" sizes="140px" />
              <p className="mt-1.5 text-[0.5rem] leading-[1.35] text-on-dark-muted">
                {meta.tagline}
              </p>
            </div>

            <ul className="space-y-2.5 lg:space-y-1">
              {dashboard.nav.map((item, index) => {
                const Icon = dashboardIcons[item.icon];
                const active = index === 0;
                return (
                  <li key={item.label}>
                    <span
                      className={cn(
                        'flex items-center justify-center gap-2.5 rounded-[0.625rem] px-2 py-2 text-[0.75rem] font-medium lg:justify-start lg:px-2.5',
                        active ? 'bg-brand-strong text-white' : 'text-on-dark-muted/85',
                      )}
                    >
                      <Icon className="size-[1.0625rem] shrink-0" />
                      <span className="hidden truncate lg:inline">{item.label}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Main */}
          <div className="min-w-0 flex-1 p-4 lg:p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-white lg:text-[1.125rem]">
                {dashboard.title}
              </p>
              <div className="hidden lg:block">
                <RangePicker label={dashboard.range} />
              </div>
            </div>

            <div className="mt-3.5 grid gap-2.5 lg:mt-4 lg:grid-cols-3">
              {dashboard.stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}

              <div className="rounded-[0.875rem] border border-brand/12 bg-ink-card p-3.5">
                <p className="text-[0.6875rem] text-on-dark-muted">{dashboard.settlement.label}</p>
                <p className="mt-1.5 text-[1.0625rem] font-semibold tracking-[-0.02em] text-white xl:text-[1.125rem]">
                  {dashboard.settlement.value}
                </p>
                <p className="mt-1.5 text-[0.75rem] text-on-dark-muted">
                  {dashboard.settlement.date}
                </p>
              </div>
            </div>

            {/* Payments table — desktop only, mirroring the mobile design */}
            <div className="mt-3 hidden rounded-[0.875rem] border border-brand/12 bg-ink-sunken p-4 lg:mt-4 lg:block">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[1rem] font-semibold tracking-[-0.02em] text-white">
                  {dashboard.payments.title}
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-[0.5rem] border border-white/12 px-2.5 py-1.5 text-[0.6875rem] font-medium text-white">
                  {dashboard.payments.viewAll}
                  <ArrowRightIcon className="size-3" />
                </span>
              </div>

              <table className="mt-3 w-full border-collapse text-left">
                <thead>
                  <tr>
                    {dashboard.payments.columns.map((column) => (
                      <th
                        key={column}
                        scope="col"
                        className="pb-2.5 text-[0.6875rem] font-normal text-on-dark-muted"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dashboard.payments.rows.map((row) => (
                    <tr key={`${row.date}-${row.method}`} className="border-t border-brand/10">
                      <td className="py-2.5 text-[0.75rem] text-white/90">{row.date}</td>
                      <td className="py-2.5 text-[0.75rem] text-white/90">{row.method}</td>
                      <td className="py-2.5 text-[0.75rem] text-white/90">{row.amount}</td>
                      <td className="py-2.5">
                        <span className="inline-flex rounded-[0.375rem] bg-brand-ink px-2 py-1 text-[0.6875rem] font-medium text-brand-glow">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RangePicker({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-[0.625rem] border border-white/12 bg-ink-card px-2.5 py-1.5 text-[0.6875rem] font-medium whitespace-nowrap text-white">
      {label}
      <ChevronDownIcon className="size-3 text-on-dark-muted" />
    </span>
  );
}

function StatCard({
  label,
  value,
  delta,
  trend,
}: {
  label: string;
  value: string;
  delta: string;
  trend: readonly number[];
}) {
  return (
    <div className="rounded-[0.875rem] border border-brand/12 bg-ink-card p-3.5">
      <p className="text-[0.6875rem] text-on-dark-muted">{label}</p>
      <p className="mt-1.5 text-[1.0625rem] font-semibold tracking-[-0.02em] text-white xl:text-[1.125rem]">
        {value}
      </p>
      <div className="mt-2 flex items-end justify-between gap-3">
        {/* Positive change is green in the design, against the blue chart */}
        <span className="text-positive inline-flex shrink-0 items-center gap-1 text-[0.6875rem] font-medium">
          <TrendUpIcon className="size-3" />
          {delta}
        </span>
        <Sparkline id={slug(label)} data={trend} className="h-7 w-3/5" />
      </div>
    </div>
  );
}

/** Left/right insets keep the end marker and the round caps inside the viewBox. */
const SPARK_X0 = 2;
const SPARK_X1 = 97;

function Sparkline({
  id,
  data,
  className,
}: {
  id: string;
  data: readonly number[];
  className?: string;
}) {
  const y = (value: number) => 34 - value * 29;
  const points = data.map((value, index) => {
    const x = SPARK_X0 + (index / (data.length - 1)) * (SPARK_X1 - SPARK_X0);
    return `${x.toFixed(2)},${y(value).toFixed(2)}`;
  });

  const line = `M${points.join(' L')}`;
  const area = `${line} L${SPARK_X1},38 L${SPARK_X0},38 Z`;
  const last = data[data.length - 1] ?? 0;
  const gradientId = `spark-gradient-${id}`;

  return (
    <svg
      viewBox="0 0 100 38"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId})`} />
      <path
        d={line}
        fill="none"
        stroke="var(--color-brand-glow)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={SPARK_X1} cy={y(last)} r="2" fill="var(--color-brand-glow)" />
    </svg>
  );
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}
