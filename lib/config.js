const path = require('path')
const findRoot = require('find-root')
const config = require(path.join(findRoot(__dirname), 'config.json'))
module.exports = config
