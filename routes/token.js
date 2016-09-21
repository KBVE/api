token.method = 'all';
token.path = '/oauth/token';

function* token() {
  console.log(this.oauth);
  console.log(this.oauth.grant());
};

module.exports = token;
