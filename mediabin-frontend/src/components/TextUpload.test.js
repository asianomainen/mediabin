import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react/'
import userEvent from '@testing-library/user-event/'
import { BrowserRouter as Router } from 'react-router-dom'

import TextUpload from './TextUpload'

describe('TextUpload component', () => {
  test('text area shows typed text', async () => {
    const user = userEvent.setup()

    const { container } = render(<Router><TextUpload /></Router>)

    const textarea = container.querySelector('#textarea')
    await user.type(textarea, 'Text media post')

    const content = screen.getByText('Text media post')
    expect(content).toBeDefined()
  })
})
