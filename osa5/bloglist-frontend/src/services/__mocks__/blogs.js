const blogs = [
  {
    title: 'testi1',
    author: 'jormaxxx',
    url: 'www.esko',
    likes: 8,
    user: {
      username: 'testaaja1',
      name: 'test',
      id: '5dbb26d2ef950742100f2509'
    },
    id: '5dbb42f88644de35d82913bb'
  },
  {
    title: 'testi457893',
    author: 'Toope',
    url: 'www.eskox',
    likes: 27,
    user: {
      username: 'testaaja2',
      name: 'test2',
      id: '5dbb54e9c5ad3119bcab0c25'
    },
    id: '5e10cd3e41dd9b2e4ce123de'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}


const setToken = () => {

}

export default { getAll, setToken }