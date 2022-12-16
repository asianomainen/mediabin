import { Form } from 'react-bootstrap'
import TextUpload from './TextUpload'
import FileUpload from './FileUpload'
import { useState } from 'react'

const MediaUpload = ({ allMedia, setAllMedia }) => {
  const [mediaChoice, setMediaChoice] = useState(true)

  const handleMediaChoiceChange = () => {
    setMediaChoice(!mediaChoice)
  }

  return (
    <div>
      <Form onChange={handleMediaChoiceChange}>
        <Form.Label>
          Create new media
        </Form.Label>
        <Form.Check
          inline
          defaultChecked
          label='Text'
          name='media-type'
          type='radio'
        />
        <Form.Check
          inline
          label='File/Image'
          name='media-type'
          type='radio'
        />
      </Form>

      {mediaChoice === true
        ? <TextUpload allMedia={allMedia} setAllMedia={setAllMedia} />
        : <FileUpload allMedia={allMedia} setAllMedia={setAllMedia} />
      }
    </div>
  )
}

export default MediaUpload
