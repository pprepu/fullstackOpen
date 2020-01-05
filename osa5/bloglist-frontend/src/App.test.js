import React from 'react'
import { render,  waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('Integration tests for the whole application', () => {

  test('when user is not logged in, only login-form is showed', async () => {
    const component = render(<App />)

    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.loginView')
    )

    expect(component.container).toHaveTextContent(
      'Log in to application'
    )

    expect(component.container).not.toHaveTextContent(
      'Total number of blogs:'
    )
  })

  test('when user is logged in, blogs are rendered to the page', async () => {

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Tester John'
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user))

    const component = render(<App />)

    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.App')
    )

    expect(component.container).not.toHaveTextContent(
      'Log in to application'
    )

    expect(component.container).toHaveTextContent(
      'Total number of blogs: 2'
    )

    expect(component.container).toHaveTextContent(
      'testi457893 Toope'
    )

  })
})