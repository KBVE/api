var database = require('../database');
var type = database.type;

module.exports = database.createModel("users", {
  username: type.string().required(),
  password: type.string().required(),
  email: type.string().required(),
  pgp_public: type.string(),
  kbve_private_key: type.string(),
  kbve_public_key: type.string(),
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
