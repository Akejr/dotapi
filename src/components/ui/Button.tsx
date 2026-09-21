import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowRightIcon } from '@/components/icons';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-full font-semibold ' +
  'whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] ' +
  'duration-200 ease-out active:translate-y-px disabled:pointer-events-none disabled:opacity-60';

const variants: Record<Variant, string> = {
  /* Solid brand blue with ink text: every primary action in the design. */
  primary:
    'bg-brand text-ink shadow-[0_10px_30px_-12px_color-mix(in_oklab,var(--color-brand)_75%,transparent)] ' +
    'hover:bg-brand-bright hover:shadow-[0_14px_36px_-12px_color-mix(in_oklab,var(--color-brand)_85%,transparent)]',
  /* Blue hairline pill with a blue label: the secondary action in both design files. */
  outline: 'border border-brand/45 text-brand hover:border-brand hover:bg-brand/10',
  ghost: 'text-heading hover:text-brand-deep',
};

/* Heights traced from the design: 44px nav pill, 60px hero CTA (54px on mobile). */
const sizes: Record<Size, string> = {
  sm: 'h-11 px-5 text-[0.9375rem]',
  md: 'h-[3.25rem] px-6 text-[0.9375rem] lg:text-base',
  lg: 'h-[3.375rem] px-7 text-[0.9375rem] lg:h-[3.75rem] lg:px-10 lg:text-base',
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Renders the trailing arrow shown on the CTAs in the design. */
  withArrow?: boolean;
};

type ButtonAsLink = CommonProps & {
  href: string;
  /** Opens in a new tab with the usual rel hardening. */
  external?: boolean;
  onClick?: () => void;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className,
    withArrow = false,
    ...rest
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      <span>{children}</span>
      {withArrow ? (
        <ArrowRightIcon className="size-[1.05em] transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
      ) : null}
    </>
  );

  if ('href' in rest) {
    const { href, external, onClick } = rest;
    return (
      <Link
        href={href}
        onClick={onClick}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
