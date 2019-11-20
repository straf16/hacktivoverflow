if (process.env.NODE_ENV==='development') require('dotenv').config()

require('./config/mongoose')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())
app.use('/', routes)
app.use(errorHandler)

module.exports = app
