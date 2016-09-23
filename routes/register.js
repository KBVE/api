const Client = require('../models/client');
const generate = require('randomstring').generate;
const joi = require('joi');

const schema = joi.object().keys({
  name: joi.string().alphanum().required(),
  website: joi.string().uri({scheme: ['https']}).required(),
  redirectUri: joi.array().required()
});

register.method = 'post';
register.path = '/register';

function* register() {
  const body = this.request.body;

  console.log(body);

  // Validate request body
  const valid = joi.validate(body, schema);
  if (valid.error) {
    this.status = 409;
    this.body = {ok: false, data: valid.error.details.map(err => err.message)};
    return;
  }

  const client = new Client(Object.assign(body, {
    clientId: generate({
      length: 8,
      charset: 'numeric'
    }),
    clientSecret: generate({
      length: 32,
      charset: 'hex'
    })
  }));

  try {
    const created = yield client.save();
    this.body = {ok: true, data: created};
  } catch (e) {
    this.status = 500;
    this.body = {ok: false, data: 'Internal Error'};
  }
}

module.exports = register;
