const Session = require('../models/session');
const yup = require('yup');

const schema = yup.object().shape({
  token: yup.string().required()
});

module.exports = function* auth(next) {
  const value = (function(request) {
    if (Object.keys(request.body).length === 0) {
      return request.query;
    }

    return request.body;
  })(this.request);

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
