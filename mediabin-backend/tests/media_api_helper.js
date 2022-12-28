const Media = require('../models/mediabin')

const initialMedia = [
  {
    'content': 'Sukulaku is best!',
    'type': 'text',
    'size': 127,
    'title': 'IMPORTANT',
    'hidden': false,
    'burnAfterRead': false,
    'syntaxHighlight': 'null',
  },
  {
    'content': 'https://mediabin-s3.s3.amazonaws.com/08607e44-1ba1-32a6-d33f-b1718665cff6',
    'type': 'application/x-yaml',
    'fileName': 'rules.yaml',
    'size': 2142,
    'title': 'YAML file',
    'hidden': false,
    'burnAfterRead': false,
  },
  {
    'content': 'https://mediabin-s3.s3.amazonaws.com/6e5b9872-3c5f-c965-6717-020c221c29fc',
    'type': 'image/gif',
    'fileName': 'catto.gif',
    'size': 7275085,
    'title': 'Look at this funny cat',
    'hidden': false,
    'burnAfterRead': false
  },
  {
    'content': 'https://mediabin-s3.s3.amazonaws.com/c9c91033-d1df-f633-95b5-54e222bdebed',
    'type': 'video/mp4',
    'fileName': '439675d98e9529b5.mp4',
    'size': 3472887,
    'title': 'feels',
    'hidden': false,
    'burnAfterRead': false,
  },
  {
    'content': 'VERY LONG TITLE',
    'type': 'text',
    'size': 186,
    'title': 'LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG',
    'hidden': false,
    'burnAfterRead': false,
    'syntaxHighlight': 'null',
  }
]

const mediaInDb = async () => {
  const media = await Media.find({})
  return media.map(media => media.toJSON())
}

module.exports = {
  initialMedia, mediaInDb
}
