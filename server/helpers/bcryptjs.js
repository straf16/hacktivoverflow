const bcrypt = require('bcryptjs')

module.exports = {
  hashPassword: function(pass) {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(10))
  },
  comparePassword: function(pass, hashPass) {
    return bcrypt.compareSync(pass, hashPass)
  }
}
