import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  clean: true,
  include: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './hooks/**/*.{js,jsx,ts,tsx}',
  ],
  exclude: [],
  theme: {
    extend: {},
  },
  jsxFramework: 'react',
  watch: true,
  outdir: 'styled-system',
});
