const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Media = require('../models/mediabin')
const helper = require('./media_api_helper')

beforeEach(async () => {
  await Media.deleteMany({})

  for (let media of helper.initialMedia) {
    let noteObject = new Media(media)
    await noteObject.save()
  }
})

describe('when there are initially five media in the db', () => {
  test('all visible media are returned', async () => {
    const response = await api.get('/api/all-media')

    expect(response.body).toHaveLength(helper.initialMedia.length)
  })

  test('all media are returned as json', async () => {
    await api
      .get('/api/all-media')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all five uploaded media are returned', async () => {
    const response = await api.get('/api/all-media')

    expect(response.body).toHaveLength(5)
  })

  test('the first media is a text upload', async () => {
    const response = await api.get('/api/all-media')

    expect(response.body[4].type).toBe('text')
  })

  test('the first media content is correct', async () => {
    const response = await api.get('/api/all-media')

    expect(response.body[4].content).toBe('Sukulaku is best!')
  })

  test('a specific media is within the returned media', async () => {
    const response = await api.get('/api/all-media')

    const contents = response.body.map(response => response.content)
    expect(contents).toContain('VERY LONG TITLE')
  })
})

describe('uploading a new text media', () => {
  test('succeeds with status code 201 when media is valid', async () => {
    const newMedia = {
      'content': 'A nice new text upload',
      'type': 'text',
      'size': 25,
      'title': 'Text :)',
      'hidden': false,
      'burnAfterRead': false,
      'syntaxHighlight': 'null',
    }

    await api
      .post('/api/all-media')
      .send(newMedia)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/all-media')

    const contents = response.body.map(response => response.content)

    expect(response.body).toHaveLength(helper.initialMedia.length + 1)
    expect(contents).toContain(
      'A nice new text upload'
    )
  })

  test('fails with status code 400 when media has no content', async () => {
    const newMedia = {
      'type': 'text',
      'size': 25,
      'title': 'No content :O',
      'hidden': false,
      'burnAfterRead': false,
      'syntaxHighlight': 'null',
    }

    await api
      .post('/api/all-media')
      .send(newMedia)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/all-media')

    expect(response.body).toHaveLength(helper.initialMedia.length)
  })

  test('title is set as Untitled if no title is given', async () => {
    const newMedia = {
      'content': 'An untitled media upload',
      'type': 'text',
      'size': 25,
      'title': ' ',
      'hidden': false,
      'burnAfterRead': false,
      'syntaxHighlight': 'null',
    }

    await api
      .post('/api/all-media')
      .send(newMedia)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/all-media')

    const titles = response.body.map(response => response.title)

    expect(response.body).toHaveLength(helper.initialMedia.length + 1)
    expect(titles).toContain(
      'Untitled'
    )
  })
})

describe('uploading a new file/image media', () => {
  test('succeeds with status code 201 when media is valid', async () => {
    const newMedia = {
      'content': 'https://mediabin-s3.s3.amazonaws.com/08607e44-1ba1-32a6-d33f-b1718665cff6',
      'type': 'application/x-yaml',
      'fileName': 'rules.yaml',
      'size': 2142,
      'title': 'A fresh new file',
      'hidden': false,
      'burnAfterRead': false,
    }

    await api
      .post('/api/all-media')
      .send(newMedia)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/all-media')

    const contents = response.body.map(response => response.content)

    expect(response.body).toHaveLength(helper.initialMedia.length + 1)
    expect(contents).toContain(
      'https://mediabin-s3.s3.amazonaws.com/08607e44-1ba1-32a6-d33f-b1718665cff6'
    )
  })

  test('fails with status code 400 when media has no content', async () => {
    const newMedia = {
      'type': 'application/x-yaml',
      'fileName': 'rules.yaml',
      'size': 2142,
      'title': 'Why can\'t I upload this?',
      'hidden': false,
      'burnAfterRead': false,
    }

    await api
      .post('/api/all-media')
      .send(newMedia)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/all-media')

    expect(response.body).toHaveLength(helper.initialMedia.length)
  })

  test('fails with status code 400 when media size is too large', async () => {
    const newMedia = {
      'type': 'application/x-yaml',
      'fileName': 'rules.yaml',
      'size': 999999999,
      'title': 'Why can\'t I upload this?',
      'hidden': false,
      'burnAfterRead': false,
    }

    await api
      .post('/api/all-media')
      .send(newMedia)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/all-media')

    expect(response.body).toHaveLength(helper.initialMedia.length)
  })

  test('title is set as Untitled if no title is given', async () => {
    const newMedia = {
      'content': 'https://mediabin-s3.s3.amazonaws.com/08607e44-1ba1-32a6-d33f-b1718665cff6',
      'type': 'application/x-yaml',
      'fileName': 'rules.yaml',
      'size': 2142,
      'hidden': false,
      'burnAfterRead': false,
    }

    await api
      .post('/api/all-media')
      .send(newMedia)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/all-media')

    const titles = response.body.map(response => response.title)

    expect(response.body).toHaveLength(helper.initialMedia.length + 1)
    expect(titles).toContain(
      'Untitled'
    )
  })
})

describe('hidden media', () => {
  let savedMedia
  beforeEach(async () => {
    const hiddenMedia = new Media({
      'content': 'You can\'t see this in all media.',
      'type': 'text',
      'size': 25,
      'title': 'Hidden',
      'hidden': true,
      'burnAfterRead': false,
      'syntaxHighlight': 'null',
    })

    savedMedia = await hiddenMedia.save()
  })

  test('is not found in all media', async () => {
    const response = await api.get('/api/all-media')

    const contents = response.body.map(response => response.content)

    expect(response.body).toHaveLength(helper.initialMedia.length)
    expect(contents).not.toContain('You can\'t see this in all media.')
  })

  test('is found with id', async () => {
    const response = await api.get(`/api/all-media/${savedMedia.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toBeDefined()
    expect(response.body.content).toContain('You can\'t see this in all media.')
  })
})

describe('burn after read media', () => {
  let savedMedia
  beforeEach(async () => {
    const hiddenMedia = new Media({
      'content': 'You can see this only once.',
      'type': 'text',
      'size': 25,
      'title': 'Hidden',
      'hidden': true,
      'burnAfterRead': true,
      'syntaxHighlight': 'null',
    })

    savedMedia = await hiddenMedia.save()
  })

  test('is not found in all media', async () => {
    const response = await api.get('/api/all-media')

    const contents = response.body.map(response => response.content)

    expect(response.body).toHaveLength(helper.initialMedia.length)
    expect(contents).not.toContain('You can see this only once.')
  })

  test('is found only once with id', async () => {
    const response = await api.get(`/api/all-media/${savedMedia.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toBeDefined()
    expect(response.body.content).toContain('You can see this only once.')

    const secondResponse = await api.get(`/api/all-media/${savedMedia.id}`)
      .expect(204)

    expect(secondResponse.body).toStrictEqual({})
  })
})

afterAll(() => {
  mongoose.connection.close()
})
