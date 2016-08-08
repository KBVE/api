var yup = require('yup');
var User = require('../../models/User');
var bcrypt = require('co-bcrypt');

var schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  email: yup.string().email().required(),
  pgp_public_key: yup.string()
});

var register = function* register() {
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
    var exists = yield User.filter(function(row) {
      var email = body.email;
      var username = body.username;
      return row('email').match(email) || row('username').match(username);
    });

    if (exists.length > 0) {
      this.status = 409;
      this.body = {
        ok: false,
        data: 'Username or email already in use'
      };
      return;
    }

    var salt = yield bcrypt.genSalt(10);
    var hash = yield bcrypt.hash(body.password, salt);

    var user = new User(Object.assign(value, {
      password: hash,
      steamid: '',
      googleid: '',
      mcuuid: '',
      twitterid: '',
      ghid: '',
      kbve_mask_public: '',
      kbve_mask_private: '',
      bitcoin_address: '',
      bitcoin_balance: 0.00,
      ether_address: '',
      ether_balance: 0.00,
      kbve_address: '',
      kbve_balance: 0.00
    }));

    try {
      var created = yield user.save();
      delete created.password;
      this.body = created;
    } catch (e) {
      this.status = 500;
      this.body = {
        ok: false,
        data: 'Internal Error'
      };
      console.error(e);
    }
  }
};

register.method = 'POST';
register.path = '/user/register';

module.exports = register;
