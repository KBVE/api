const database = require('../database');
const type = database.type;

module.exports = database.createModel('token', {
  accessToken: type.string().required(),
  accessTokenExpiresAt: type.string().required(),
  clientId: type.string().required(),
  refreshToken: type.string().required(),
  refreshTokenExpiresAt: type.string().required(),
  userId: type.string().required()
});
