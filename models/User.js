const database = require('../database.js');
const type = database.type;

/* eslint-disable camelcase */
module.exports = database.createModel("users", {
  uuid: type.number(),
  username: type.string(),
  password: type.string(),
  email: type.string(),
  steamid: type.string(),
  googleid: type.string(),
  mcuuid: type.string(),
  twitterid: type.string(),
  ghid: type.string(),
  pgp_public_key: type.string(),
  kbve_mask_public: type.string(),
  kbve_mask_private: type.string(),
  bitcoin_address: type.string(),
  bitcoin_balance: type.number(),
  ether_address: type.string(),
  ether_balance: type.number(),
  kbve_address: type.string(),
  kbve_balance: type.number(),
  created: type.date().default(database.r.now())
});
