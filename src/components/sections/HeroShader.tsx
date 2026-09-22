'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

/**
 * Decides whether the animated hero backdrop should exist at all, and only then
 * downloads it.
 *
 * Two gates:
 *  - Reduced motion: a continuously animating background is exactly what that
 *    preference is asking us not to do, so it is skipped entirely. Gating in JS
 *    rather than in CSS means the browser never creates a WebGL context it would
 *    only hide.
 *  - Code splitting: dynamic import with ssr false keeps the shader out of the
 *    server HTML and out of the initial bundle, so it cannot delay first paint
 *    or the largest contentful paint.
 *
 * Opacity and masking differ between mobile and desktop and live in
 * `.hero-shader` in globals.css, where the two media queries can sit next to
 * each other.
 */
const ShaderBackground = dynamic(
  () => import('@/components/ui/ShaderBackground').then((module) => module.ShaderBackground),
  { ssr: false },
);

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

export function HeroShader() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(REDUCED_MOTION);

    const update = () => setEnabled(!reduced.matches);
    update();

    reduced.addEventListener('change', update);
    return () => reduced.removeEventListener('change', update);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className={
        'hero-shader pointer-events-none absolute inset-0 -z-10 ' +
        '[animation:dot-fade-in_1.2s_var(--ease-out-soft)_both]'
      }
    >
      <ShaderBackground className="size-full" />
    </div>
  );
}
