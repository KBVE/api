const yup = require('yup');
const User = require('../models/User');
const bcrypt = require('co-bcrypt');

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  email: yup.string().required(),
  public_key: yup.string()
});

var register = function* register() {
  var body = this.request.body;

  try {
    var value = yield schema.validate(body);
  } catch (e) {
    this.status = 400;
    this.body = {
      ok: false,
      data: e.errors
    };
  }

  if (value) {

  }
};
