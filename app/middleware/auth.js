const Session = require('../models/session');
const joi = require('joi');

const schema = joi.object().keys({
  token: joi.string().required()
});

module.exports = function* auth(next) {
  const value = Object.keys(this.request).length
    ? this.request.body
    : this.request.query

  try {
    value = yield schema.validate(value);
  } catch (e) {
    this.status = 403;
    this.body = {ok: false, data: 'Invalid token'};
    return;
  }

  const exists = yield Session.filter({token: value.token});

  if (exists.length < 1) {
    this.status = 403;
    this.body = {ok: false, data: 'Invalid token'};
    return;
  }

  yield next;
};
