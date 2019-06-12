# what-is-circular [![Build Status](https://travis-ci.org/flotwig/what-is-circular.svg?branch=master)](https://travis-ci.org/flotwig/what-is-circular)

Like [`is-circular`](https://github.com/tjmehta/is-circular/), but returns the path to the first circular reference found.

# Installation

`npm install what-is-circular`

# Usage

## `whatIsCircular(obj)`

Returns an array that contains the path to the first circular reference found, or `undefined` if no circular reference is found.

# Example

```js
var whatIsCircular = require('what-is-circular')

var circularObj = {
  foo: 1,
  bar: 2
}
// qux.baz is the circular reference
circularObj.qux = {
  baz: circularObj
}

whatIsCircular(circularObj) // ['qux', 'baz']

var obj = {
  foo: 1,
  bar: 2,
  qux: 3
}

whatIsCircular(obj) // undefined
```

# License
MIT

# Thanks

Thanks to @tjmehta's [`is-circular`](https://github.com/tjmehta/is-circular/) for providing the tests and README for this project.
