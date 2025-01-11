import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx,css}',
  ],
  corePlugins: {
    preflight: false,
  },
  plugins: [],
} satisfies Config
