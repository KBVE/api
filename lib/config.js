// module.exports = require('rc')('kbve', {
//   host: '0.0.0.0',
//   port: 3000,
//   path: '',
//   database: {
//     host: 'localhost',
//     database: 'kbve',
//     username: '',
//     password: ''
//   }
// });

const path = require('path')
const findRoot = require('find-root')
const config = require(path.join(findRoot(__dirname), 'config.json'))
module.exports = config
