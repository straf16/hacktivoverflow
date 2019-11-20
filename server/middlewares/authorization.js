const { Question } = require('../models')

module.exports = {
  questionAuthorization: (req, res, next) => {
    Question
      .findOne({
        _id: req.params.id
      })
      .then(result => {
        if (result) {
          if (result.owner == req.loggedUser._id) {
            next()
          } else {
            next({
              status: 403,
              message: 'not authorized'
            })
          }
        } else {
          next({
            status: 404,
            message: 'No Data'
          })
        }
      })
      .catch(next)
  }
}