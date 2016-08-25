var yup = require('yup');
var User = require('../models/user');
var Session = require('../models/session');
var bcrypt = require('co-bcrypt');
var crypto = require('crypto');

var schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required()
});

session.method = 'post';
session.path = '/session';

function* session() {
  var value = this.request.body;

  try {
    value = yield schema.validate(value);
  } catch (e) {
    this.status = 400;
    this.body = {ok: false, data: e.errors};
    return;
  }

  var exists = yield User.filter(function(row) {
    var username = value.username;
    return row('username').eq(username);
  });

  if (exists.length < 1) {
    this.status = 400;
    this.body = {ok: false, data: 'User does not exist'};
    return;
  }

  if (yield bcrypt.compare(value.password, exists[0].password)) {
    var token = crypto.randomBytes(16).toString('hex');

    var sess = new Session({
      user_id: exists[0].id,
      token: token
    });

    try {
      yield sess.save();
      this.body = {ok: true, data: {token: token}};
    } catch (e) {
      this.status = 500;
      this.body = {ok: false, data: 'Internal Error'};
    }
    return;
  }

  this.status = 400;
  this.body = {ok: false, data: 'Incorrect username or password'};
}

module.exports = session;
