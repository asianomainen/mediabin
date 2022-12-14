import { useEffect, useState } from "react";
import mediaService from "./services/media"

const App = () => {
  const [textArea, setTextArea] = useState('')
  const [allMedia, setAllMedia] = useState([])

  useEffect(() => {
    const fetchMedia = async () => {
      const media = await mediaService.getAll()
      setAllMedia(media)
    }

    fetchMedia()
  }, [allMedia])

  const handleChange = (event) => {
    setTextArea(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      const newMedia = mediaService.createMedia({
        content: textArea
      })
      setAllMedia(allMedia.concat(newMedia))
      alert('Media sent')
    } catch {
      alert('Something went wrong')
    }
    setTextArea('')
  }

  return (
    <div>
      <h1>Mediabin</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Media:
          <br />
          <textarea value={textArea} onChange={handleChange} />
          <br />
        </label>
        <input type="submit" value="Create new media" />
      </form>
      <br />

      {allMedia.map(media => <div>{media.content}</div>)}
    </div>
  )
}

export default App
