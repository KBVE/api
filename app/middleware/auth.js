const Session = require('../models/session');
const joi = require('joi');

module.exports = function auth(routeSchema = {}) {
  const schema = joi.object().keys(Object.assign({
    token: joi.string().required()
  }, routeSchema));

  return function* (next) {
    let value = Object.keys(this.request).length
      ? this.request.body
      : this.request.query

    try {
      yield schema.validate(value);
    } catch (e) {
      console.log(e)
      this.status = 403;
      this.body = {ok: false, data: ['Invalid token']};
      return;
    }

    const session = yield Session.findOne({
      where: {
        token: value.token
      }
    });

    if (!session) {
      this.status = 403;
      this.body = {ok: false, data: ['Invalid token']};
      return;
    }

    this.session = session

    yield next;
  }
};
