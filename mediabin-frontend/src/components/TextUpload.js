import mediaService from '../services/media'
import { useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'

const TextUpload = ({ allMedia, setAllMedia }) => {
  const [textArea, setTextArea] = useState('')

  const handleTextChange = (event) => {
    setTextArea(event.target.value)
  }

  const handleTextSubmit = async (event) => {
    event.preventDefault()

    try {
      const newMedia = await mediaService.createMedia({
        content: textArea,
        type: 'text'
      })

      setAllMedia(allMedia.concat(newMedia))
    } catch (error) {
      alert('Something went wrong')
    }
    setTextArea('')
  }

  return (
    <div>
      <Form onSubmit={handleTextSubmit}>
        <FloatingLabel
          controlId="floatingTextarea"
          label='Text'
          className='mb-3'
        >
          <Form.Control
            value={textArea}
            as='textarea'
            placeholder='Write your text here'
            onChange={handleTextChange}
          />
        </FloatingLabel>

        <Button variant="primary" type="submit">
          Create New Media
        </Button>

      </Form>
    </div>
  )
}

export default TextUpload
