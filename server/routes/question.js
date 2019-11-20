const router = require('express').Router()
const { question } = require('../controllers')
const authentication = require('../middlewares/authentication')
const { questionAuthorization } = require('../middlewares/authorization')

router.get('/', question.find)
router.get('/personal', authentication, question.findMyQuestion)
router.get('/:id', question.findQuestionId)
router.use(authentication)
router.post('/', question.create)
router.put('/update/:id', questionAuthorization, question.updateQuestion)
router.put('/upvote/:id', questionAuthorization, question.upVote)
router.put('/downvote/:id', questionAuthorization, question.downVote)
router.delete('/delete/:id', questionAuthorization, question.deleteQuestion)


module.exports = router