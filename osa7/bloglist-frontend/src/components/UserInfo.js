import React from 'react'

//styles
import { Table } from 'semantic-ui-react'

const UserInfo = ({ user }) => {
  if (!user) {
    return (
      <div>
        <p>loading... or not a valid id</p>
      </div>
    )
  }

  return (
    <div>
      <h2>{user.name} </h2>
      <Table striped celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              ADDED BLOGS
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {user.blogs.map(blog =>
            <Table.Row key={blog.id}>
              <Table.Cell>
                {blog.title}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>

      </Table>
    </div>

  )
}

export default UserInfo