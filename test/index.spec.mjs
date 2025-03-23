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
    describe('Argument is a string', () => {
      it('returns a string', () => {
        expect(hash('lorem ipsum dolor sit amet'))
          .to.equal('201730d4278e576b25515bd90c6072d3')
      })
    })

    describe('Argument is a number', () => {
      it('throws', () => {
        expect(() => hash(0))
          .to.throw('Argument is not a string')
      })
    })

    describe('Argument is a boolean', () => {
      it('throws', () => {
        expect(() => hash(false))
          .to.throw('Argument is not a string')
      })
    })

    describe('Argument is null', () => {
      it('throws', () => {
        expect(() => hash(null))
          .to.throw('Argument is not a string')
      })
    })

    describe('Argument is object', () => {
      it('throws', () => {
        expect(() => hash({}))
          .to.throw('Argument is not a string')
      })
    })

    describe('Argument is an array', () => {
      it('throws', () => {
        expect(() => hash([]))
          .to.throw('Argument is not a string')
      })
    })

    describe('Argument is undefined', () => {
      it('throws', () => {
        expect(() => hash(undefined))
          .to.throw('Argument is not a string')
      })
    })
  })
})
