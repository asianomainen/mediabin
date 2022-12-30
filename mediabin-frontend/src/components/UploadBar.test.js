import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react/'
import userEvent from '@testing-library/user-event/'

import UploadBar from './UploadBar'

describe('UploadBar component', () => {
  let user
  beforeEach(() => {
    user = userEvent.setup()
  })

  test('setting title works', async () => {
    const setTitle = jest.fn()
    const { container } = render(<UploadBar setTitle={setTitle} />)

    const input = container.querySelector('#title')
    await user.type(input, 'Media title')

    expect(setTitle.mock.calls).toHaveLength(11) // 11 chars in "Media title" so 11 calls
    expect(setTitle.mock.calls[10][0]).toBe('Media title')
  })

  test('setting hidden works', async () => {
    const setHidden = jest.fn()
    const { container } = render(<UploadBar setHidden={setHidden} />)

    const checkBox = container.querySelector('#hidden')
    await user.click(checkBox)

    expect(setHidden.mock.calls).toHaveLength(1)
    expect(setHidden.mock.calls[0][0]).toBe(true)
  })

  test('setting burn after read works', async () => {
    const setBurnAfterRead = jest.fn()
    const setHidden = jest.fn()
    const { container } = render(<UploadBar setBurnAfterRead={setBurnAfterRead} setHidden={setHidden} />)

    const checkBox = container.querySelector('#burnAfterRead')
    await user.click(checkBox)

    expect(setBurnAfterRead.mock.calls).toHaveLength(1)
    expect(setBurnAfterRead.mock.calls[0][0]).toBe(true)

    expect(setHidden.mock.calls).toHaveLength(1)
    expect(setHidden.mock.calls[0][0]).toBe(true)
  })

  test('setting syntax highlight works', async () => {
    const setSyntaxHighlight = jest.fn()
    const { container } = render(<UploadBar setSyntaxHighlight={setSyntaxHighlight} syntaxHighlight={'Arduino'} />)

    const syntax = container.querySelector('#syntaxHighlight')
    await user.click(syntax)

    const syntaxButton = container.querySelector('#syntaxButton')
    await user.click(syntaxButton)

    expect(setSyntaxHighlight.mock.calls).toHaveLength(1)
    expect(setSyntaxHighlight.mock.calls[0][0]).toBe('arduino')
  })

  test('showing burn after read modal works', async () => {
    render(<UploadBar showModal={true} />)

    const modalText = screen.getByText('You have created a burn after read media.')
    expect(modalText).toBeDefined()
  })

  test('upload button text is correct when not uploading', async () => {
    render(<UploadBar uploading={false} />)

    const buttonText = screen.getByText('Create new media')
    expect(buttonText).toBeDefined()
  })

  test('upload button text is correct when uploading', async () => {
    render(<UploadBar uploading={true} />)

    const buttonText = screen.getByText('Loading...')
    expect(buttonText).toBeDefined()
  })
})
