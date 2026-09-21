import path from 'node:path';
import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';

/**
 * Content Security Policy.
 *
 * The site is fully static and ships no third-party scripts, so production stays
 * tight. `unsafe-inline` on styles is required by Next's inlined critical CSS.
 *
 * Development needs two extra allowances that must never reach production:
 * React's dev build uses eval() for its debugging features, and Turbopack's hot
 * reload talks to the dev server over a WebSocket.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? ' ws: wss:' : ''}`,
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'Content-Security-Policy', value: csp },
];

const nextConfig: NextConfig = {
  /**
   * Pin the workspace root. Without this, Turbopack walks up to the user's home
   * directory (which happens to contain a stray package-lock.json) and resolves
   * module paths from there.
   */
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        /**
         * Everything except the framework's own routes. CSP only needs to travel
         * with document responses, and attaching headers to `/_next/hmr` breaks
         * the WebSocket upgrade that powers hot reload.
         */
        source: '/:path((?!_next/).*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
