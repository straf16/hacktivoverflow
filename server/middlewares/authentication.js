const { decodeToken } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = (req, res, next) => {
  try {
    let decoded = decodeToken(req.headers.token) // token dari headers
    req.loggedUser = decoded
    User.findOne({
      _id: req.loggedUser._id
    })
      .then(result => {
        if (!result) {
          next({
            status: 403,
            message: 'Unauthorized'
          })
        } else {
          next()
        }
      })
  }
  catch(err) {
    next(err)
  }
}