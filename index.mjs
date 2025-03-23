import hash from './src/index.mjs'

export default function getHash (v) {
  if (typeof v === 'string') return hash(v)
  throw new Error('Argument is not a string')
}
