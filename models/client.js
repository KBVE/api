const database = require('../database');
const type = database.type;

module.exports = database.createModel('client', {
  name: type.string().required(),
  website: type.string(),
  redirect_uri: type.string().required()
});
