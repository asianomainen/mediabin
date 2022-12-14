import { useEffect, useState } from "react"

import mediaService from "./services/media"
import FileBase64 from "react-file-base64"

const App = () => {
  const [textArea, setTextArea] = useState('')
  const [image, setImage] = useState()
  const [allMedia, setAllMedia] = useState([])

  useEffect(() => {
    const fetchMedia = async () => {
      const media = await mediaService.getAll()
      setAllMedia(media)
    }

    fetchMedia().catch(console.error)
  }, [])

  const handleTextChange = (event) => {
    setTextArea(event.target.value)
  }

  const handleTextSubmit = async (event) => {
    event.preventDefault();

    try {
      const newMedia = await mediaService.createMedia({
        content: textArea,
        type: 'text'
      })

      setAllMedia(allMedia.concat(newMedia))
    } catch {
      alert('Something went wrong')
    }
    setTextArea('')
  }

  const handleFileSubmit = async (event) => {
    event.preventDefault()

    try {
      const newImage = await mediaService.createMedia({
        content: image,
        type: 'image'
      })

      setAllMedia(allMedia.concat(newImage))
      alert('Media sent')
    } catch {
      alert('Something went wrong')
    }
  }

  return (
    <div>
      <h1>Mediabin</h1>

      <form onSubmit={handleTextSubmit}>
        <label>
          Media:
          <br />
          <textarea value={textArea} onChange={handleTextChange} />
          <br />
        </label>
        <input type="submit" value="Create new media" />
      </form>
      <br />

      <form onSubmit={handleFileSubmit}>
        <label>
          Media:
          <br />
          <FileBase64 type='file' multiple={false} onDone={({ base64 }) => setImage(base64)} />
          <br />
        </label>
        <input type="submit" value="Upload file" />
      </form>
      <br />

      {allMedia.map(media => {
        return media.type === 'image' ? (
          <p><img style={{ width: '10%', height: '10%' }} src={media.content} alt={'Unknown'} /></p>
        ) : (
          <p>{media.content}</p>
        )
      })}

    </div>
  )
}

export default App
