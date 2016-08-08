var koa = require('koa');
var app = koa();
var router = require('koa-router')();
var parser = require('koa-bodyparser')();
var logger = require('koa-logger')();
var config = require('./config');
var routes = require('./routes');

for (var name in routes) {
  var route = routes[name];
  console.log(route);
  router[route.method.toLowerCase() || 'get'](route.path, route);
}

app.use(logger);
app.use(parser);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port, config.host, function listen() {
  console.log(`Listening on ${config.host}:${config.port}`);
});

module.exports = app;
