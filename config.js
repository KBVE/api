module.exports = require('rc')('kbve', {
  host: 'localhost',
  port: 3000,
  rethink: {
    host: 'localhost',
    port: 28015,
    db: 'kbve'
  }
});
