import React, { useState } from 'react'

const Books = (props) => {
  const [filter, setFilter] = useState('')
  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  const books = props.result.data.allBooks

  const allGenres = books
    .map(book => book.genres)
  
  const valiArray = []
  //...
  allGenres.forEach(genres => {
    for (let i = 0; i < genres.length; i++) {
      valiArray.push(genres[i])
    }
  })
  
  const allGenresFiltered = [...new Set(valiArray)]
  // console.log('filter: ', filter)
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filter === '' ? 
          books
          .map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ) :
          books
          .filter(a => a.genres.includes(filter))
          .map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      {allGenresFiltered.map(genre => 
        ( 
          <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
        )
      )}
      <button onClick={() => setFilter('')}>All</button>
    </div>
  )
}

export default Books