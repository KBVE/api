token.method = 'all';
token.path = '/token';

function* token() {
  this.oauth.grant();
};

module.exports = token;
