describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
          name: 'Raj Shrestha',
          username: 'rshrestha',
          password: 'sekret'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
      })
    it('Login form is shown', function() {
        cy.contains('username')
    })
    it('user can login', function () {
        cy.contains('login').click()
        cy.get('#username').type('rshrestha')
        cy.get('#password').type('sekret')
        cy.get('#login-button').click()
        cy.contains('Raj Shrestha logged in')
    })
    it('login fails with wrong password', function() {
        cy.contains('login').click()
        cy.get('#username').type('rshrestha')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
        cy.get('.error')
          .should('contain', 'Wrong credentials')
          .and('have.css', 'color', 'rgb(255, 0, 0)')
          .and('have.css', 'border-style', 'solid')
        cy.get('html').should('not.contain', 'Raj Shrestha logged in')
    })
    describe('when logged in', function() {
        beforeEach(function() {
          cy.login({ username: 'rshrestha', password: 'sekret' })
        })
        it('a new blog can be created', function() {
          cy.contains('new blog').click()
          cy.get('#title').type('a blog created by cypress')
          cy.contains('create').click()
          cy.contains('a blog created by cypress')
        })
        describe('and several blogs exist', function () {
            beforeEach(function () {
              cy.createBlog({ title: 'first blog', author: 'Me', url:'http://abc.com' })
              cy.createBlog({ title: 'second blog', author: 'Me2', url:'http://cde.com' })
              cy.createBlog({ title: 'third blog', author: 'Me3', url:'http://efg.com' })
            })
            it('can view details of one blog', function () {
              cy.contains('first blog').parent().find('button').as('theButton')
              cy.get('@theButton').click()
              cy.contains('http://abc.com')
            })
            it('can like the blog', function () {
                cy.contains('first blog').parent().find('button').as('theButton')
                cy.get('@theButton').click()
                cy.contains('Like').click()
                cy.contains('likes: 1')
            })
            it('can remove the blog', function () {
                cy.contains('first blog').parent().find('button').as('theButton')
                cy.get('@theButton').click()
                cy.contains('remove').click()
                cy.get('html').should('not.contain', 'first blog')
            })
        })
    })
})