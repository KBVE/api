const joi = require('joi');
const User = require('../../models/user');
const Session = require('../../models/session');

const schema = joi.object().keys({
  username: joi.string().token().required()
});

const authSchema = joi.object().keys({
  'x-session-token': joi.string().required()
});

userGet.method = 'GET';
userGet.path = '/user/:username';
userGet.middleware = function* authorized(next) {
  const value = this.request.headers;
  this.filter = true;

  const valid = joi.validate(value, authSchema);
  if (valid.error) {
    this.filter = true;
    yield next;
    return;
  }

  const exists = yield Session.filter({token: value['x-session-token']});

  this.filter = exists.length < 1;
  yield next;
};

function* userGet() {
  const value = this.params;

  // Validate request items
  const valid = joi.validate(value, schema);
  if (valid.error) {
    this.status = 409;
    this.body = {ok: false, data: valid.error.details.map(err => err.message)};
    return;
  }

  // Fetch user info and send.
  try {
    const data = yield User.filter(function(row) {
      return row('username').match(`(?i)^${value.username}$`);
    });
    if (!data.length) {
      this.status = 404;
      this.body = {ok: false, data: 'User not found'};
      return;
    }

    const user = data[0];
    delete user.password;

    if (this.filter) {
      delete user.bitcoin_balance;
      delete user.ether_balance;
      delete user.email;
      delete user.kbve_mask_private;
      delete user.kbve_balance;
    }

    this.body = {ok: true, data: user};
  } catch (e) {
    this.status = 409;
    this.body = {ok: false, data: e.message};
    return;
  }
}

module.exports = userGet;
