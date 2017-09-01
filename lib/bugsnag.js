const bugsnag = require('bugsnag')
const config = require('./config')

bugsnag.register(config.bugsnag)

module.exports = bugsnag
