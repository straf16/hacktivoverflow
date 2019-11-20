const router = require('express').Router()
const { answer } = require('../controllers')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/:questionId', answer.create)
router.get('/personal', answer.findMyAnswers)
router.get('/:id', answer.findAnswerId)

// update
router.put('/update/:id', answer.updateAnswer)
router.put('/upvote/:id', answer.upVote)
router.put('/downvote/:id', answer.downVote)

module.exports = router