module.exports = require('rc')('kbve', {
  host: '0.0.0.0',
  port: 3000,
  rethink: {
    host: 'localhost',
    port: 28015,
    db: 'kbve'
  }
});
