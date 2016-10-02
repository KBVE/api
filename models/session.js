const database = require('../database');
const type = database.type;

module.exports = database.createModel('sessions', {
  user_id: type.string().required(),
  token: type.string().required(),
  created: type.date().default(database.r.now())
});
