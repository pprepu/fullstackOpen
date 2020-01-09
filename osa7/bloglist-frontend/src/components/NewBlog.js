import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

//styles
import { Button, Form } from 'semantic-ui-react'

const NewBlog = (props) => {
  const [title, titleReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [url, urlReset] = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    props.createBlog({
      title: title.value,
      author: author.value,
      url: url.value
    })
    props.notify(`blog ${title.value} created`)
    titleReset()
    authorReset()
    urlReset()
  }

  return (
    <div>
      <h2>create new</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>title</label>
          <input data-cy="title" {...title} />
        </Form.Field>
        <Form.Field>
          <label>author</label>
          <input data-cy="author" {...author} />
        </Form.Field>
        <Form.Field>
          <label>url</label>
          <input data-cy="url" {...url} />
        </Form.Field>
        <Button data-cy="create" type='submit'>create</Button>
      </Form>
    </div>
  )
}

const mapDispatchToProps = {
  createBlog
}
const connectedNewBlog = connect(null, mapDispatchToProps)(NewBlog)
export default connectedNewBlog