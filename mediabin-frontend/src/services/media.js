import axios from 'axios'

const baseUrl = '/api/all-media'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const exportable = {
  getAll,
}

export default exportable
