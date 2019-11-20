const { User } = require('../models')
const { comparePassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static register(req, res, next) {
    const { name, watched_tags, email, password } = req.body
    User
      .create({
        name,
        watched_tags,
        email,
        password
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
  static login(req, res, next) {
    const { email, password } = req.body
    User
      .findOne({
        email // cek email user login
      })
      .then(result => {
        if (result && comparePassword(password, result.password)) {
          const payload = {
            _id: result._id,
            name: result.name,
            watched_tags: result.watched_tags,
            email: result.email
          }
          const token = generateToken(payload)
          res.status(200).json({
            token,
            name: result.name,
            watched_tags: result.watched_tags,
            email: result.email
          })
        } else {
          next({
            status: 401,
            message: 'invalid email/password'
          })
        }
      })
      .catch(next)
  }
}

module.exports = UserController