const User = require('../../models/user');
const bcrypt = require('co-bcrypt');
const joi = require('joi');

const schema = joi.object().keys({
  username: joi.string().alphanum().required(),
  password: joi.string().required(),
  email: joi.string().email().required()
});

userPost.method = 'post';
userPost.path = '/user';

function* userPost() {
  const value = this.request.body;

  // Validate request body
  const valid = joi.validate(value, schema);
  if (valid.error) {
    this.status = 409;
    this.body = {ok: false, data: valid.error.details.map(err => err.message)};
    return;
  }

  console.log(value.username)

  // Check if user exists.
  const exists = yield User.findAll({
    where: {
      $or: [{ email: value.email }, { username: value.username }]
    }
  })
  console.log(exists)
  if (exists.length > 0) {
    this.status = 409;
    this.body = {ok: false, data: 'Username or email already in use'};
    return;
  }

  // Salt and hash password
  const salt = yield bcrypt.genSalt(10);
  const hash = yield bcrypt.hash(value.password, salt);

  // Try to save user.
  try {
    const created = yield User.create(Object.assign(value, { password: hash }))
    const user = created.toJSON()
    delete user.password;
    this.body = {ok: true, data: user};
  } catch (e) {
    this.status = 500;
    this.body = {ok: false, data: 'Internal Error'};
    return;
  }
}

module.exports = userPost;
