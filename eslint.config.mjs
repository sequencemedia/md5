import globals from 'globals'
import {
  configs as standard
} from '@sequencemedia/eslint-config-standard'
import {
  configs as typescript
} from '@sequencemedia/eslint-config-typescript'

export default [
  {
    ...standard.recommended,
    files: [
      '*.cjs'
    ],
    languageOptions: {
      ...standard.recommended.languageOptions,
      globals: {
        ...globals.node
      }
    }
  },
  {
    ...standard.recommended,
    files: [
      '*.{mts,mjs}'
    ],
    ignores: [
      'test/*.{mts,mjs}'
    ]
  },
  {
    ...typescript.recommended,
    files: [
      '*.mts'
    ],
    ignores: [
      'test/*.{mts,mjs}'
    ]
  },
  {
    ...standard.recommended,
    files: [
      'test/**/*.{mts,mjs}'
    ],
    languageOptions: {
      ...standard.recommended.languageOptions,
      globals: {
        ...globals.mocha
      }
    }
  }
]
