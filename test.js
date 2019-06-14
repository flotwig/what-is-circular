var whatIsCircular = require('.')

describe('what-is-circular', function () {
  it('should return undefined if passed a non-object', function () {
    expect(whatIsCircular(2)).toEqual(undefined)
  })

  it('should return path for circular objects', function () {
    var x = {}
    x.cyclic = { a: 1, x: x }
    expect(whatIsCircular(x)).toEqual(['cyclic', 'x'])
  })

  it('should return path for circular objects', function () {
    var x = {}
    x.cyclic = { a: {}, x: x }
    expect(whatIsCircular(x)).toEqual(['cyclic', 'x'])

  })

  it('should return path for circular objects', function () {
    var x = {}
    x.cyclic = { a: {}, indirect: { x: x } }
    expect(whatIsCircular(x)).toEqual(['cyclic', 'indirect', 'x'])
  })

  it('should return path for circular objects', function () {
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
  })

  it('should return path for circular objects', function () {
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
  })

  it('should return path for circular objects in arrays', function () {
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
  })

  it('should return undefined for non-circular objects', function () {
    var x = {}
    x.cyclic = { a: 1, b: 2 }
    expect(whatIsCircular(x)).toEqual(undefined)
  })

  it('should return undefined for non-circular objects', function () {
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
  })

  it('should return undefined for non-circular objects', function () {
    var x = {}
    var y = {}
    x.cyclic = { a: y, b: y }
    expect(whatIsCircular(x)).toEqual(undefined)
  })

  it('detects circular objects and returns path', function() {
    var obj1 = {}
    obj1.x = obj1
    expect(whatIsCircular(obj1)).toEqual(['x'])

    var obj2 = {}
    obj2.x = {y: obj2}
    expect(whatIsCircular(obj2)).toEqual(['x', 'y'])
  })

  it('detects circular arrays and returns path', function() {
    var obj1 = []
    obj1.push(obj1)
    expect(whatIsCircular(obj1)).toEqual(['0'])
  })

  it('detects non-circular objects and returns undefined', function() {
    var obj1 = {}
    obj1.x = {y: 4}
    expect(whatIsCircular(obj1)).toBeUndefined()

    expect(whatIsCircular({})).toBeUndefined()
  })

  it('detects non-circular arrays and returns undefined', function() {
    var obj1 = []
    obj1.push([])
    expect(whatIsCircular(obj1)).toBeUndefined()
  })

  it('returns undefined for non-objects', function() {
    expect(whatIsCircular(undefined)).toBeUndefined()
    expect(whatIsCircular(null)).toBeUndefined()
    expect(whatIsCircular('hi')).toBeUndefined()
    expect(whatIsCircular(false)).toBeUndefined()
    expect(whatIsCircular(/a/)).toBeUndefined()
  })

  it('returns undefined for non-circular functions', function() {
    expect(whatIsCircular(function() {})).toBeUndefined()
  })

  it('returns path for circular functions', function() {
    let f = function() {}
    f.x = {
      y: {
        f
      }
    }
    expect(whatIsCircular(f)).toEqual(['x', 'y', 'f'])
  })
})
