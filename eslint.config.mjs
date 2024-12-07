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
      '*.{mjs,cjs,mts,cts}'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  {
    ...typescript.recommended,
    files: [
      '*.{mts,cts}'
    ],
    rules: {
      '@typescript-eslint/max-params': [
        'error',
        {
          max: 7
        }
      ]
    }
  }
]
