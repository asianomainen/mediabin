import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react/'

import Image from './Image'

describe('Image component', () => {
  test('renders content', () => {
    const media = {
      content: 'https://mediabin-s3.s3.eu-north-1.amazonaws.com/219d6032-98bd-4754-8b8f-6d2c3f69d67c.gif',
      type: 'image/gif',
      fileName: 'catto.gif',
      size: 7275085,
      title: 'Look at this funny cat',
      hidden: false,
      burnAfterRead: false
    }

    const { container } = render(<Image media={media} />)

    const image = container.querySelector('#image')
    expect(image.src).toBe('https://mediabin-s3.s3.eu-north-1.amazonaws.com/219d6032-98bd-4754-8b8f-6d2c3f69d67c.gif')
  })
})
