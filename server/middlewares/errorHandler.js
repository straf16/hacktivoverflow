module.exports = (err, req, res, next) => {
  // console.log(err)

  let status = err.status || 500
  let message = [err.message] || ['Internal Server Error']
  switch (err.name) {
    case 'ValidationError':
      message = []
      for (const key in err.errors) {
        message.push(err.errors[key].message)
      }
      res.status(400).json({ message })
      break
    case 'MongoError':
      if (err.code == 11000) {
        message = ['Data already exist']
        res.status(400).json({ message })
      } else {
        res.status(status).json({ message })
      }
      break
    case 'JsonWebTokenError':
      message = []
      if (err.message === 'invalid signature') {
        message.push('invalid token')
      } else if (err.message === 'jwt must be provided') {
        message.push('please login again')
      } else {
        message.push(err.message)
      }
      res.status(400).json({ message })
      break
    default:
      res.status(status).json({ message })
      break
  }
}
