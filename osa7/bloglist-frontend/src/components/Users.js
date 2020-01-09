import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { initializeUsers } from '../reducers/usersReducer'

const Users = (props) => {

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td><strong>blogs created</strong></td>
          </tr>
          {props.users.map(u => {
            return (
              <tr key={u.id}>
                <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
                <td>{u.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

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