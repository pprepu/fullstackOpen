import React from 'react'
//import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'
//afterEach(cleanup)

test('renders content and likes', () => {
  const blog = {
    title: 'Test title',
    author: 'John Test',
    likes: 22
  }

  const component = render(
    <SimpleBlog blog={blog} onClick={() => console.log('e')} />
  )

  const div1 = component.container.querySelector('.content')

  expect(div1).toHaveTextContent(
    'Test title'
  )

  expect(div1).toHaveTextContent(
    'John Test'
  )

  console.log(prettyDOM(div1))
  const div2 = component.container.querySelector('.likes')

  expect(div2).toHaveTextContent(
    '22'
  )

})

test('eventhandler in like-button is called', async () => {
  const blog = {
    title: 'Test title',
    author: 'John Test',
    likes: 22
  }

  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = component.getByText(
    'like'
  )

  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
