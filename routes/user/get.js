var yup = require('yup');
var User = require('../../models/user');
var auth = require('../../middleware/auth');

var schema = yup.object().shape({
  username: yup.string().required()
});

userGet.method = 'GET';
userGet.path = '/user/:username';
userGet.middleware = auth;

function* userGet() {
  var value = this.params;

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
    this.body = user;
  } catch (e) {
    this.status = 409;
    this.body = {ok: false, data: e.message};
    return;
  }
}

module.exports = userGet;
