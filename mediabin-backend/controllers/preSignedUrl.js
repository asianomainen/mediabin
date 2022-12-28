const router = require('express').Router()
const S3 = require('aws-sdk/clients/s3')
const crypto = require('crypto')

const s3 = new S3({
  apiVersion: '2008-10-17',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4',
})

router.get('/', async (request, response) => {
  const { type } = request.query
  const Key = `${crypto.randomUUID()}.${type.split('/')[1]}`

  const fileParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key,
    Expires: 60,
    ContentType: type,
    ACL: 'public-read'
  }

  const url = await s3.getSignedUrlPromise('putObject', fileParams)

  response.status(200).json({ url, Key })
})

module.exports = router
