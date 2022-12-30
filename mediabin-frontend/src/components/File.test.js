import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react/'
import { waitFor } from '@testing-library/react'

import File from './File'

describe('File component', () => {
  test('renders content', async () => {
    const media = {
      content: 'https://mediabin-s3.s3.eu-north-1.amazonaws.com/07344b9b-dd46-4b0f-98a9-7e6749ecc063.x-yaml',
      type: 'application/x-yaml',
      fileName: 'rules.yaml',
      size: 2142,
      title: 'YAML file',
      hidden: false,
      burnAfterRead: false,
    }

    const { container } = render(<File media={media} />)

    await waitFor(() => {
      expect(container.querySelector('#file')).toBeInTheDocument()
    })

    const file = await container.querySelector('#file')
    expect(file).toBeDefined()
  })

  test('renders correct text when file cannot be previewed', async () => {
    const media = {
      content: 'https://mediabin-s3.s3.eu-north-1.amazonaws.com/bc603900-55a6-4483-a1f1-efc56c2d6f6e.vnd.oasis.opendocument.text',
      type: 'application/vnd.oasis.opendocument.text',
      fileName: 'cyberproject.odt',
      size: 11648,
      title: 'CYBER',
      hidden: false,
      burnAfterRead: false,
    }

    const { container } = render(<File media={media} />)

    await waitFor(() => {
      expect(container.querySelector('#no-preview')).toBeInTheDocument()
    })

    const file = await container.querySelector('#no-preview')
    expect(file).toBeDefined()

    const fileText = screen.getByText('File could not be previewed. Please download file.')
    expect(fileText).toBeDefined()
  })
})
