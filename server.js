const koa = require('koa');
const app = koa();
const router = require('koa-router')();
const parser = require('koa-bodyparser')();
const logger = require('koa-logger')();
const config = require('./config');
const routes = require('./routes');
const prune = require('./session-prune');

function* pass(next) {
  yield next;
}

for (const name in routes) {
  const route = routes[name];
  const middleware = route.middleware || pass;
  const path = config.path + route.path;
  router[route.method.toLowerCase() || 'get'](path, middleware, route);
}

app.use(logger);
app.use(parser);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port, config.host, function listen() {
  console.log(`Listening on ${config.host}:${config.port}`);
  prune.cycle();
});

module.exports = app;
