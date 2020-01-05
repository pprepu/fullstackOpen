import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const update = (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject)
  return req.then(res => res.data)
}

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const req = axios.delete(`${baseUrl}/${id}`, config)
  return req.then(res => res.data)
}

export default { getAll, create, update, setToken, deleteBlog }