/**
 * ─────────────────────────────────────────────────────────────────────────────
 * BRAND CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 * Single file to edit when adapting the theme for a new client.
 *
 * Colors flow into  → src/styles/theme.css  (CSS custom properties)
 * Fonts flow into   → astro.config.mjs      (Astro 6 built-in font optimizer)
 * Meta flows into   → src/layouts/BaseLayout.astro
 *
 * Color format: use hex (#1a1a2e) or CSS color values.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const brand = {
  // ── Site Identity ──────────────────────────────────────────────────────────
  name: 'MER Plus',
  tagline: 'Producent toreb papierowych i opakowań reklamowych.',
  description:
    'MER Plus — producent toreb papierowych reklamowych, ozdobnych, na alkohol, toreb eko oraz pudełek prezentowych. Ponad 30 lat doświadczenia.',
  url: 'https://www.merplus.pl',
  locale: 'pl_PL',

  // ── Fonts ──────────────────────────────────────────────────────────────────
  // To swap fonts: change the `name` values here AND update astro.config.mjs
  // to match (both must stay in sync so Astro can optimise the correct files).
  fonts: {
    body: 'Inter',
    display: 'Oswald',
  },

  // ── Colour Palette ─────────────────────────────────────────────────────────
  // These values are written to CSS custom properties in theme.css.
  // Tailwind v4 @theme picks them up automatically.
  colors: {
    primary:      '#A33223',
    primaryLight: '#D6432B',
    primaryFg:    '#ffffff',

    accent:       '#D6432B',
    accentFg:     '#ffffff',

    background:   '#FDF9F4',
    surface:      '#F8F1E8',
    border:       '#EBDFD2',

    text:         '#3A2A22',
    textMuted:    '#7A6A5F',

    dark:         '#3A2A22',
    darkSurface:  '#4A352A',
  },

  // ── Border radius ──────────────────────────────────────────────────────────
  radius: {
    sm:   '0.375rem',
    md:   '0.625rem',
    lg:   '1rem',
    full: '9999px',
  },
} as const;

export type Brand = typeof brand;
