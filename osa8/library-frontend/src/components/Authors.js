import React from 'react'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import SetBorn from './SetBorn'

const Authors = (props) => {
  if (!props.show) {
    return null
  }

  const handleError = (error) => {
    console.log(error)
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }
  // kenties olisi järkevää laittaa kyselyt yhteen tiedostoon
  // josta ne importattaisiin?
  const ALL_AUTHORS = gql`
  {
    allAuthors  {
      name
      born
      bookCount
    }
  }
  `

  const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
    name
    born
    id
  }
}
`

  const authors = props.result.data.allAuthors
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      
      {props.token && 
        (
        <h3>Set birthyear</h3>
        )
      }
      {props.token && 
        ( 
        <Mutation 
          mutation={EDIT_AUTHOR}
          refetchQueries={[{ query: ALL_AUTHORS }]}
          onError={handleError}>
            {(editAuthor) => 
            
            <SetBorn
              editAuthor={editAuthor}
              authors={authors}
            />
            }
        </Mutation> 
        )
      }
    </div>
  )
}

export default Authors