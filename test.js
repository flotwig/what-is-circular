var whatIsCircular = require('.')

describe('what-is-circular', function () {
  it('should return undefined if passed a non-object', function (done) {
    expect(whatIsCircular(2)).toEqual(undefined)
    done()
  })

  it('should return path for circular objects', function (done) {
    var x = {}
    x.cyclic = { a: 1, x: x }
    expect(whatIsCircular(x)).toEqual(['cyclic', 'x'])

    done()
  })

  it('should return path for circular objects', function (done) {
    var x = {}
    x.cyclic = { a: {}, x: x }
    expect(whatIsCircular(x)).toEqual(['cyclic', 'x'])

    done()
  })

  it('should return path for circular objects', function (done) {
    var x = {}
    x.cyclic = { a: {}, indirect: { x: x } }
    expect(whatIsCircular(x)).toEqual(['cyclic', 'indirect', 'x'])

    done()
  })

  it('should return path for circular objects', function (done) {
    a = {
      a: false,
      b: {
        a: false,
        c: {
          a: false,
          d: {
            e: {
              a: false
            }
          }
        }
      }
    }

    a.b.c.d.e = a

    expect(whatIsCircular(a)).toEqual(['b', 'c', 'd', 'e'])
    done()
  })

  it('should return path for circular objects', function (done) {
    var x = {
      a: [
        {
          a: 'b',
          b: 'c'
        },
        {
          a: 'b',
          b: 'c'
        }
      ],
      b: [
        'a',
        'b'
      ]
    }

    x.c = {
      x
    }

    expect(whatIsCircular(x)).toEqual(['c', 'x'])

    done()
  })

  it('should return path for circular objects in arrays', function (done) {
    var x = {
      a: [
        {
          a: 'b',
          b: 'c'
        },
        {
          a: 'b',
          b: 'c'
        }
      ],
      b: [
        'a',
        'b'
      ]
    }

    x.a[2] = x

    expect(whatIsCircular(x)).toEqual(['a', '2'])

    done()
  })

  it('should return undefined for non-circular objects', function (done) {
    var x = {}
    x.cyclic = { a: 1, b: 2 }
    expect(whatIsCircular(x)).toEqual(undefined)

    done()
  })

  it('should return undefined for non-circular objects', function (done) {
    var x = {
      a: [
        {
          a: 'b',
          b: 'c'
        },
        {
          a: 'b',
          b: 'c'
        }
      ],
      b: [
        'a',
        'b'
      ]
    }
    expect(whatIsCircular(x)).toEqual(undefined)

    done()
  })

  it('should return undefined for non-circular objects', function (done) {
    var x = {}
    var y = {}
    x.cyclic = { a: y, b: y }
    expect(whatIsCircular(x)).toEqual(undefined)

    done()
  })
})
