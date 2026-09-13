import { defineConfig } from 'unocss'

export default defineConfig({
  shortcuts: {
    // Backgrounds
    'bg-main': 'bg-[#fafbfc] text-[#1a1a2e] dark:(bg-[#0f0f1a] text-[#e2e8f0])',
    'bg-soft': 'bg-[#f0f4f8] dark:bg-[#1a1a2e]',
    'bg-accent': 'bg-[#2563eb] text-white',
    'bg-accent-soft': 'bg-[#2563eb]/10 text-[#2563eb] dark:(bg-[#60a5fa]/15 text-[#93bbfc])',
    'bg-success': 'bg-[#059669]/10 text-[#059669] dark:(bg-[#34d399]/15 text-[#6ee7b7])',
    'bg-warning': 'bg-[#d97706]/10 text-[#d97706] dark:(bg-[#fbbf24]/15 text-[#fde68a])',
    'bg-danger': 'bg-[#dc2626]/10 text-[#dc2626] dark:(bg-[#f87171]/15 text-[#fca5a5])',

    // Text
    'text-accent': 'text-[#2563eb] dark:text-[#60a5fa]',
    'text-muted': 'text-[#64748b] dark:text-[#94a3b8]',
    'text-heading': 'text-[#1e293b] dark:text-[#f1f5f9]',

    // Components
    'card': 'rounded-xl border border-[#e2e8f0] dark:border-[#334155] bg-white dark:bg-[#1e293b] p-6 shadow-sm',
    'card-accent': 'rounded-xl border-l-4 border-[#2563eb] bg-[#2563eb]/5 dark:(border-[#60a5fa] bg-[#60a5fa]/10) p-5',
    'badge': 'inline-block px-3 py-1 rounded-full text-sm font-medium',
    'badge-accent': 'badge bg-accent-soft',
    'badge-success': 'badge bg-success',
    'badge-warning': 'badge bg-warning',
    'divider': 'border-t border-[#e2e8f0] dark:border-[#334155] my-4',

    // Layout helpers
    'slide-padding': 'px-14 py-8',
    'flex-center': 'flex items-center justify-center',
    'flex-col-center': 'flex flex-col items-center justify-center',
  },
  theme: {
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
    },
  },
})
