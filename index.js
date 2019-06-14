const isObject = require('lodash.isobject')
const includes = require('lodash.includes')

function whatIsCircular (obj) {
  if (!isObject(obj)) {
    return
  }

  return _dfs(obj)
}

function _dfs (obj, parents = [], parentKeys = []) {
  // recurse depth-first until we hit something we've seen before
  for (const key in obj) {
    const val = obj[key]

    if (isObject(val)) {
      if (includes(parents, val)) {
        return parentKeys
      }

      const path = _dfs(val, parents.concat([val]), parentKeys.concat([key]))

      if (path) return path
    }
  }
}

module.exports = whatIsCircular
