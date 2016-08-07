const koa = require('koa');
const app = koa();
const router = require('koa-router')();
const config = require('./config');
const routes = require('./routes');
const rethink = require('rethinkdb');
const pool = require('koa-rethinkdb-pool');

for (const name in routes) {
  var route = routes[name];
  router[route.method.toLowerCase() || 'get'](route.path, route);
}

app.use(pool({
  r: rethink,
  connectOptions: config.rethink
}));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port, config.host, function listen() {
  console.log(`Listening on ${config.host}:${config.port}`);
});

module.exports = app;
