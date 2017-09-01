const joi = require('joi');
const User = require('../../models/user');
const Session = require('../../models/session');
const bugsnag = require('../../../lib/bugsnag')

const schema = joi.object().keys({
  username: joi.string().token().required()
});

get.method = 'GET';
get.path = '/user/:username';
get.middlewares = [
  function* authorized(next) {
    const headers = this.request.headers;
    const value = Object.keys(headers).reduce((acc, curr) => {
      const key = curr.toLowerCase()
      const value = headers[curr]

      acc[key] = value

      return acc
    }, {})

    this.filter = true;

    if (!value.hasOwnProperty('x-session-token')) yield next;

    const exists = yield Session.findOne({ where: { token: value['x-session-token'] } });

    this.filter = !!exists;
    yield next;
  }
]

function* get () {
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
    const exclude = this.filter ? [
      'password',
      'bitcoin_balance',
      'email',
      'kbve_mask_private',
      'kbve_balance'
    ] : ['password']
    const data = yield User.findOne({
      where: { username: value.username },
      attributes: { exclude }
    })
    if (!data) {
      this.status = 404;
      this.body = {ok: false, data: ['User not found']};
      return;
    }

    const user = data;
    this.body = {ok: true, data: user};
  } catch (e) {
    bugsnag.notify(e)
    this.status = 409;
    this.body = {ok: false, data: e.message};
    return;
  }
}

module.exports = get;
