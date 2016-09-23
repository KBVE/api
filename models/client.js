const database = require('../database');
const type = database.type;

module.exports = database.createModel('client', {
  name: type.string().required(),
  website: type.string(),
  redirectUri: type.array().required(),
  clientId: type.string().required(),
  clientSecret: type.string().required()
});
