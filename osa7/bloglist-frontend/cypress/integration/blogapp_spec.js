describe('Blog-app', function()  {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const newUser = {
      name: 'Tester Tony',
      username: 'tester',
      password: 'passu'
    }
    cy.request('POST', 'http://localhost:3003/api/users', newUser)
    cy.visit('http://localhost:3000')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('[data-cy=username]')
        .type('tester')
      cy.get('[data-cy=password]')
        .type('passu')
      cy.contains('login')
        .click()
      cy.contains('Tester Tony logged in')
    })

    it('user can create a new blog', function() {
      cy.contains('create new')
        .click()
      cy.get('[data-cy=title')
        .type('A testing blog')
      cy.get('[data-cy=author]')
        .type('Anonymous')
      cy.get('[data-cy=url]')
        .type('http://www.github.com')
      cy.get('[data-cy=create]')
        .click()
      cy.contains('blog A testing blog created')
    })

    it('user can log off', function() {
      cy.contains('logout')
        .click()
      cy.contains('log in to application')
    })

    it('user can view all users', function() {
      cy.contains('users')
        .click()
      // tää seuraava on bad practice..., vois nimetä esim. otsikkoelementin cypressille
      // usersista ja tsekkaa sen
      cy.contains('blogs created:')
    })
  })

  describe('when logged in and after making one new blog', function() {
    beforeEach(function() {
      cy.get('[data-cy=username]')
        .type('tester')
      cy.get('[data-cy=password]')
        .type('passu')
      cy.contains('login')
        .click()
      cy.contains('create new')
        .click()
      cy.get('[data-cy=title')
        .type('A testing blog')
      cy.get('[data-cy=author]')
        .type('Anonymous')
      cy.get('[data-cy=url]')
        .type('http://www.github.com')
      cy.get('[data-cy=create]')
        .click()
      cy.wait(1000)
    })
    it('it is possible to click the blog and add a like to it', function() {
      cy.contains('A testing blog by Anonymous')
        .click()
      cy.contains('0 likes')
      cy.get('[data-cy=like]')
        .click()
      cy.wait(500)
      cy.contains('1 likes')
    })
  })
})