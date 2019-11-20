const { Answer, Question } = require('../models')

class AnswerController {
  static create(req, res, next) {
    const { desc } = req.body
    Answer
      .create({
        desc,
        owner: req.loggedUser._id
      })
      .then(async result => {
        await Question.findByIdAndUpdate(req.params.questionId, {$push: {answers: result._id}})
        res.status(201).json(result)
      })
      .catch(next)
  }
  static findMyAnswers(req, res, next) {
    Answer
      .find({
        owner: req.loggedUser._id
      })
      .then(result => {
        if (result) {
          res.status(200).json(result)
        } else {
          next({
            status: 404,
            message: 'No Data'
          })
        }
      })
      .catch(next)
  }
  static findAnswerId(req, res, next) {
    Answer
      .findById(req.params.id)
      .then(result => {
        if (result) {
          res.status(200).json(result)
        } else {
          next({
            status: 404,
            message: 'No Data'
          })
        }
      })
      .catch(next)
  }
  static updateAnswer(req, res, next) {
    const { desc } = req.body
    Answer
      .findByIdAndUpdate(req.params.id, { desc }, { new: true })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
  static upVote(req, res, next) {
    Answer
      .findOne({
        _id: req.params.id
      })
      .then(result => {
        let arrUpVotes = result.upvotes
        let arrDownVotes = result.downvotes
        if (arrUpVotes.indexOf(req.loggedUser._id) === -1) {
          arrUpVotes.push(req.loggedUser._id)
          if (arrDownVotes.indexOf(req.loggedUser._id) !== -1) {
            arrDownVotes.splice(arrDownVotes.indexOf(req.loggedUser._id), 1)
          }
        } else {
          arrUpVotes.splice(arrUpVotes.indexOf(req.loggedUser._id), 1)
        }
        return Answer
          .findByIdAndUpdate(req.params.id, {
            upvotes: arrUpVotes,
            downvotes: arrDownVotes
          }, { new: true })
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
  static downVote(req, res, next) {
    Answer
      .findOne({
        _id: req.params.id
      })
      .then(result => {
        let arrUpVotes = result.upvotes
        let arrDownVotes = result.downvotes
        if (arrDownVotes.indexOf(req.loggedUser._id) === -1) {
          arrDownVotes.push(req.loggedUser._id)
          if (arrUpVotes.indexOf(req.loggedUser._id) !== -1) {
            arrUpVotes.splice(arrUpVotes.indexOf(req.loggedUser._id), 1)
          }
        } else {
          arrDownVotes.splice(arrDownVotes.indexOf(req.loggedUser._id), 1)
        }
        return Answer
          .findByIdAndUpdate(req.params.id, {
            upvotes: arrUpVotes,
            downvotes: arrDownVotes
          }, { new: true })
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
}

module.exports = AnswerController
