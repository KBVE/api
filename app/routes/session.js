
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

  const exists = yield User.findOne({ where: { username: value.username } })
  if (!exists) {
    this.status = 400;
    this.body = {ok: false, data: 'User does not exist'};
    return;
  }

  if (yield bcrypt.compare(value.password, exists.password)) {
    const token = crypto.randomBytes(16).toString('hex');

    try {
      const data = yield Session.create({
        user_id: exists.id,
        token
      });
      const session = data.toJSON()
      session.expires = new Date(new Date(session.createdAt).getTime() + 60 * 60 * 24 * 1000).getTime()

      delete session.id
      delete session.createdAt
      delete session.updatedAt

      session.username = exists.username

      this.body = {ok: true, data: session };
    } catch (e) {
      console.log(e)
      this.status = 500;
      this.body = {ok: false, data: 'Internal Error'};
    }

    return
  }

  this.status = 400;
  this.body = {ok: false, data: 'Incorrect username or password'};
}

module.exports = session;
