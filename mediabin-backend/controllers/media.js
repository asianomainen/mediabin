const mediaRouter = require('express').Router()

mediaRouter.get('/', (request, response) => {
  response.send('Nothing yet')
})

module.exports = mediaRouter
