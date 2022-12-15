import axios from 'axios'

const baseUrl = '/api/all-media'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createMedia = async (newMedia) => {
  const response = await axios.post(baseUrl, newMedia)
  return response.data
}

const exportable = {
  getAll,
  createMedia
}

export default exportable
