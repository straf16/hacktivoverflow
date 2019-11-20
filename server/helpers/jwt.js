const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

module.exports = {
  generateToken: function(payload) {
    return jwt.sign(payload, secret)
  },
  decodeToken: function(token) {
    return jwt.verify(token, secret)
  }
}
