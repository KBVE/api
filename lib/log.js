const fargs = require('fast-args')

module.exports = function log() {
  const scope = fargs(arguments)
  return require('catlog')(`api:${scope.length ? scope.join(':') : 'main'} `)
}
