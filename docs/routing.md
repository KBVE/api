### Creating Routes
To begin creating a route, navigate to the routes directory (`app/routes`) and create your route file. Routes are simply generator functions.

Your route should look like this:

```js
module.exports = user // Export route

user.method = 'post' // Can be either GET, POST, DEL, PUT or ALL
user.path = '/user' // Path to route, can include route parameters
user.middlewares = [ // Optional, array of middleware
  function* middleware(next) {
    // Modify something
    yield next
  }
]

function* user() {
  // Extract body property from request
  const { body } = this.request

  // Create user from request body
  const user = yield User.create({ body })

  // Send response back, in this case we will return the created user
  this.body = { ok: true, data: user }
}
```

### Registering Routes
To register a route, navigate to `routes/index.js`. This file contains all of your routes. When registering a route, export an array or single instance of the route. For example:

```js
exports.user = require('./user')

// or if you have multiple endpoints for a route
exports.user = [
  require('./user/get'),
  require('./user/post'),
  require('./user/delete')
]
```
