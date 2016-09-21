const User = require('../../models/user');
const bcrypt = require('co-bcrypt');

userPost.method = 'post';
userPost.path = '/user';

function* userPost() {
  const value = this.request.body;
  this.checkBody('username', 'Invalid username').isAlphanumeric();
  this.checkBody('email', 'Invalid email address').isEmail();

  // Validate input
  if (this.errors.length) {
    this.status = 400;
    this.body = {ok: false, data: this.errors};
    return;
  }

  // Check if user exists.
  const exists = yield User.filter(function(row) {
    const email = value.email;
    const username = value.username;
    return row('username').eq(username).or(row('email').eq(email));
  });
  if (exists.length > 0) {
    this.status = 409;
    this.body = {ok: false, data: 'Username or email already in use'};
    return;
  }

  // Salt and hash password
  const salt = yield bcrypt.genSalt(10);
  const hash = yield bcrypt.hash(value.password, salt);

  // Create user with default values.
  const user = new User(Object.assign(value, {
    password: hash,
    steamid: '',
    googleid: '',
    mcuuid: '',
    twitterid: '',
    ghid: '',
    kbve_mask_public: '',
    kbve_mask_private: '',
    bitcoin_address: '',
    bitcoin_balance: 0.00,
    ether_address: '',
    ether_balance: 0.00,
    kbve_address: '',
    kbve_balance: 0.00
  }));

  // Try to save user.
  try {
    const created = yield user.save();
    delete created.password;
    this.body = {ok: true, data: created};
  } catch (e) {
    this.status = 500;
    this.body = {ok: false, data: 'Internal Error'};
    return;
  }
}

module.exports = userPost;
