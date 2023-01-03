describe('Mediabin', function () {
  beforeEach(function () {
    cy.visit('http://localhost:8080')
  })

  it('front page can be opened', function () {
    cy.contains('The ultimate destination for sharing all your digital content')
    cy.contains('New media type:')
    cy.contains('Latest media')
    cy.contains('Your one-stop shop for sharing media')
  })

  describe('media type', function () {
    it('is text by default', function () {
      cy.get('#textarea').should('exist')
    })

    it('can be changed to file', function () {
      cy.contains('File').click()
      cy.get('#syntaxHighlight').should('not.exist')
    })

    it('can be changed to text', function () {
      cy.contains('File').click()
      cy.contains('Text').click()
      cy.get('#textarea').should('exist')
    })
  })

  describe('text post', function () {
    it('can be made with a title', function () {
      cy.get('#textarea').type('Text post content')
      cy.get('#title').type('Text post title')
      cy.contains('Create new media').click()
      cy.contains('Media Info')
      cy.contains('Text post title')
      cy.contains('Text post content')
    })

    it('can be made without a title', function () {
      cy.get('#textarea').type('Text post without title content')
      cy.contains('Create new media').click()
      cy.contains('Media Info')
      cy.contains('Untitled')
      cy.contains('Text post without title content')
    })

    it('cannot be made without content', function () {
      cy.get('#title').type('No content title')
      cy.contains('Create new media').click()
      cy.contains('Media Info').should('not.exist')
    })

    it('can be made as hidden', function () {
      cy.get('#textarea').type('Hidden text post content')
      cy.get('#title').type('Hidden text post title')
      cy.get('#hidden').click()
      cy.contains('Create new media').click()
      cy.contains('Hidden text post content')
      cy.contains('Hidden text post title')
    })

    it('can be made as burn after read', function () {
      cy.get('#textarea').type('Burn after read text post content')
      cy.get('#title').type('Burn after read text post title')
      cy.get('#burnAfterRead').click()
      cy.contains('Create new media').click()
      cy.contains('You have created a burn after read media.')
    })

    it('can be made with syntax highlight', function () {
      cy.get('#textarea').type('digitalWrite(LED_BUILTIN, HIGH);')
      cy.get('#title').type('Syntax highlight')
      cy.get('#syntaxHighlight').click({ force: true })
      cy.contains('Create new media').click()
      cy.contains('digitalWrite(LED_BUILTIN, HIGH);')
      cy.contains('Arduino')
    })

    it('copy share link button works', function () {
      cy.get('#textarea').type('Text post content')
      cy.get('#title').type('Text post title')
      cy.contains('Create new media').click()
      cy.contains('Media Info')
      cy.get('#copyTextUrl').click()

      cy.window().its('navigator.clipboard')
        .invoke('readText').then(copiedUrl =>
          cy.wrap(copiedUrl).should('contain', 'https://mediabin.fly.dev/#/')
        )
    })

    it('shows up in latest media if not hidden', function () {
      cy.contains('Text post title')
      cy.contains('text | 17 B')
    })

    it('does not show up in latest media if hidden', function () {
      cy.contains('Hidden text post title').should('not.exist')
    })

    it('does not show up in latest media if burn after read', function () {
      cy.contains('Burn after read text post title').should('not.exist')
    })
  })

  describe('file/image post', function () {
    beforeEach(function () {
      cy.contains('File').click()
    })

    it('can be made with a title', function () {
      cy.get('input[type=file]').selectFile('text_file')
      cy.get('#title').type('File post title')
      cy.contains('Create new media').click()
      cy.contains('Media Info')
      cy.contains('File post title')
    })

    it('can be made without a title', function () {
      cy.get('input[type=file]').selectFile('text_file')
      cy.contains('Create new media').click()
      cy.contains('Media Info')
      cy.contains('Untitled')
    })

    it('cannot be made without a file', function () {
      cy.contains('Create new media').click()
      cy.contains('Media Info').should('not.exist')
    })

    it('can be made as hidden', function () {
      cy.get('input[type=file]').selectFile('text_file')
      cy.get('#title').type('Hidden file post title')
      cy.get('#hidden').click()
      cy.contains('Create new media').click()
      cy.contains('Media Info')
      cy.contains('Hidden file post title')
      cy.contains('Dummy text file content')
    })

    it('can be made as burn after read', function () {
      cy.get('input[type=file]').selectFile('text_file')
      cy.get('#title').type('Burn after read file post title')
      cy.get('#burnAfterRead').click()
      cy.contains('Create new media').click()
      cy.contains('You have created a burn after read media.')
    })

    it('copy share link button works', function () {
      cy.get('input[type=file]').selectFile('text_file')
      cy.get('#title').type('File post title')
      cy.contains('Create new media').click()
      cy.contains('Media Info')
      cy.get('#copyFileUrl').click()

      cy.window().its('navigator.clipboard')
        .invoke('readText').then(copiedUrl =>
          cy.wrap(copiedUrl).should('contain', 'https://mediabin.fly.dev/#/')
        )
    })

    it('shows up in latest media if not hidden', function () {
      cy.contains('File post title')
      cy.contains('unknown | 24 B')
    })

    it('does not show up in latest media if hidden', function () {
      cy.contains('Hidden file post title').should('not.exist')
    })

    it('does not show up in latest media if burn after read', function () {
      cy.contains('Burn after read file post title').should('not.exist')
    })

    it('renders a previewable file', function () {
      cy.get('input[type=file]').selectFile('text_file')
      cy.get('#title').type('Previewable post title')
      cy.contains('Create new media').click()
      cy.contains('Media Info')
      cy.contains('Previewable post title')
      cy.contains('Dummy text file content')
    })

    it('does not render an unpreviewable file', function () {
      cy.get('input[type=file]').selectFile('pdf_file.pdf')
      cy.get('#title').type('Unpreviewable post title')
      cy.contains('Create new media').click()
      cy.contains('Media Info')
      cy.contains('Unpreviewable post title')
      cy.contains('File could not be previewed. Please download file.')
    })

    it('renders an image', function () {
      cy.get('input[type=file]').selectFile('image_file.jpg')
      cy.get('#title').type('Image title')
      cy.contains('Create new media').click()
      cy.contains('Media Info')
      cy.contains('Image title')
      cy.contains('Unknown upload by an unknown person').should('not.exist')
    })
  })
})
