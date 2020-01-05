import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders ONLY title and author at first', () => {
  const blogs = []
  const blog = {
    title: 'Test title',
    author: 'John Test',
    url: 'www.google.com',
    likes: 22,
    user: {
      name: 'Kalervo',
      username: 'KKummola',
    }
  }

  blogs.push(blog)

  const user = {
    name: 'Toni Testaaja',
    username: 'TTEST'
  }

  const component = render(
    <Blog blog={blog} setBlogs={() => console.log('mock')}
      blogs={blogs} user={user} />
  )

  const shownDiv = component.container.querySelector('.default')
  console.log(prettyDOM(shownDiv))

  //content is fine
  expect(shownDiv).toHaveTextContent(
    'Test title'
  )

  expect(shownDiv).toHaveTextContent(
    'John Test'
  )

  expect(shownDiv).not.toHaveTextContent(
    'www.google.com'
  )

  expect(shownDiv).not.toHaveTextContent(
    '22'
  )
  // it is actually displayed
  expect(shownDiv).not.toHaveStyle('display: none')

  //comparison to hidden stuff
  const hiddenDiv = component.container.querySelector('.clicked')
  console.log(prettyDOM(hiddenDiv))

  expect(hiddenDiv).toHaveStyle('display: none')
})

test('clicking a blog shows hidden fields', async () => {
  const blogs = []
  const blog = {
    title: 'Test title',
    author: 'John Test',
    url: 'www.google.com',
    likes: 22,
    user: {
      name: 'Kalervo',
      username: 'KKummola',
    }
  }

  blogs.push(blog)

  const user = {
    name: 'Toni Testaaja',
    username: 'TTEST'
  }

  const component = render(
    <Blog blog={blog} setBlogs={() => console.log('mock')}
      blogs={blogs} user={user} />
  )

  const clickableBlog = component.container.querySelector('.clickable')

  fireEvent.click(clickableBlog)

  const shownDiv = component.container.querySelector('.clicked')
  console.log(prettyDOM(shownDiv))

  expect(shownDiv).not.toHaveStyle('display: none')
  expect(shownDiv).toHaveTextContent(
    'Test title'
  )

  expect(shownDiv).toHaveTextContent(
    'John Test'
  )

  expect(shownDiv).toHaveTextContent(
    'www.google.com'
  )

  expect(shownDiv).toHaveTextContent(
    '22'
  )

  expect(shownDiv).toHaveTextContent(
    'added by Kalervo'
  )

  const hiddenDiv = component.container.querySelector('.default')
  expect(hiddenDiv).toHaveStyle('display: none')

})