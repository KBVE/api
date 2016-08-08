var User = require('../models/User');

var app = function* app() {
  var test = new User({
    username: 'sean',
    password: 'prosperity1',
    email: 'hello@imsean.me'
  });
  this.body = yield test.save();
};

app.method = 'GET';
app.path = '/';

module.exports = app;
