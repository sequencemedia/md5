// A module refactor of https://stackoverflow.com/a/60467595/786389

const ALPHABET = '0123456789abcdef'

/**
 *  @param {number} n
 *  @returns {string}
 */
function rh (n) {
  let s = ''

  for (let i = 0; i <= 3; i++) {
    const j = i * 8
    s += ALPHABET.charAt((n >> (j + 4)) & 0x0F) + ALPHABET.charAt((n >> j) & 0x0F)
  }

  return s
}

/**
 *  @param {number} x
 *  @param {number} y
 *  @returns {number}
 */
function ad (x, y) {
  const l = (x & 0xFFFF) + (y & 0xFFFF)
  const m = (x >> 16) + (y >> 16) + (l >> 16)

  return (m << 16) | (l & 0xFFFF)
}

/**
 *  @param {number} n
 *  @param {number} c
 *  @returns {number}
 */
function rl (n, c) {
  return (n << c) | (n >>> (32 - c))
}

/**
 *  @param {number} q
 *  @param {number} a
 *  @param {number} b
 *  @param {number} x
 *  @param {number} s
 *  @param {number} t
 *  @returns {number}
 */
function cm (q, a, b, x, s, t) {
  return ad(rl(ad(ad(a, q), ad(x, t)), s), b)
}

/**
 *  @param {number} a
 *  @param {number} b
 *  @param {number} c
 *  @param {number} d
 *  @param {number} x
 *  @param {number} s
 *  @param {number} t
 *  @returns {number}
 */
function ff (a, b, c, d, x, s, t) {
  return cm(b & c | ~b & d, a, b, x, s, t)
}

/**
 *  @param {number} a
 *  @param {number} b
 *  @param {number} c
 *  @param {number} d
 *  @param {number} x
 *  @param {number} s
 *  @param {number} t
 *  @returns {number}
 */
function gg (a, b, c, d, x, s, t) {
  return cm(b & d | c & ~d, a, b, x, s, t)
}

/**
 *  @param {number} a
 *  @param {number} b
 *  @param {number} c
 *  @param {number} d
 *  @param {number} x
 *  @param {number} s
 *  @param {number} t
 *  @returns {number}
 */
function hh (a, b, c, d, x, s, t) {
  return cm(b ^ c ^ d, a, b, x, s, t)
}

/**
 *  @param {number} a
 *  @param {number} b
 *  @param {number} c
 *  @param {number} d
 *  @param {number} x
 *  @param {number} s
 *  @param {number} t
 *  @returns {number}
 */
function ii (a, b, c, d, x, s, t) {
  return cm(c ^ (b | ~d), a, b, x, s, t)
}

/**
 *  @param {string} value
 *  @returns {number[]}
 */
function sb (value) {
  let i = 0
  const j = value.length
  const n = ((j + 8) >> 6) + 1
  const m = n * 16
  const blocks = Array(m).fill(0)

  for (j; i < j; i++) {
    blocks[i >> 2] |= value.charCodeAt(i) << ((i % 4) * 8)
  }

  blocks[i >> 2] |= 0x80 << ((i % 4) * 8)
  blocks[m - 2] = j * 8

  return blocks
}

/**
 *  Generate a hash for a string
 *
 *  @param {string} value
 *  @returns {string}
 */
export default function hash (value) {
  const blocks = sb(value)

  let i = 0
  const j = blocks.length

  let a = 1732584193
  let b = -271733879
  let c = -1732584194
  let d = 271733878

  for (j; i < j; i += 16) {
    const lastA = a
    const lastB = b
    const lastC = c
    const lastD = d

    a = ff(a, b, c, d, blocks[i], 7, -680876936)
    d = ff(d, a, b, c, blocks[i + 1], 12, -389564586)
    c = ff(c, d, a, b, blocks[i + 2], 17, 606105819)
    b = ff(b, c, d, a, blocks[i + 3], 22, -1044525330)
    a = ff(a, b, c, d, blocks[i + 4], 7, -176418897)
    d = ff(d, a, b, c, blocks[i + 5], 12, 1200080426)
    c = ff(c, d, a, b, blocks[i + 6], 17, -1473231341)
    b = ff(b, c, d, a, blocks[i + 7], 22, -45705983)
    a = ff(a, b, c, d, blocks[i + 8], 7, 1770035416)
    d = ff(d, a, b, c, blocks[i + 9], 12, -1958414417)
    c = ff(c, d, a, b, blocks[i + 10], 17, -42063)
    b = ff(b, c, d, a, blocks[i + 11], 22, -1990404162)
    a = ff(a, b, c, d, blocks[i + 12], 7, 1804603682)
    d = ff(d, a, b, c, blocks[i + 13], 12, -40341101)
    c = ff(c, d, a, b, blocks[i + 14], 17, -1502002290)
    b = ff(b, c, d, a, blocks[i + 15], 22, 1236535329)
    a = gg(a, b, c, d, blocks[i + 1], 5, -165796510)
    d = gg(d, a, b, c, blocks[i + 6], 9, -1069501632)
    c = gg(c, d, a, b, blocks[i + 11], 14, 643717713)
    b = gg(b, c, d, a, blocks[i], 20, -373897302)
    a = gg(a, b, c, d, blocks[i + 5], 5, -701558691)
    d = gg(d, a, b, c, blocks[i + 10], 9, 38016083)
    c = gg(c, d, a, b, blocks[i + 15], 14, -660478335)
    b = gg(b, c, d, a, blocks[i + 4], 20, -405537848)
    a = gg(a, b, c, d, blocks[i + 9], 5, 568446438)
    d = gg(d, a, b, c, blocks[i + 14], 9, -1019803690)
    c = gg(c, d, a, b, blocks[i + 3], 14, -187363961)
    b = gg(b, c, d, a, blocks[i + 8], 20, 1163531501)
    a = gg(a, b, c, d, blocks[i + 13], 5, -1444681467)
    d = gg(d, a, b, c, blocks[i + 2], 9, -51403784)
    c = gg(c, d, a, b, blocks[i + 7], 14, 1735328473)
    b = gg(b, c, d, a, blocks[i + 12], 20, -1926607734)
    a = hh(a, b, c, d, blocks[i + 5], 4, -378558)
    d = hh(d, a, b, c, blocks[i + 8], 11, -2022574463)
    c = hh(c, d, a, b, blocks[i + 11], 16, 1839030562)
    b = hh(b, c, d, a, blocks[i + 14], 23, -35309556)
    a = hh(a, b, c, d, blocks[i + 1], 4, -1530992060)
    d = hh(d, a, b, c, blocks[i + 4], 11, 1272893353)
    c = hh(c, d, a, b, blocks[i + 7], 16, -155497632)
    b = hh(b, c, d, a, blocks[i + 10], 23, -1094730640)
    a = hh(a, b, c, d, blocks[i + 13], 4, 681279174)
    d = hh(d, a, b, c, blocks[i], 11, -358537222)
    c = hh(c, d, a, b, blocks[i + 3], 16, -722521979)
    b = hh(b, c, d, a, blocks[i + 6], 23, 76029189)
    a = hh(a, b, c, d, blocks[i + 9], 4, -640364487)
    d = hh(d, a, b, c, blocks[i + 12], 11, -421815835)
    c = hh(c, d, a, b, blocks[i + 15], 16, 530742520)
    b = hh(b, c, d, a, blocks[i + 2], 23, -995338651)
    a = ii(a, b, c, d, blocks[i], 6, -198630844)
    d = ii(d, a, b, c, blocks[i + 7], 10, 1126891415)
    c = ii(c, d, a, b, blocks[i + 14], 15, -1416354905)
    b = ii(b, c, d, a, blocks[i + 5], 21, -57434055)
    a = ii(a, b, c, d, blocks[i + 12], 6, 1700485571)
    d = ii(d, a, b, c, blocks[i + 3], 10, -1894986606)
    c = ii(c, d, a, b, blocks[i + 10], 15, -1051523)
    b = ii(b, c, d, a, blocks[i + 1], 21, -2054922799)
    a = ii(a, b, c, d, blocks[i + 8], 6, 1873313359)
    d = ii(d, a, b, c, blocks[i + 15], 10, -30611744)
    c = ii(c, d, a, b, blocks[i + 6], 15, -1560198380)
    b = ii(b, c, d, a, blocks[i + 13], 21, 1309151649)
    a = ii(a, b, c, d, blocks[i + 4], 6, -145523070)
    d = ii(d, a, b, c, blocks[i + 11], 10, -1120210379)
    c = ii(c, d, a, b, blocks[i + 2], 15, 718787259)
    b = ii(b, c, d, a, blocks[i + 9], 21, -343485551)

    a = ad(a, lastA)
    b = ad(b, lastB)
    c = ad(c, lastC)
    d = ad(d, lastD)
  }

  return rh(a) + rh(b) + rh(c) + rh(d)
}
