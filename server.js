const koa = require('koa');
const app = koa();
const router = require('koa-router')();
const parser = require('koa-bodyparser')();
const logger = require('koa-logger')();
const config = require('./lib/config');
const routes = require('./app/routes');
const log = require('./lib/log')()
const tasks = require('./lib/tasks')
const throttler = require('request-throttler')
const bugsnag = require('./lib/bugsnag')


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
app.use(throttler.koa({
  port: config.redis.port,
  host: config.redis.host,
  requestsPerSecond: 10,
  timeToLive: 60,
  throttler: function* () {
    this.status = 503
    this.body = {
      ok: false,
      data: 'You have been rate limited.'
    }
  },
  error: function* (err) {
    console.log(err)

    bugsnag.notify(err, {
      subsystem: {
        name: 'throttler'
      }
    })

    this.status = 500
    this.body = {
      ok: false,
      data: 'Internal Error'
    }
  }
}))

app.on('error', bugsnag.koaHandler)

app.listen(config.port, config.host, function listen() {
  log.info(`Listening on ${config.host}:${config.port}`);
  tasks.run()
 });

 process.on('unhandledRejection', err => {
   console.log(err)
   bugsnag.notify(err)
 })

module.exports = app;
