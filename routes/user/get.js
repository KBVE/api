var yup = require('yup');
var User = require('../../models/user');
var Session = require('../../models/session');

var schema = yup.object().shape({
  username: yup.string().required()
});

var authSchema = yup.object().shape({
  'x-session-token': yup.string().required()
});

userGet.method = 'GET';
userGet.path = '/user/:username';
userGet.middleware = function* authorized(next) {
  var value = this.request.headers;
  this.filter = true;

  try {
    value = yield authSchema.validate(value);
  } catch (e) {
    this.filter = true;
    yield next;
  }

  var exists = yield Session.filter({token: value['x-session-token']});

  this.filter = exists.length < 1;
  yield next;
};

function* userGet() {
  var value = this.params;
  console.log(this.filter);

  // Validate request items
  try {
    yield schema.validate(value);
  } catch (e) {
    this.status = 409;
    this.body = {ok: false, data: e.message};
    return;
  }

  // Fetch user info and send.
  try {
    var data = yield User.filter(value);
    if (!data.length) {
      this.status = 404;
      this.body = {ok: false, data: 'User not found'};
      return;
    }

    var user = data[0];
    delete user.password;

    if (this.filter) {
      delete user.bitcoin_balance;
      delete user.ether_balance;
      delete user.emai;
      delete user.kbve_mask_private;
      delete user.kbve_balance;
    }

    this.body = user;
  } catch (e) {
    this.status = 409;
    this.body = {ok: false, data: e.message};
    return;
  }
}

module.exports = userGet;
