const Session = require('./models/session');

const TTL = 12; // in hours
const CYCLE_TIME = 43200000; // 12 hours

const prune = module.exports = function() {
  const expire = new Date();
  expire.setHours(expire.getHours() - TTL);
  return Session.filter(function(row) {
    return row('created').lt(expire);
  }).run().then(function(sessions) {
    const capture = [];
    for (const i = 0, max = sessions.length; i < max; i++) {
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
