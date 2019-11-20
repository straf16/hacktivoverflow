const { Schema, model } = require('mongoose')

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please input title']
  },
  desc: {
    type: String,
    required: [true, 'Please input description']
  },
  tags: [{
    type: String
  }],
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }],
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

const Question = model('Question', questionSchema)

module.exports = Question
