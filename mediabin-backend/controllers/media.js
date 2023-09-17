const mediaRouter = require('express').Router();
const Media = require('../models/mediabin');

const getValidTitle = title => {
  if (!title || title.trim().length === 0) {
    return 'Untitled';
  }
  return title;
};

mediaRouter.get('/', async (request, response) => {
  const allMedia = await Media.find({});
  const tenLatest = allMedia.filter(media => !media.hidden).reverse().slice(0, 10);
  response.json(tenLatest);
});

mediaRouter.post('/', async (req, res) => {
  const { content, type, title } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'content missing' });
  }

  let mediaData = {
    ...req.body,
    title: getValidTitle(title),
  };

  if (type === 'text') {
    mediaData.size = content.length;
  } else {
    mediaData.content = `https://mediabin-s3.s3.eu-north-1.amazonaws.com/${content}`;
  }

  const media = new Media(mediaData);
  const savedMedia = await media.save();
  res.status(201).json(savedMedia);
});

mediaRouter.get('/:id', async (req, res) => {
  const foundMedia = await Media.findById(req.params.id);

  if (!foundMedia) {
    return res.status(204).end();
  }

  if (foundMedia.burnAfterRead) {
    await Media.findByIdAndRemove(req.params.id);
  }

  res.json(foundMedia);
});

module.exports = mediaRouter;
