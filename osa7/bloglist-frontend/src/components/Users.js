import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { initializeUsers } from '../reducers/usersReducer'

//styles
import { Table } from 'semantic-ui-react'

const Users = (props) => {

  if (props.users.length === 0) {
    return (
      <div>
        <p>loading...</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Users</h2>
      <Table striped celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              User
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.users.map(user =>
            <Table.Row key={user.id}>
              <Table.Cell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </Table.Cell>
              <Table.Cell>
                blogs created: {user.blogs.length}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>

  )
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  initializeUsers
}
const connectedUsers = connect(mapStateToProps, mapDispatchToProps)(Users)
export default connectedUsers