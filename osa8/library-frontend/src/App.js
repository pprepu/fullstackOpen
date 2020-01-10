import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from 'apollo-boost'
import { Query, Mutation, useMutation, useApolloClient } from 'react-apollo'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const ALL_AUTHORS = gql`
  {
    allAuthors  {
      name
      born
      bookCount
    }
  }
  `
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
  const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String]) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
    }
  }
  `

  const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
const RECOMMEND = gql`
query {
  me {
    favoriteGenre
  }
}
`
  
  const client = useApolloClient()

  const handleError = (error) => {
    console.log(error)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  // const [login] = useMutation(LOGIN, {
  //   onError: handleError
  // })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && ( <button onClick={() => setPage('add')}>add book</button> )}
        {token && ( <button onClick={() => setPage('recommend')}>recommend</button> )}

        {token ? 
          (
          <button onClick={logout}>logout</button>
          ) :
          ( 
          <button onClick={() => setPage('login')}>login</button>
          )
        }
      </div>


      <Query query={ALL_AUTHORS}>
        {(result) => <Authors
        show={page === 'authors'} 
        result={result}
        token={token}
      />}
      </Query>
      
      <Query query={ALL_BOOKS}>
        {(result) => <Books
        show={page === 'books'}
        result={result}
      />}
      </Query>
      
      <Mutation 
        mutation={ADD_BOOK}
        refetchQueries={[{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]}
        onError={handleError}>
          {(addBook) => 
          
          <NewBook
            show={page === 'add'}
            addBook={addBook}
          />
          }
      </Mutation>

      <Query query={RECOMMEND}>
        {(result) => <Recommend
        show={page === 'recommend'} 
        result={result}
      />}
      </Query>

      <Mutation 
        mutation={LOGIN}
        onError={handleError}>
          {(login) =>          
          <LoginForm
            show={page === 'login'}
            login={login}
            setToken={(token) => setToken(token)}
          />
          }
      </Mutation>

    </div>
  )
}

export default App