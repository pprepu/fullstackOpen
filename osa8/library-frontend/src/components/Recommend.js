import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import RecommendedBooks from './RecommendedBooks'

const Recommend = (props) => {
  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  const ALL_BOOKS = gql`
  {
    allBooks  {
      title
      published
      genres
      author {
        name
      }
    }
  }
  `

  const user = props.result.data.me
  
  // const FILTERED_BOOKS = gql`
  
  //   query allBooks ($genre: String!)  {
  //     allbooks (genre: $genre) {
  //       title
  //       published
  //       genres
  //       author {
  //         name
  //       }
  //     }
  //   }
  // `

  // console.log('user', user)
  return (
    <div>
      <h2>recommendations</h2>

      <p>books in your favorite genre <strong>{user.favoriteGenre}</strong></p>

      <Query query={ALL_BOOKS}>
        {(result) => <RecommendedBooks
        result={result}
        filter={user.favoriteGenre}
      />}
      </Query>
    </div>
  )
}

export default Recommend