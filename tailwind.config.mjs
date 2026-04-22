import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        base: 'rgb(var(--bg-base) / <alpha-value>)',
        surface: 'rgb(var(--bg-surface) / <alpha-value>)',
        elevated: 'rgb(var(--bg-elevated) / <alpha-value>)',
        'text-primary': 'rgb(var(--text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--text-secondary) / <alpha-value>)',
        'text-muted': 'rgb(var(--text-muted) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          hover: 'rgb(var(--accent-hover) / <alpha-value>)',
          subtle: 'var(--accent-subtle)',
        },
        border: 'rgb(var(--border) / <alpha-value>)',
        code: 'rgb(var(--code-bg) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['LXGW WenKai', 'Noto Serif SC', 'Georgia', ...defaultTheme.fontFamily.serif],
        serif: ['LXGW WenKai', 'Noto Serif SC', 'Georgia', ...defaultTheme.fontFamily.serif],
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        'fluid-xs': ['clamp(0.8125rem, 0.75rem + 0.3vw, 0.9375rem)', { lineHeight: '1.5' }],
        'fluid-sm': ['clamp(0.9375rem, 0.85rem + 0.4vw, 1.0625rem)', { lineHeight: '1.6' }],
        'fluid-base': ['clamp(1.0625rem, 0.95rem + 0.55vw, 1.25rem)', { lineHeight: '1.75' }],
        'fluid-lg': ['clamp(1.1875rem, 1.05rem + 0.65vw, 1.5rem)', { lineHeight: '1.6' }],
        'fluid-xl': ['clamp(1.625rem, 1.3rem + 1.6vw, 2.625rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'fluid-2xl': ['clamp(2.125rem, 1.6rem + 2.6vw, 4.25rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        prose: '70ch',
        'prose-lg': '75ch',
        layout: '1200px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'ghost-in': {
          '0%': { opacity: '0', filter: 'blur(4px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'ghost-in': 'ghost-in 0.4s ease-out forwards',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'rgb(var(--text-primary))',
            '--tw-prose-headings': 'rgb(var(--text-primary))',
            '--tw-prose-lead': 'rgb(var(--text-secondary))',
            '--tw-prose-links': 'rgb(var(--accent))',
            '--tw-prose-bold': 'rgb(var(--text-primary))',
            '--tw-prose-counters': 'rgb(var(--text-muted))',
            '--tw-prose-bullets': 'rgb(var(--text-muted))',
            '--tw-prose-hr': 'rgb(var(--border))',
            '--tw-prose-quotes': 'rgb(var(--text-secondary))',
            '--tw-prose-quote-borders': 'rgb(var(--accent))',
            '--tw-prose-captions': 'rgb(var(--text-muted))',
            '--tw-prose-code': 'rgb(var(--accent))',
            '--tw-prose-pre-code': 'rgb(var(--text-primary))',
            '--tw-prose-pre-bg': 'rgb(var(--code-bg))',
            '--tw-prose-th-borders': 'rgb(var(--border))',
            '--tw-prose-td-borders': 'rgb(var(--border))',
            'h1, h2': {
              fontWeight: '700',
              letterSpacing: '-0.02em',
              fontFamily: theme('fontFamily.sans'),
            },
            'h3, h4': {
              fontWeight: '600',
              letterSpacing: '-0.01em',
              fontFamily: theme('fontFamily.sans'),
            },
            'p, ul, ol': {
              fontWeight: '400',
              fontFamily: theme('fontFamily.serif'),
            },
            'blockquote p': {
              fontStyle: 'normal',
              fontFamily: theme('fontFamily.serif'),
            },
            'code': {
              fontWeight: '500',
              fontFamily: theme('fontFamily.mono'),
            },
            'pre': {
              borderRadius: theme('borderRadius.md'),
              border: `1px solid ${'rgb(var(--border))'}`,
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': 'rgb(var(--text-primary))',
            '--tw-prose-headings': 'rgb(var(--text-primary))',
            '--tw-prose-lead': 'rgb(var(--text-secondary))',
            '--tw-prose-links': 'rgb(var(--accent))',
            '--tw-prose-bold': 'rgb(var(--text-primary))',
            '--tw-prose-counters': 'rgb(var(--text-muted))',
            '--tw-prose-bullets': 'rgb(var(--text-muted))',
            '--tw-prose-hr': 'rgb(var(--border))',
            '--tw-prose-quotes': 'rgb(var(--text-secondary))',
            '--tw-prose-quote-borders': 'rgb(var(--accent))',
            '--tw-prose-captions': 'rgb(var(--text-muted))',
            '--tw-prose-code': 'rgb(var(--accent))',
            '--tw-prose-pre-code': 'rgb(var(--text-primary))',
            '--tw-prose-pre-bg': 'rgb(var(--code-bg))',
            '--tw-prose-th-borders': 'rgb(var(--border))',
            '--tw-prose-td-borders': 'rgb(var(--border))',
          },
        },
      }),
    },
  },
  plugins: [typography],
};
