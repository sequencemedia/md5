export default class MD5 {
  static alphabet: string
  static hash (value: number): string
  static rh (n: number): string
  static ad (x: number, y: number): number
  static rl (n: number, c: number): number
  static cm (q: number, a: number, b: number, x: number, s: number, t: number): number
  static ff (a: number, b: number, c: number, d: number, x: number, s: number, t: number): number
  static gg (a: number, b: number, c: number, d: number, x: number, s: number, t: number): number
  static hh (a: number, b: number, c: number, d: number, x: number, s: number, t: number): number
  static ii (a: number, b: number, c: number, d: number, x: number, s: number, t: number): number
  static sb (x: number): number[]
}
