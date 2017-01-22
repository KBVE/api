const koa = require('koa');
const app = koa();
const router = require('koa-router')();
const parser = require('koa-bodyparser')();
const logger = require('koa-logger')();
const config = require('./lib/config');
const routes = require('./app/routes');
const log = require('./lib/log')()
const tasks = require('./lib/tasks')

function* pass(next) {
  yield next;
}

for (const namespace in routes) {
  let names = routes[namespace]
  if (!Array.isArray(names)) names = [names]
  for (const route of names) {
    const middlewares = route.middlewares || [pass]
    const path = config.path + route.path
    router[route.method.toLowerCase() || 'get'](path, ...middlewares, route)
  }
}

app.use(logger);
app.use(parser);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port, config.host, function listen() {
  log.info(`Listening on ${config.host}:${config.port}`);
  tasks.run()
 });

module.exports = app;
