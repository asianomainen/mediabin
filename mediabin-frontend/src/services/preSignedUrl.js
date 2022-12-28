import axios from 'axios'

const baseUrl = '/api/preSignedUrl'

const getPreSignedUrl = async (type) => {
  const response = await axios.get(baseUrl, {
    params: {
      type: type
    }
  })

  return response.data
}

const uploadMedia = async (url, file) => {
  const response = await axios.put(url, file, {
    headers: {
      'Content-Type': file.type
    }
  })

  return response.data
}

export default { getPreSignedUrl, uploadMedia }
