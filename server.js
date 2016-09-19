var koa = require('koa');
var app = koa();
var router = require('koa-router')();
var parser = require('koa-bodyparser')();
var validate = require('koa-validate')(app);
var logger = require('koa-logger')();
var config = require('./config');
var routes = require('./routes');
// var prune = require('./session-prune');

function* pass(next) {
  yield next;
}

for (var name in routes) {
  var route = routes[name];
  var middleware = route.middleware || pass;
  var path = config.path + route.path;
  router[route.method.toLowerCase() || 'get'](path, middleware, route);
}

app.use(logger);
app.use(parser);
app.use(function* (next) {
  console.log(this.errors);
  yield next;
});
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port, config.host, function listen() {
  console.log(`Listening on ${config.host}:${config.port}`);
  // prune.cycle();
});

module.exports = app;
