const User = require('../../models/user')
const bcrypt = require('co-bcrypt')
const joi = require('joi')
const auth = require('../../middleware/auth')
const Session = require('../../models/session')
const bugsnag = require('../../../lib/bugsnag')

const routeSchema = {
  currentPassword: joi.string().required(),
  newPassword: joi.string().required(),
  newPasswordConfirmation: joi.string().required(),
  token: joi.string().required()
}
const schema = joi.object().keys(routeSchema)

changePassword.middlewares = [auth(routeSchema)]
changePassword.method = 'POST'
changePassword.path = '/user/change-password'

function* changePassword () {
  const value = this.request.body

  const valid = joi.validate(value, schema)
  if (valid.error) {
    this.status = 400
    this.body = {ok: false, data: valid.error.details.map(err => err.message)}

    return
  }

  const oldSession = this.session

  if (value.newPassword !== value.newPasswordConfirmation) {
    this.status = 400
    this.body = {
      ok: false,
      data: ['passwords do not match']
    }

    return
  }

  const user = yield User.findOne({ where: { id: oldSession.user_id } })
  if (!user) {
    this.status = 400
    this.body = {ok: false, data: ['User not found']}

    return
  }

  if (yield bcrypt.compare(value.currentPassword, user.password)) {
    const salt = yield bcrypt.genSalt(10)
    const hash = yield bcrypt.hash(value.newPassword, salt)

    console.log(salt, hash)

    try {
      yield Session.destroy({
        where: {
          user_id: user.id
        }
      })

      user.password = hash
      yield user.save()

      this.body = {ok: true, data: 'password changed'}
    } catch (e) {
      bugsnag.notify(e)
      this.status = 500
      this.body = {ok: false, data: ['Internal Error']}
    }
  }
}

module.exports = changePassword
