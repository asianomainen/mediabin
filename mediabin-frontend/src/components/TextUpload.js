import mediaService from '../services/media'
import { useState } from 'react'

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
    <>
      <form onSubmit={handleTextSubmit}>
        <label>
          Text:
          <br />
          <textarea value={textArea} onChange={handleTextChange} />
          <br />
        </label>
        <input type='submit' value='Create new media' />
      </form>
      <br />
    </>
  )
}

export default TextUpload
