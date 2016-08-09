var yup = require('yup');
var User = require('../../models/User');
var bcrypt = require('co-bcrypt');

var schema = yup.object().shape({
  username: yup.string().require()
});

var profile = function* profile() {
  var body = this.request.body;
  var value;

  try {
    value = yield schema.validate(body);
  } catch (e) {
    this.status = 400;
    this.body = {
      ok: false,
      data: e.errors
    };
  }

  if (value) {
    try {
      var myResult;
      var data =  yield User.filter({username: value.username}).run()
      .then(function (result) {
        myResult = result;
        return myResult;
      });
      delete data.password;
      this.body = data;
    } catch (e) {
      this.status = 409;
      this.body = {
        ok: false,
        data: 'Username or email does not exist'
      };
      console.error(e);
    }
  }
};

profile.method = 'POST';
profile.path = '/user/profile';

module.exports = profile;
