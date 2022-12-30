import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react/'

import Text from './Text'

describe('Text component', () => {
  test('renders content', () => {
    const media = {
      content: 'Sukulaku is best!',
      type: 'text',
      size: 17,
      title: 'IMPORTANT',
      hidden: false,
      burnAfterRead: false,
      syntaxHighlight: 'null',
    }

    render(<Text media={media} />)

    const content = screen.getByText('Sukulaku is best!')
    expect(content).toBeDefined()

    const title = screen.getByText('IMPORTANT')
    expect(title).toBeDefined()

    const size = screen.getByText('17 B')
    expect(size).toBeDefined()
  })

  test('renders syntax highlighted content', () => {
    const media = {
      content: 'const integer = 5',
      type: 'text',
      size: 17,
      title: 'Syntax highlight',
      hidden: false,
      burnAfterRead: false,
      syntaxHighlight: 'javascript',
    }

    const { container } = render(<Text media={media} />)
    const code = container.querySelector('#code')

    expect(code.className).toBe('language-javascript')
  })
})
