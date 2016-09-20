const Client = require('./models/client');
const User = require('./models/user');
const Token = require('./models/token');

const store = {};

store.getAccessToken = function* getAccessToken(bearer) {
  const token = yield Token.filter(row => row('accessToken').eq(bearer));
  return token.length ? token[0] : false;
};

store.getRefreshToken = function* getRefreshToken(bearer) {
  const token = yield Token.filter(row => row('refreshToken').eq(bearer));
  return token.length ? token[0] : false;
};

store.getClient = function* getClient(id, secret) {
  const client = yield Client.filter(row => {
    return row('clientId').eq(id).and(row('clientSecret').eq(secret));
  });
  return client.length ? client[0] : false;
};

store.saveToken = function* saveToken(_token, client, user) {
  const token = new Token({
    accessToken: _token.accessToken,
    accessTokenExpiresAt: _token.accessTokenExpiresAt,
    clientId: client.clientId,
    refreshToken: _token.refreshToken,
    refreshTokenExpiresAt: _token.refreshTokenExpiresAt,
    userId: user.id
  });
};

store.getUser = function* getUser(username, password) {
  const user = User.filter(row => row('username').eq(username).and(row('password').eq()))
  return user.length ? user[0] : false;
};

module.exports = store;
