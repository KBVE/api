const database = require('../database.js');
const type = database.type;

/* eslint-disable camelcase */
module.exports = database.createModel("users", {
  username: type.string(),
  password: type.string(),
  email: type.string(),
  steamid: type.string(),
  googleid: type.string(),
  mcuuid: type.string(),
  twitterid: type.string(),
  ghid: type.string(),
  bitcoin_address: type.string(),
  bitcoin_balance: type.number(),
  ether_address: type.string(),
  ether_balance: type.number(),
  kbve_address: type.string(),
  kbve_balance: type.number(),
  created: type.date().default(database.r.now())
});
