var yup = require('yup');
var User = require('../../models/User');

var schema = yup.object().shape({
  username: yup.string().required()
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
      var data = yield User.filter({username: value.username});
      var user = data[0];
      delete user.password;

      this.body = user;
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
