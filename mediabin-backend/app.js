require('dotenv').config();
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const mediaRouter = require('./controllers/media');
const preSignedUrlRouter = require('./controllers/preSignedUrl');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose').default;
const path = require('path');

logger.info('connecting to MongoDB');

try {
  if (process.env.NODE_ENV === 'production') {
    void mongoose.connect(process.env.MONGODB_URI);
  } else if (process.env.NODE_ENV === 'development') {
    void mongoose.connect(process.env.DEV_MONGODB_URI);
  }

  logger.info('connected to MongoDB');
} catch (error) {
  logger.error('error connecting to MongoDB:', error.message);
}

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use('/api/all-media', mediaRouter);
app.use('/api/preSignedUrl', preSignedUrlRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

module.exports = app;
