const mediaRouter = require('express').Router()
const Media = require('../models/mediabin')

mediaRouter.get('/', async (request, response) => {
  const allMedia = await Media.find({})
  response.json(allMedia)
})

mediaRouter.post('/', async (request, response) => {
  const media = new Media({
    ...request.body
  })

  const savedMedia = await media.save()
  response.status(201).json(savedMedia)
})

module.exports = mediaRouter
