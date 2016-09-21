const Client = require('../models/client');
const generate = require('randomstring').generate;

register.method = 'post';
register.path = '/register';

function* register() {
  this.checkBody('name', 'Invalid application name').isAlphanumeric();
  this.checkBody('website', 'Invalid website url').isURL();
  this.checkBody('redirect_uri', 'Invalid redirect uri').isURL({
    protocols: ['https']
  });

  if (this.errors.length) {
    this.body = {
      ok: false,
      data: this.errors
    };
    return;
  }

  const client = new Client(Object.assign(this.request.body, {
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
    this.body = {ok: true, data: created}
  } catch (e) {
    this.status = 500;
    this.body = {ok: false, data: 'Internal Error'}
  }
};

module.exports = register;
