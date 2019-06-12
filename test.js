var isCircular = require('.')

describe('what-is-circular', function () {
  it('should return undefined if passed a non-object', function (done) {
    expect(isCircular(2)).toEqual(undefined)
    done()
  })

  it('should return path for circular objects', function (done) {
    var x = {}
    x.cyclic = { a: 1, x: x }
    expect(isCircular(x)).toEqual(['cyclic', 'x'])

    done()
  })

  it('should return path for circular objects', function (done) {
    var x = {}
    x.cyclic = { a: {}, x: x }
    expect(isCircular(x)).toEqual(['cyclic', 'x'])

    done()
  })

  it('should return path for circular objects', function (done) {
    var x = {}
    x.cyclic = { a: {}, indirect: { x: x } }
    expect(isCircular(x)).toEqual(['cyclic', 'indirect', 'x'])

    done()
  })

  it('should return undefined for non-circular objects', function (done) {
    var x = {}
    x.cyclic = { a: 1, b: 2 }
    expect(isCircular(x)).toEqual(undefined)

    done()
  })

  it('should return undefined for non-circular objects', function (done) {
    var x = {}
    var y = {}
    x.cyclic = { a: y, b: y }
    expect(isCircular(x)).toEqual(undefined)

    done()
  })
})
