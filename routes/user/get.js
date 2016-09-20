const yup = require('yup');
const User = require('../../models/user');
// const Session = require('../../models/session');

const schema = yup.object().shape({
  username: yup.string().required()
});

const authSchema = yup.object().shape({
  'x-session-token': yup.string().required()
});

userGet.method = 'GET';
userGet.path = '/user/:username';
// userGet.middleware = function* authorized(next) {
//   const value = this.request.headers;
//   this.filter = true;
//
//   try {
//     value = yield authSchema.validate(value);
//   } catch (e) {
//     this.filter = true;
//     yield next;
//   }
//
//   const exists = yield Session.filter({token: value['x-session-token']});
//
//   this.filter = exists.length < 1;
//   yield next;
// };

function* userGet() {
  const value = this.params;

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
