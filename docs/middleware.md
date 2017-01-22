## Writing Middleware
Middleware functions are just like regular routes, however they are usually used to modify the request or response of a route. They are usually used in situations where you need to authenticate a user or transform request data.

A middleware function takes a `next` parameter that you will yield after you have modified or added what you have needed to.

For example:
```js
function* middleware(next) {
  // Capture username from request body and make a database call
  this.user = yield User.findOne({
    where: {
      username: this.request.body.username
    }
  })
  yield next
}
```

This middleware function will automatically attach a `user` object that can be accessed in another middleware function or the route itself. It simply captures the username sent in the request body and makes a database call.

## Applying middleware
Middleware can be applied globally or per-route. When globally applying middleware, navigate to `server.js` and use `router.use`. `router.use` takes a middleware parameter. If you want to apply middleware per-route, simply attach a `middlewares` property to your route, the value should be an array.


### Globally apply middleware
```js
// in server.js
router.use(middleware)
```

### Per-route application
```js
// route-file.js

user.middlewares = [
  function* auth(next) {
    // authenticate user
    yield next
  }
]

// ... function* user() {} ...
```
