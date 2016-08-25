var Session = require('./models/session');

var TTL = 12; // in hours
var CYCLE_TIME = 43200000; // 12 hours

var prune = module.exports = function() {
  var expire = new Date();
  expire.setHours(expire.getHours() - TTL);
  return Session.filter(function(row) {
    return row('created').lt(expire);
  }).run().then(function(sessions) {
    var capture = [];
    for (var i = 0, max = sessions.length; i < max; i++) {
      capture.push(sessions[i].purge());
    }
    return Promise.all(capture);
  }).then(function(amount) {
    console.log('Pruned %s sessions', amount.length);
  });
};

prune.cycle = function() {
  setInterval(prune, CYCLE_TIME);
  prune();
};
