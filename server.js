const koa = require('koa');
const app = koa();
const router = require('koa-router')();
const parser = require('koa-bodyparser');
const config = require('./config');
const routes = require('./routes');

for (const name in routes) {
  var route = routes[name];
  router[route.method.toLowerCase() || 'get'](route.path, route);
}

app.use(parser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port, config.host, function listen() {
  console.log(`Listening on ${config.host}:${config.port}`);
});

module.exports = app;
