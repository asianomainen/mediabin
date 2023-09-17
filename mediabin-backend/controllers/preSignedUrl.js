const router = require('express').Router();
const S3 = require('aws-sdk/clients/s3');
const crypto = require('crypto');

const s3 = new S3({
  apiVersion: '2008-10-17',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4',
});

router.get('/', async (req, res) => {
  const { type } = req.query;

  if (!type) {
    return res.status(400).json({ error: 'Type is required' });
  }

  const fileExtension = type.split('/')[1];
  const Key = `${crypto.randomUUID()}.${fileExtension}`;

  const fileParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key,
    Expires: 60,
    ContentType: type,
    ACL: 'public-read',
  };

  try {
    const url = await s3.getSignedUrlPromise('putObject', fileParams);
    res.status(200).json({ url, Key });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate signed URL' });
  }
});

module.exports = router;
