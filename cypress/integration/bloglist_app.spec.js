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
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
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

    it('User can delete his own blogs', function() {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('New test blog')
      cy.get('#author-input').type('Mister Test')
      cy.get('#url-input').type('http://yaytestblog.com/')
      cy.get('#addBlog-input').click()

      cy.contains('show').click()
      cy.get('#remove').click()
    })

    it('User cannot delete a blog posted by another user', function() {
      cy.contains('logout').click()
      const user = {
        name: 'Someone Else',
        username: 'someone',
        password: 'password'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)

      cy.get('#username').type('someone')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('create new blog').click()
      cy.contains('create new blog')
      cy.get('#title-input').type('A blog posted by Someone Else')
      cy.get('#author-input').type('Trucmuche')
      cy.get('#url-input').type('http://naytestblog.com/')
      cy.get('#addBlog-input').click()

      cy.contains('logout').click()

      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('show').click()
      cy.get('#remove').click()

      cy.contains('A blog posted by Someone Else')
    })

    it('Blogs are ordered by number of likes', function() {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('Blog 1')
      cy.get('#author-input').type('Author')
      cy.get('#url-input').type('http://yaytestblog.com/')
      cy.get('#addBlog-input').click()

      cy.get('#title-input').type('Blog 2')
      cy.get('#author-input').type('Author')
      cy.get('#url-input').type('http://yaytestblog.com/')
      cy.get('#addBlog-input').click()

      cy.get('#title-input').type('Blog 3')
      cy.get('#author-input').type('Author')
      cy.get('#url-input').type('http://yaytestblog.com/')
      cy.get('#addBlog-input').click()

      cy.get('.blog-list').contains('show').click()
      cy.get('.blog-list').contains('show').click()
      cy.get('.blog-list').contains('show').click()

      cy.get('.blog-list>div').eq(2).contains('like').click().click().click()
      cy.get('.blog-list>div').eq(2).contains('like').click().click()
      cy.get('.blog-list>div').eq(2).contains('like').click()

      cy.get('.blog-list>div').eq(0).should('contain', 'Blog 3')
      cy.get('.blog-list>div').eq(1).should('contain', 'Blog 2')
      cy.get('.blog-list>div').eq(2).should('contain', 'Blog 1')
    })
  })
})