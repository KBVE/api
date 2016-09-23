const database = require('../database');
const type = database.type;

module.exports = database.createModel('token', {
  accessToken: type.string().required(),
  accessTokenExpiresAt: type.date().required(),
  clientId: type.string().required(),
  refreshToken: type.string().required(),
  refreshTokenExpiresAt: type.date().required(),
  userId: type.string().required()
});
