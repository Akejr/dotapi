'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

/**
 * Decides whether the animated hero backdrop should exist at all, and only then
 * downloads it.
 *
 * Three gates, in order of how much they save:
 *  - Viewport: the desktop hero has the payment-flow diagram to carry it, so the
 *    shader is mobile-only. Gating in JS rather than with `lg:hidden` means
 *    desktop never creates a WebGL context it would immediately hide.
 *  - Reduced motion: a continuously animating background is exactly what that
 *    preference is asking us not to do, so it is skipped entirely.
 *  - Code splitting: dynamic import with ssr false keeps the shader out of the
 *    server HTML and out of the initial bundle, so it cannot delay first paint
 *    or the largest contentful paint.
 */
const ShaderBackground = dynamic(
  () => import('@/components/ui/ShaderBackground').then((module) => module.ShaderBackground),
  { ssr: false },
);

const MOBILE = '(max-width: 1023px)';
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

export function HeroShader() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia(MOBILE);
    const reduced = window.matchMedia(REDUCED_MOTION);

    const update = () => setEnabled(mobile.matches && !reduced.matches);
    update();

    mobile.addEventListener('change', update);
    reduced.addEventListener('change', update);
    return () => {
      mobile.removeEventListener('change', update);
      reduced.removeEventListener('change', update);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className={
        /* Sits behind the hero content. `screen` keeps the shader's black areas
           invisible and lets only its blue filaments lift the navy, which is what
           makes it read as texture rather than a video playing behind the copy.
           The mask fades it out before the section boundary. */
        /* 45%: enough to read as movement, low enough that white/75 body copy
           keeps its contrast where the filaments are brightest. */
        'pointer-events-none absolute inset-0 -z-10 opacity-45 mix-blend-screen ' +
        '[animation:dot-fade-in_1.2s_var(--ease-out-soft)_both] ' +
        '[mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_92%)] ' +
        '[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_92%)] ' +
        'lg:hidden'
      }
    >
      <ShaderBackground className="size-full" />
    </div>
  );
}
