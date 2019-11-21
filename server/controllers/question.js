const { Question } = require('../models')

class QuestionController {
  static create(req, res, next) {
    const { title, desc, tags } = req.body
    Question
      .create({
        title,
        desc,
        tags,
        owner: req.loggedUser._id
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
  static find(req, res, next) {
    let search = {}
    if (req.query.keyword) {
      search.$or = []
      search.$or.push({ title: new RegExp(`${req.query.keyword}`, 'gi') })
      search.$or.push({ desc: new RegExp(`${req.query.keyword}`, 'gi') })
      search.$or.push({ tags: new RegExp(`${req.query.keyword}`, 'gi') })
    }
    Question
      .find(search)
      .populate('owner')
      .populate({
        path: 'answers',
        model: 'Answer',
        populate: {
          path: 'owner',
          model: 'User'
        }
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
  static findQuestionId(req, res, next) {
    Question
      .findOne({
        _id: req.params.id
      })
      .populate('owner')
      .populate({
        path: 'answers',
        model: 'Answer',
        populate: {
          path: 'owner',
          model: 'User'
        }
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static findMyQuestion(req, res, next) {
    Question
      .find({
        owner: req.loggedUser._id
      })
      .populate('owner')
      .populate({
        path: 'answers',
        model: 'Answer',
        populate: {
          path: 'owner',
          model: 'User'
        }
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static updateQuestion(req, res, next) {
    const { title, desc } = req.body
    Question
      .findByIdAndUpdate(req.params.id, {
        title,
        desc
      }, { new: true, runValidators: true })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
  static upVote(req, res, next) {
    Question
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
        return Question
          .findByIdAndUpdate(req.params.id, {
            upvotes: arrUpVotes,
            downvotes: arrDownVotes
          }, { new: true, runValidators: true })
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
  static downVote(req, res, next) {
    Question
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
        return Question
          .findByIdAndUpdate(req.params.id, {
            upvotes: arrUpVotes,
            downvotes: arrDownVotes
          }, { new: true, runValidators: true })
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
  static deleteQuestion(req, res, next) {
    Question
      .findByIdAndDelete(req.params.id)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = QuestionController
