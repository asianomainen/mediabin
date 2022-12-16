import { useEffect, useState } from 'react'

import mediaService from './services/media'
import TextUpload from './components/TextUpload'
import FileUpload from './components/FileUpload'
import { Form } from 'react-bootstrap'

const App = () => {
  const [allMedia, setAllMedia] = useState([])

  useEffect(() => {
    const fetchMedia = async () => {
      const media = await mediaService.getAll()
      setAllMedia(media)
    }

    fetchMedia().catch(console.error)
  }, [])

  return (
    <div className={'main-container'}>
      <h1>Mediabin</h1>

      <h4>Welcome to Mediabin! Are you tired of only being able to paste text in Pastebin? Worry no more! Mediabin is
        here. With Mediabin you are able to share files in addition to text.</h4>

      <Form>
        <Form.Label>
          Create new media
        </Form.Label>
        <Form.Check
          inline
          label='Text'
          name='group1'
          type='radio'
        />
        <Form.Check
          inline
          label='File/Image'
          name='group1'
          type='radio'
        />
      </Form>

      <TextUpload allMedia={allMedia} setAllMedia={setAllMedia} />
      <FileUpload allMedia={allMedia} setAllMedia={setAllMedia} />
    </div>
  )
}

export default App
