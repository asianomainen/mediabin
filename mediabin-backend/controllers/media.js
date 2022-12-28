const mediaRouter = require('express').Router()
const Media = require('../models/mediabin')

mediaRouter.get('/', async (request, response) => {
  const allMedia = await Media.find({})
  const tenLatest = allMedia.filter(media => media.hidden === false).reverse().slice(0, 10)
  response.json(tenLatest)
})

mediaRouter.post('/', async (request, response) => {
  if (request.body.content === undefined) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  let media
  if (request.body.type === 'text') {
    media = new Media({
      ...request.body,
      size: request.body.content.length,
      title: request.body.title === undefined
        ? 'Untitled'
        : request.body.title.trim().length === 0
          ? 'Untitled'
          : request.body.title
    })
  } else {
    media = new Media({
      ...request.body,
      content: `https://mediabin-s3.s3.eu-north-1.amazonaws.com/${request.body.content}`,
      title: request.body.title === undefined
        ? 'Untitled'
        : request.body.title.trim().length === 0
          ? 'Untitled'
          : request.body.title
    })
  }

  const savedMedia = await media.save()
  response.status(201).json(savedMedia)
})

mediaRouter.get('/:id', async (request, response) => {
  const foundMedia = await Media.findById(request.params.id)

  if (foundMedia) {
    if (foundMedia.burnAfterRead) {
      await Media.findByIdAndRemove(request.params.id)
    }

    return response.json(foundMedia)
  } else {
    return response.status(204).end()
  }
})

module.exports = mediaRouter
