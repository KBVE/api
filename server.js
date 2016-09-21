const koa = require('koa');
const app = koa();
const router = require('koa-router')();
const parser = require('koa-bodyparser')();
const validate = require('koa-validator');
const logger = require('koa-logger')();
const mount = require('koa-mount');
const oauth = require('koa-oauth-server');
const oauthStore = require('./oauth-store');
const config = require('./config');
const routes = require('./routes');
// const prune = require('./session-prune');

function* pass(next) {
  yield next;
}

for (const name in routes) {
  const route = routes[name];
  const middleware = route.middleware || pass;
  const path = config.path + route.path;
  router[route.method.toLowerCase() || 'get'](path, middleware, route);
}

const auth = oauth({
 model: oauthStore,
 grants: ['password'],
 debug: true
});

app.use(logger);
app.use(parser);
app.use(function* (next) {
  this.errors = [];
  this.oauth = auth;
  yield next;
});
app.use(validate({
  onValidationError: function(err) {
    this.errors.push(err);
  }
}));
app.use(mount('/oauth', router.middleware()));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port, config.host, function listen() {
  console.log(`Listening on ${config.host}:${config.port}`);
  // prune.cycle();
});

module.exports = app;
