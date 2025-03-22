import {
  expect
} from 'chai'

import hash from '#md5'

describe('`@sequencemedia/md5`', () => {
  describe('`hash`', () => {
    it('is a function', () => {
      expect(hash)
        .to.be.a('function')
    })
  })

  describe('`hash()', () => {
    it('returns a string', () => {
      expect(hash('lorem ipsum dolor sit amet'))
        .to.equal('201730d4278e576b25515bd90c6072d3')
    })
  })
})
