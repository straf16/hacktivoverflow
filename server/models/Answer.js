const { Schema, model } = require('mongoose')

const answerSchema = new Schema({
  desc: {
    type: String,
    required: [true, 'Please input description']
  },
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

const Answer = model('Answer', answerSchema)

module.exports = Answer
