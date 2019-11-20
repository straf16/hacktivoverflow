const router = require('express').Router()
const userRoute = require('./user')
const questionRoute = require('./question')
const answerRoute = require('./answer')

// router test
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hacktiv Overflow!' })
})

router.use('/', userRoute)
router.use('/questions', questionRoute)
router.use('/answers', answerRoute)

module.exports = router
