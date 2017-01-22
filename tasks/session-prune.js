const Session = require('../app/models/session');
const log = require('../lib/log')('task', 'prune')

const TTL = 12; // in hours
const CYCLE_TIME = 43200000; // 12 hours

const prune = module.exports = function() {
  const expire = new Date();
  expire.setHours(expire.getHours() - TTL);
  return Session.findAll({
    where: {
      createdAt: {
        $lt: expire
      }
    }
  }).then(sessions => {
    const capture = [];
    for (const i = 0, max = sessions.length; i < max; i++) {
      capture.push(sessions[i].destroy());
    }
    return Promise.all(capture);
  }).then(deleted => {
    log.info(`Pruned ${deleted.length} sessions`)
  })
};

prune.run = function run() {
  setInterval(prune, CYCLE_TIME);
  prune();
}
