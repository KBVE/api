var config = require('./config');
module.exports = require('thinky')(config.rethink);
