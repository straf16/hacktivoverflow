const { Schema, model } = require('mongoose')
const { hashPassword } = require('../helpers/bcryptjs')

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please input your name']
  },
  watched_tags: [{
    type: String
  }],
  email: {
    type: String,
    unique: true,
    required: [true, 'Please input your email'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format']
  },
  password: {
    type: String,
    minlength: [8, 'min length at least 8 characters'],
    required: [true, 'Please input your password']
  }
}, {
  versionKey: false
})

userSchema.pre('save', function (next) {
  this.password = hashPassword(this.password)
  next()
})

const User = model('User', userSchema)

module.exports = User
