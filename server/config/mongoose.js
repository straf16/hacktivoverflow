const mongoose = require('mongoose')

const mongoConfig = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}

mongoose
  .connect(process.env.MONGODB_URL, mongoConfig)
  .then(() => console.log('MONGODB CONNECT'))
  .catch(() => console.log('FAILED TO CONNECT MONGODB'))