import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  ...compat.config({
    rules: {
      'react/react-in-jsx-scope': 'off',
      semi: [2, 'always'],
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'object-curly-spacing': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'jsx-quotes': ['error', 'prefer-double'],
      quotes: ['error', 'single', { avoidEscape: true }],
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'always', children: 'always' },
      ],
    },
  }),
];

export default eslintConfig;
