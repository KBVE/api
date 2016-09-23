const Client = require('./models/client');
const User = require('./models/user');
const Token = require('./models/token');

const store = {};

store.getAccessToken = function* getAccessToken(bearer) {
  console.log('access');
  const token = yield Token.filter(row => row('accessToken').eq(bearer));
  return token.length ? token[0] : false;
};

store.getRefreshToken = function* getRefreshToken(bearer) {
  console.log('refresh');
  const token = yield Token.filter(row => row('refreshToken').eq(bearer));
  return token.length ? token[0] : false;
};

store.getClient = function* getClient(id, secret) {
  console.log('client');
  const client = yield Client.filter(row => {
    return row('clientId').eq(id).and(row('clientSecret').eq(secret));
  });
  return client.length ? client[0] : false;
};

store.saveAccessToken = function* saveToken(_token, client, user) {
  console.log('save');
  const token = new Token({
    accessToken: _token.accessToken,
    accessTokenExpiresAt: _token.accessTokenExpiresOn,
    clientId: client.clientId,
    refreshToken: _token.refreshToken,
    refreshTokenExpiresAt: _token.refreshTokenExpiresOn,
    userId: user.id
  });
  return yield token.save();
};

store.getUser = function* getUser(username, password) {
  console.log('user');
  const user = User.filter(row =>
    row('username').eq(username).and(row('password').eq()));
  return user.length ? user[0] : false;
};

module.exports = store;
