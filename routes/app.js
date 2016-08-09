var User = require('../models/User');

var app = function* app() {
  var test = new User({
    username: 'Working',
    password: 'On The Site',
    email: 'helloh0ly@imsean.me'
  });
  this.body = yield test.save();
};

app.method = 'GET';
app.path = '/';

module.exports = app;
