
const joi = require('joi');
const User = require('../models/user');
const Session = require('../models/session');
const bcrypt = require('co-bcrypt');
const crypto = require('crypto');

const schema = joi.object().keys({
  username: joi.string().alphanum().required(),
  password: joi.string().required()
});

session.method = 'post';
session.path = '/session';

function* session() {
  const value = this.request.body;

  const valid = joi.validate(value, schema);
  if (valid.error) {
    this.status = 409;
    this.body = {ok: false, data: valid.error.details.map(err => err.message)};
    return;
  }

  const exists = yield User.filter(function(row) {
    const username = value.username;
    return row('username').eq(username);
  });

  if (exists.length < 1) {
    this.status = 400;
    this.body = {ok: false, data: 'User does not exist'};
    return;
  }

  if (yield bcrypt.compare(value.password, exists[0].password)) {
    const token = crypto.randomBytes(16).toString('hex');

    const sess = new Session({
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
