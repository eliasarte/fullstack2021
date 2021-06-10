describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username: 'test',
      name: 'tester',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')

  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })
  describe('Login',function() {
    it('Login works with correct credentials', function() {
      cy.contains('Log in to application')
      cy.get('#username').type('test')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('tester logged in')
    })

    it('Login fails with wrong credentials', function() {
      cy.contains('Log in to application')
      cy.get('#username').type('somename')
      cy.get('#password').type('lol')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
      cy.get('#error-notification').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.contains('Log in to application')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test', password: 'salasana' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('just a blog')
      cy.get('#author').type('tester')
      cy.get('#url').type('lol.fi')
      cy.get('#create-blog').click()
      cy.contains('just a blog by tester')
      cy.contains('just a blog, tester')
    })
  })

  describe('When logged in with blog existing', function() {
    beforeEach(function() {
      cy.login({ username: 'test', password: 'salasana' })
      cy.createBlog({ title: 'just a blog', author: 'tester', url: 'lol.fi' })
    })

    it('A blog can be liked', function() {
      cy.contains('View').click()
      cy.contains('like').click()
      cy.contains('1')
    })

    it('A blog can be deleted by owner', function() {
      cy.contains('View').click()
      cy.contains('delete').click()
      cy.on('window:confirm', (txt) => {
        expect(txt).to.contains('Delete just a blog by tester?')})
      cy.get('#notification').should('contain', 'just a blog by tester was removed')
    })
  })

  describe('When there are many blogs', function () {
    beforeEach(function () {
      cy.login({ username: 'test', password: 'salasana' })
      cy.createBlog({ title: 'Blog1', author: 'tester', url: 'blog.fi/1', likes: 1 })
      cy.createBlog({ title: 'Blog2', author: 'tester', url: 'blog.fi/2', likes: 2 })
      cy.createBlog({ title: 'Blog3', author: 'tester', url: 'blog.fi/3', likes: 3 })
    })

    it('Blogs are sorted correctly based on likes', function () {
      //originally
      cy.get('.simple').first().contains('View').click()
      cy.contains('3')
      cy.get('.simple').last().contains('View').click()
      cy.contains('1')

      //after few likes blog1 should be first
      cy.get('.simple').last().contains('like')
        .click()
        .wait(300)
        .click()
        .wait(300)
        .click()
        .wait(300)
      cy.get('.simple').first()
      cy.contains('4')
      cy.contains('Blog1')
      //do same for blog2 which is now last
      cy.get('.simple').last().contains('View').click().wait(300)
      cy.get('.simple').last().contains('like')
        .click()
        .wait(300)
        .click()
        .wait(300)
        .click()
        .wait(300)
      cy.get('.simple').first()
      cy.contains('5')
      cy.contains('Blog2')
    })
  })

})