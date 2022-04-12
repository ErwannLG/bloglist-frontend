describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.get('#username').should('exist')
    cy.get('#password').should('exist')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.login-error').should('contain', 'wrong username or password')
      cy.get('.login-error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
      })

      it('A blog can be created', function() {
        cy.contains('create new blog').click()
        cy.contains('create new blog')
        cy.get('#title-input').type('New test blog')
        cy.get('#author-input').type('Mister Test')
        cy.get('#url-input').type('http://yaytestblog.com/')
        cy.get('#addBlog-input').click()

        cy.contains('New test blog Mister Test')
      })

      it('Users can like a blog', function() {
        cy.contains('create new blog').click()
        cy.get('#title-input').type('New test blog')
        cy.get('#author-input').type('Mister Test')
        cy.get('#url-input').type('http://yaytestblog.com/')
        cy.get('#addBlog-input').click()

        cy.contains('show').click()
        cy.contains('like').click()

        cy.contains('1 likes')
      })
    })
  })
})