import { useEffect, useState } from "react"

import mediaService from "./services/media"
import FileBase64 from "react-file-base64"

const App = () => {
  const [textArea, setTextArea] = useState('')
  const [image, setImage] = useState()
  const [file, setFile] = useState()
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

  const handleImageSubmit = async (event) => {
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

  const handleFileSubmit = async (event) => {
    event.preventDefault()

    try {
      const newFile = await mediaService.createMedia({
        content: file,
        type: 'file'
      })

      setAllMedia(allMedia.concat(newFile))
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
          Text:
          <br />
          <textarea value={textArea} onChange={handleTextChange} />
          <br />
        </label>
        <input type="submit" value="Create new media" />
      </form>
      <br />

      <form onSubmit={handleImageSubmit}>
        <label>
          Image:
          <br />
          <FileBase64 type='file' multiple={false} onDone={({ base64 }) => setImage(base64)} />
          <br />
        </label>
        <input type="submit" value="Upload image" />
      </form>
      <br />

      <form onSubmit={handleFileSubmit}>
        <label>
          File:
          <br />
          <FileBase64 type='file' multiple={false} onDone={({ base64 }) => setFile(base64)} />
          <br />
        </label>
        <input type="submit" value="Upload file" />
      </form>
      <br />

      {allMedia.map(media => {
        if (media.type === 'image') {
          return (
            <p>
              <img style={{ width: '10%', height: '10%' }} src={media.content} alt={'Unknown'} />
            </p>
          )
        } else if (media.type === 'text') {
          return (
            <p>
              {media.content}
            </p>)
        } else {
          const tmp = media.content.split(",");
          const prefix = tmp[0];
          const contentType = prefix.split(/[:;]+/)[1];
          const byteCharacters = window.atob(tmp[1]);

          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: contentType });
          const blobUrl = URL.createObjectURL(blob);

          return (
            <p>
              <a href={blobUrl}>
                <button>Download a mysterious file</button>
              </a>
            </p>
          )
        }
      })}

    </div>
  )
}

export default App
