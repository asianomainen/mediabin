require('dotenv').config()
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mediaRouter = require('./controllers/media')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const path = require('path')

logger.info('connecting to MongoDB')

try {
  if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(process.env.MONGODB_URI)
  }

  logger.info('connected to MongoDB')
} catch (error) {
  logger.error('error connecting to MongoDB:', error.message)
}

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/all-media', mediaRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

module.exports = app
