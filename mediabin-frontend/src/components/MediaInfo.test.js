import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react/'
import userEvent from '@testing-library/user-event/'

import MediaInfo from './MediaInfo'

const fileMedia = {
  content: 'https://mediabin-s3.s3.eu-north-1.amazonaws.com/07344b9b-dd46-4b0f-98a9-7e6749ecc063.x-yaml',
  type: 'application/x-yaml',
  fileName: 'rules.yaml',
  size: 2142,
  title: 'YAML file',
  hidden: false,
  burnAfterRead: false,
}

const imageMedia = {
  content: 'https://mediabin-s3.s3.eu-north-1.amazonaws.com/219d6032-98bd-4754-8b8f-6d2c3f69d67c.gif',
  type: 'image/gif',
  fileName: 'catto.gif',
  size: 7275085,
  title: 'Look at this funny cat',
  hidden: false,
  burnAfterRead: false
}

describe('MediaInfo component', () => {
  test('renders file info', async () => {
    render(<MediaInfo media={fileMedia} />)

    const title = screen.getByText('YAML file')
    expect(title).toBeDefined()

    const fileName = screen.getByText('rules.yaml')
    expect(fileName).toBeDefined()

    const fileType = screen.getByText('application/x-yaml')
    expect(fileType).toBeDefined()

    const size = screen.getByText('2.1 kB')
    expect(size).toBeDefined()
  })

  test('renders image info', () => {
    render(<MediaInfo media={imageMedia} />)

    const title = screen.getByText('Look at this funny cat')
    expect(title).toBeDefined()

    const fileName = screen.getByText('catto.gif')
    expect(fileName).toBeDefined()

    const fileType = screen.getByText('image/gif')
    expect(fileType).toBeDefined()

    const size = screen.getByText('7.3 MB')
    expect(size).toBeDefined()
  })

  test('renders text info', () => {
    const media = {
      content: 'Sukulaku is best!',
      type: 'text',
      size: 17,
      title: 'IMPORTANT',
      hidden: false,
      burnAfterRead: false,
      syntaxHighlight: 'null',
    }

    render(<MediaInfo media={media} />)

    const title = screen.getByText('IMPORTANT')
    expect(title).toBeDefined()

    const size = screen.getByText('17 B')
    expect(size).toBeDefined()
  })

  test('download file button works', async () => {
    const downloadFile = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<MediaInfo buttonText={'Download file'} media={fileMedia}
      onClickButton={downloadFile} />)

    const downloadFileButton = container.querySelector('#mediaInfoButton')
    await user.click(downloadFileButton)

    expect(downloadFile.mock.calls).toHaveLength(1)
  })

  test('preview image button works', async () => {
    const previewImage = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<MediaInfo buttonText={'Preview full size image'} media={fileMedia}
      onClickButton={previewImage} />)

    const previewImageButton = container.querySelector('#mediaInfoButton')
    await user.click(previewImageButton)

    expect(previewImage.mock.calls).toHaveLength(1)
  })

  test('copy url button renders', async () => {
    render(<MediaInfo media={imageMedia} />)

    const button = screen.getByText('Copy share link')
    expect(button).toBeDefined()
  })
})
