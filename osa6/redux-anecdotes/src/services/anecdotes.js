import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (content) => {
  const anecdote = asObject(content)
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const update = async (id, newAnecdote) => {
  const req = axios.put(`${baseUrl}/${id}`, newAnecdote)
  return req.then(res => res.data)
}

export default { getAll, createAnecdote, update }