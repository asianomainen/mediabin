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

mediaRouter.get('/:id', async (request, response, next) => {
  try {
    const foundMedia = await Media.findById(request.params.id)

    if (foundMedia) {
      return response.json(foundMedia)
    } else {
      return response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = mediaRouter
