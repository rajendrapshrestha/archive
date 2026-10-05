import axios from 'axios'
const baseUrl = '/api/users'

const users = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const user = async (username) => {
    const response = await axios.get(`${baseUrl}/${username}`)
    return response.data
  }

export default { user, users }