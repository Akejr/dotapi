import type { SVGProps } from 'react';

/**
 * Icon set drawn to match the glyphs in the design files. Every icon is purely
 * decorative, so it is hidden from assistive tech and the adjacent text carries
 * the meaning.
 */
export type IconProps = SVGProps<SVGSVGElement>;

function Svg({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Shared setup for the outlined icons used in the light sections. */
function Outline({ children, ...props }: IconProps) {
  return (
    <Svg
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </Svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Capability icons                                                           */
/* -------------------------------------------------------------------------- */

export const CodeIcon = (props: IconProps) => (
  <Outline {...props}>
    <path d="M8.6 7.4 3.8 12l4.8 4.6" />
    <path d="M15.4 7.4 20.2 12l-4.8 4.6" />
    <path d="M13.5 5.2l-3 13.6" />
  </Outline>
);

export const CardIcon = (props: IconProps) => (
  <Outline {...props}>
    <rect x="2.6" y="5.2" width="18.8" height="13.6" rx="3" />
    <path d="M2.6 9.9h18.8" />
    <path d="M6.3 14.7h4.4" />
  </Outline>
);

export const GlobeIcon = (props: IconProps) => (
  <Outline {...props}>
    <circle cx="12" cy="12" r="9.1" />
    <path d="M2.9 12h18.2" />
    <path d="M12 2.9c2.5 2.5 3.9 5.7 3.9 9.1s-1.4 6.6-3.9 9.1c-2.5-2.5-3.9-5.7-3.9-9.1S9.5 5.4 12 2.9Z" />
  </Outline>
);

export const ChartIcon = (props: IconProps) => (
  <Outline {...props}>
    <path d="M3.4 20.2h17.2" />
    <path d="M6.6 20.2v-5.4" />
    <path d="M11 20.2v-9" />
    <path d="M15.4 20.2v-6.6" />
    <path d="M19.8 20.2V6.2" />
  </Outline>
);

/* -------------------------------------------------------------------------- */
/* Payment method icons (hero flow)                                           */
/* -------------------------------------------------------------------------- */

/**
 * Solid card-terminal glyph, matching the filled white mark used for Multicaixa
 * Express in the hero flow. Drawn as one even-odd path: the display and the
 * keypad bars are holes, the marks inside the display are filled again.
 */
export const MulticaixaIcon = (props: IconProps) => (
  <Svg fill="currentColor" fillRule="evenodd" clipRule="evenodd" {...props}>
    <path d="M5 4.6h14a2.9 2.9 0 0 1 2.9 2.9v9A2.9 2.9 0 0 1 19 19.4H5a2.9 2.9 0 0 1-2.9-2.9v-9A2.9 2.9 0 0 1 5 4.6Zm.7 3.2v4.7h12.6V7.8H5.7Zm1.6 1.3v2.1h2.4V9.1H7.3Zm3.6 0v.9h6.1v-.9h-6.1Zm0 1.2v.9h4.3v-.9h-4.3ZM6.4 14.4v1.6h5.2v-1.6H6.4Zm7.1 0v1.6h4.2v-1.6h-4.2Z" />
  </Svg>
);

export const BankIcon = (props: IconProps) => (
  <Outline {...props}>
    <path d="M2.8 9.6 12 4.2l9.2 5.4" />
    <path d="M4.9 11.2v7.4" />
    <path d="M9.6 11.2v7.4" />
    <path d="M14.4 11.2v7.4" />
    <path d="M19.1 11.2v7.4" />
    <path d="M2.8 19.8h18.4" />
  </Outline>
);

/* -------------------------------------------------------------------------- */
/* Dashboard sidebar icons                                                    */
/* -------------------------------------------------------------------------- */

/** Panel layout glyph used for the dashboard's Overview item. */
export const OverviewIcon = (props: IconProps) => (
  <Outline {...props}>
    <rect x="2.9" y="3.9" width="18.2" height="16.2" rx="3" />
    <path d="M10.2 3.9v16.2" />
    <path d="M10.2 12h10.9" />
  </Outline>
);

/** Stacked cube, for Settlements. */
export const BoxIcon = (props: IconProps) => (
  <Outline {...props}>
    <path d="M20.5 7.9v8.2a1.6 1.6 0 0 1-.83 1.4l-6.9 3.83a1.6 1.6 0 0 1-1.54 0l-6.9-3.83a1.6 1.6 0 0 1-.83-1.4V7.9a1.6 1.6 0 0 1 .83-1.4l6.9-3.83a1.6 1.6 0 0 1 1.54 0l6.9 3.83a1.6 1.6 0 0 1 .83 1.4Z" />
    <path d="M3.7 7.3 12 11.9l8.3-4.6" />
    <path d="M12 21.3V11.9" />
  </Outline>
);

/** Receipt / statement, for Balances. */
export const ReceiptIcon = (props: IconProps) => (
  <Outline {...props}>
    <rect x="4.2" y="2.9" width="15.6" height="18.2" rx="2.6" />
    <path d="M8 7.8h8" />
    <path d="M8 12h8" />
    <path d="M8 16.2h4.6" />
  </Outline>
);

export const HomeIcon = (props: IconProps) => (
  <Outline {...props}>
    <path d="M3.6 10.6 12 4l8.4 6.6V19a1.6 1.6 0 0 1-1.6 1.6H5.2A1.6 1.6 0 0 1 3.6 19v-8.4Z" />
    <path d="M9.6 20.6v-6h4.8v6" />
  </Outline>
);

export const WalletIcon = (props: IconProps) => (
  <Outline {...props}>
    <path d="M20.4 8.4V7a1.8 1.8 0 0 0-1.8-1.8H5A2.4 2.4 0 0 0 2.6 7.6v9A2.4 2.4 0 0 0 5 19h13.6a1.8 1.8 0 0 0 1.8-1.8v-1.4" />
    <path d="M2.6 7.6A2.4 2.4 0 0 1 5 5.2h13.6" />
    <path d="M21.4 10.6h-4.9a1.9 1.9 0 0 0 0 3.8h4.9a.6.6 0 0 0 .6-.6v-2.6a.6.6 0 0 0-.6-.6Z" />
  </Outline>
);

export const SettingsIcon = (props: IconProps) => (
  <Outline {...props}>
    <circle cx="12" cy="12" r="3.1" />
    <path d="M19.5 14.6a1.6 1.6 0 0 0 .32 1.77l.06.06a1.94 1.94 0 1 1-2.74 2.74l-.06-.06a1.6 1.6 0 0 0-1.77-.32 1.6 1.6 0 0 0-.97 1.47v.18a1.94 1.94 0 1 1-3.88 0v-.09a1.6 1.6 0 0 0-1.05-1.47 1.6 1.6 0 0 0-1.77.32l-.06.06a1.94 1.94 0 1 1-2.74-2.74l.06-.06a1.6 1.6 0 0 0 .32-1.77 1.6 1.6 0 0 0-1.47-.97H3.5a1.94 1.94 0 1 1 0-3.88h.09a1.6 1.6 0 0 0 1.47-1.05 1.6 1.6 0 0 0-.32-1.77l-.06-.06A1.94 1.94 0 1 1 7.42 4.2l.06.06a1.6 1.6 0 0 0 1.77.32h.08a1.6 1.6 0 0 0 .97-1.47V3.5a1.94 1.94 0 1 1 3.88 0v.09a1.6 1.6 0 0 0 .97 1.47 1.6 1.6 0 0 0 1.77-.32l.06-.06a1.94 1.94 0 1 1 2.74 2.74l-.06.06a1.6 1.6 0 0 0-.32 1.77v.08a1.6 1.6 0 0 0 1.47.97h.18a1.94 1.94 0 1 1 0 3.88h-.09a1.6 1.6 0 0 0-1.47.97Z" />
  </Outline>
);

/* -------------------------------------------------------------------------- */
/* Industry icons                                                             */
/* -------------------------------------------------------------------------- */

export const CartIcon = (props: IconProps) => (
  <Svg fill="currentColor" {...props}>
    <path d="M1.4 3.3c0-.5.4-.9.9-.9h1.9c.99 0 1.85.68 2.08 1.65l.2.85h13.4c1.2 0 2.07 1.14 1.75 2.29l-1.55 5.6a2.9 2.9 0 0 1-2.79 2.11H8.62a2.9 2.9 0 0 1-2.82-2.2L3.53 4.6a.35.35 0 0 0-.34-.27H2.3a.9.9 0 0 1-.9-.9Z" />
    <circle cx="9.3" cy="19.4" r="2.2" />
    <circle cx="17.6" cy="19.4" r="2.2" />
  </Svg>
);

export const EducationIcon = (props: IconProps) => (
  <Svg fill="currentColor" {...props}>
    <path d="M12.63 2.63a1.6 1.6 0 0 0-1.26 0L1.9 6.77a.9.9 0 0 0 0 1.65l9.47 4.14c.4.18.86.18 1.26 0l9.47-4.14a.9.9 0 0 0 0-1.65L12.63 2.63Z" />
    <path d="M4.6 11.35v3.98c0 .72.38 1.39 1 1.75 1.72 1.02 3.95 1.72 6.4 1.72s4.68-.7 6.4-1.72c.62-.36 1-1.03 1-1.75v-3.98l-1.9.83v2.98c0 .3-.16.58-.42.73-1.36.78-3.2 1.26-5.08 1.26s-3.72-.48-5.08-1.26a.85.85 0 0 1-.42-.73v-2.98l-1.9-.83Z" />
    <path d="M20.55 9.75v5.1a.93.93 0 0 0 1.85 0V8.94l-1.85.81Z" />
  </Svg>
);

/** Solid disc with the play triangle knocked out, as drawn in the design. */
export const StreamingIcon = (props: IconProps) => (
  <Svg fill="currentColor" fillRule="evenodd" clipRule="evenodd" {...props}>
    <path d="M12 2.2a9.8 9.8 0 1 0 0 19.6 9.8 9.8 0 0 0 0-19.6Zm-1.95 6.1 5.85 3.32a.45.45 0 0 1 0 .78l-5.85 3.32a.45.45 0 0 1-.65-.39V8.69a.45.45 0 0 1 .65-.39Z" />
  </Svg>
);

export const CloudIcon = (props: IconProps) => (
  <Svg fill="currentColor" {...props}>
    <path d="M17.9 9.02a6.35 6.35 0 0 0-12.06 1.6 4.7 4.7 0 0 0 .96 9.3h11.1a5.45 5.45 0 0 0 .34-10.9h-.34Z" />
  </Svg>
);

export const GamingIcon = (props: IconProps) => (
  <Svg fill="currentColor" fillRule="evenodd" clipRule="evenodd" {...props}>
    <path d="M8.7 5.1h6.6a7.35 7.35 0 0 1 7.24 8.6l-.55 3.2a3.35 3.35 0 0 1-5.83 1.63l-1.24-1.44a1.15 1.15 0 0 0-.87-.4h-3.1c-.34 0-.66.15-.87.4l-1.24 1.44A3.35 3.35 0 0 1 2.5 16.9l-.55-3.2A7.35 7.35 0 0 1 8.7 5.1ZM7.4 9.9h1.5v1.4h1.4v1.5H8.9v1.4H7.4v-1.4H6v-1.5h1.4V9.9Zm8.3.6a1.05 1.05 0 1 0 0 2.1 1.05 1.05 0 0 0 0-2.1Zm2.2 2.6a1.05 1.05 0 1 0 0 2.1 1.05 1.05 0 0 0 0-2.1Z" />
  </Svg>
);

export const BriefcaseIcon = (props: IconProps) => (
  <Svg fill="currentColor" fillRule="evenodd" clipRule="evenodd" {...props}>
    <path d="M9.4 2.5A2.4 2.4 0 0 0 7 4.9v1.1H4.6A2.9 2.9 0 0 0 1.7 8.9v9.2a2.9 2.9 0 0 0 2.9 2.9h14.8a2.9 2.9 0 0 0 2.9-2.9V8.9A2.9 2.9 0 0 0 19.4 6H17V4.9a2.4 2.4 0 0 0-2.4-2.4H9.4Zm5.8 3.5V4.9a.6.6 0 0 0-.6-.6H9.4a.6.6 0 0 0-.6.6V6h6.4ZM10.6 12a.9.9 0 0 0 0 1.8h2.8a.9.9 0 0 0 0-1.8h-2.8Z" />
  </Svg>
);

/* -------------------------------------------------------------------------- */
/* Interface icons                                                            */
/* -------------------------------------------------------------------------- */

export const CheckIcon = (props: IconProps) => (
  <Outline strokeWidth={2.3} {...props}>
    <path d="M4.4 12.5l5 5.2L19.7 6.4" />
  </Outline>
);

export const CheckCircleIcon = (props: IconProps) => (
  <Svg fill="none" {...props}>
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <path
      d="M7.6 12.4l3.05 3.05 5.75-6.4"
      stroke="#fff"
      strokeWidth={2.1}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ArrowRightIcon = (props: IconProps) => (
  <Outline strokeWidth={2} {...props}>
    <path d="M4.5 12h14.2" />
    <path d="m13 6.4 5.7 5.6-5.7 5.6" />
  </Outline>
);

export const ChevronDownIcon = (props: IconProps) => (
  <Outline strokeWidth={2} {...props}>
    <path d="m6.2 9.4 5.8 5.6 5.8-5.6" />
  </Outline>
);

export const TrendUpIcon = (props: IconProps) => (
  <Outline strokeWidth={2.1} {...props}>
    <path d="M12 19.4V5.2" />
    <path d="m5.8 11.4 6.2-6.2 6.2 6.2" />
  </Outline>
);

export const BoltIcon = (props: IconProps) => (
  <Svg fill="currentColor" {...props}>
    <path d="M13.6 2.2a.6.6 0 0 1 1.05.55l-1.6 6.1h4.3a.7.7 0 0 1 .54 1.14l-8.5 11.8a.6.6 0 0 1-1.06-.54l1.7-6.55H5.9a.7.7 0 0 1-.55-1.13L13.6 2.2Z" />
  </Svg>
);

export const MenuIcon = (props: IconProps) => (
  <Outline strokeWidth={1.9} {...props}>
    <path d="M3.6 6.8h16.8" />
    <path d="M3.6 12h16.8" />
    <path d="M3.6 17.2h16.8" />
  </Outline>
);

export const CloseIcon = (props: IconProps) => (
  <Outline strokeWidth={1.9} {...props}>
    <path d="M5.8 5.8l12.4 12.4" />
    <path d="M18.2 5.8 5.8 18.2" />
  </Outline>
);

/* -------------------------------------------------------------------------- */
/* Social icons                                                               */
/* -------------------------------------------------------------------------- */

export const LinkedInIcon = (props: IconProps) => (
  <Svg fill="currentColor" {...props}>
    <path d="M4.98 3.5a2.24 2.24 0 1 0 0 4.48 2.24 2.24 0 0 0 0-4.48ZM3.1 9.6h3.76V21H3.1V9.6Zm6.13 0h3.6v1.56h.05c.5-.9 1.72-1.85 3.54-1.85 3.78 0 4.48 2.36 4.48 5.43V21h-3.75v-5.32c0-1.27-.02-2.9-1.79-2.9-1.79 0-2.06 1.36-2.06 2.8V21H9.23V9.6Z" />
  </Svg>
);

export const XIcon = (props: IconProps) => (
  <Svg fill="currentColor" {...props}>
    <path d="M17.53 3.5h3.05l-6.66 7.6L21.75 21h-5.7l-4.46-5.83L6.48 21H3.42l7.12-8.13L2.75 3.5h5.84l4.14 5.47 4.8-5.47Zm-1.07 15.68h1.69L7.02 5.22H5.2l11.26 13.96Z" />
  </Svg>
);

export const InstagramIcon = (props: IconProps) => (
  <Svg fill="currentColor" fillRule="evenodd" clipRule="evenodd" {...props}>
    <path d="M7.6 2.2h8.8a5.4 5.4 0 0 1 5.4 5.4v8.8a5.4 5.4 0 0 1-5.4 5.4H7.6a5.4 5.4 0 0 1-5.4-5.4V7.6a5.4 5.4 0 0 1 5.4-5.4Zm0 1.9a3.5 3.5 0 0 0-3.5 3.5v8.8a3.5 3.5 0 0 0 3.5 3.5h8.8a3.5 3.5 0 0 0 3.5-3.5V7.6a3.5 3.5 0 0 0-3.5-3.5H7.6Zm4.4 2.8a5.1 5.1 0 1 1 0 10.2 5.1 5.1 0 0 1 0-10.2Zm0 1.9a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm5.5-2.9a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
  </Svg>
);

export const YouTubeIcon = (props: IconProps) => (
  <Svg fill="currentColor" {...props}>
    <path d="M21.55 7.2a2.51 2.51 0 0 0-1.77-1.78C18.2 5 12 5 12 5s-6.2 0-7.78.42A2.51 2.51 0 0 0 2.45 7.2C2.03 8.78 2.03 12 2.03 12s0 3.22.42 4.8a2.51 2.51 0 0 0 1.77 1.78C5.8 19 12 19 12 19s6.2 0 7.78-.42a2.51 2.51 0 0 0 1.77-1.78c.42-1.58.42-4.8.42-4.8s0-3.22-.42-4.8ZM10.02 15.02V8.98L15.25 12l-5.23 3.02Z" />
  </Svg>
);

/* -------------------------------------------------------------------------- */
/* Registries used by the data-driven sections                                */
/* -------------------------------------------------------------------------- */

export const capabilityIcons = {
  code: CodeIcon,
  card: CardIcon,
  globe: GlobeIcon,
  chart: ChartIcon,
} as const;

export const industryIcons = {
  cart: CartIcon,
  education: EducationIcon,
  streaming: StreamingIcon,
  saas: CloudIcon,
  gaming: GamingIcon,
  digital: BriefcaseIcon,
} as const;

export const dashboardIcons = {
  overview: OverviewIcon,
  home: HomeIcon,
  card: CardIcon,
  balance: ReceiptIcon,
  settlements: BoxIcon,
  bank: BankIcon,
  code: CodeIcon,
  settings: SettingsIcon,
} as const;

export const methodIcons = {
  multicaixa: MulticaixaIcon,
  bank: BankIcon,
} as const;

export const socialIcons = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
  youtube: YouTubeIcon,
} as const;
