import { defineConfig } from '@pandacss/dev';

import { globalCss } from '@dajava/styles/globalStyles';

import { KEYFRAMES } from './styles/keyframs';

export default defineConfig({
  preflight: true,
  clean: true,
  include: [
    './app/**/*.{js,jsx,ts,tsx}',
    './domains/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './hooks/**/*.{js,jsx,ts,tsx}',
  ],
  exclude: [],
  theme: {
    extend: {
      keyframes: KEYFRAMES,
    },
  },
  globalCss: globalCss,
  jsxFramework: 'react',
  watch: true,
  outdir: 'styled-system',
});
