import { defineConfig } from 'unocss'

export default defineConfig({
  shortcuts: {
    // Backgrounds
    'bg-main': 'bg-[#faf7f4] text-[#2b2620] dark:(bg-[#181513] text-[#f0ebe5])',
    'bg-soft': 'bg-[#f3ede6] dark:bg-[#211c18]',
    'bg-accent': 'bg-[#c1502e] text-white',
    'bg-accent-soft': 'bg-[#c1502e]/10 text-[#c1502e] dark:(bg-[#e08a63]/15 text-[#f2b393])',
    'bg-success': 'bg-[#059669]/10 text-[#059669] dark:(bg-[#34d399]/15 text-[#6ee7b7])',
    'bg-warning': 'bg-[#b45309]/10 text-[#b45309] dark:(bg-[#f59e0b]/15 text-[#fcd34d])',
    'bg-danger': 'bg-[#dc2626]/10 text-[#dc2626] dark:(bg-[#f87171]/15 text-[#fca5a5])',

    // Text
    'text-accent': 'text-[#c1502e] dark:text-[#e08a63]',
    'text-muted': 'text-[#7a6f63] dark:text-[#a89e93]',
    'text-heading': 'text-[#2b2620] dark:text-[#f0ebe5]',

    // Components
    'card': 'rounded-xl border border-[#e7ddd3] dark:border-[#3d362f] bg-white dark:bg-[#211c18] p-6 shadow-sm',
    'card-accent': 'rounded-xl border-l-4 border-[#c1502e] bg-[#c1502e]/5 dark:(border-[#e08a63] bg-[#e08a63]/10) p-5',
    'badge': 'inline-block px-3 py-1 rounded-full text-sm font-medium',
    'badge-accent': 'badge bg-accent-soft',
    'badge-success': 'badge bg-success',
    'badge-warning': 'badge bg-warning',
    'divider': 'border-t border-[#e7ddd3] dark:border-[#3d362f] my-4',

    // Layout helpers
    'slide-padding': 'px-14 py-8',
    'flex-center': 'flex items-center justify-center',
    'flex-col-center': 'flex flex-col items-center justify-center',
  },
  theme: {
    colors: {
      primary: {
        50: '#fdf4ef',
        100: '#fbe4d8',
        200: '#f5c7ab',
        300: '#eda276',
        400: '#e08a63',
        500: '#c1502e',
        600: '#a8431f',
        700: '#8f3a1f',
        800: '#6b2f1c',
        900: '#4a2317',
      },
    },
  },
})
