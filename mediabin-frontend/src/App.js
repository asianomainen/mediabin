import { useEffect, useState } from "react"
import { uploadFile } from 'react-s3';
import uuid from 'react-uuid';

import mediaService from "./services/media"

window.Buffer = window.Buffer || require("buffer").Buffer;

const config = {
  bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
}

const App = () => {
  const [textArea, setTextArea] = useState('')
  const [file, setFile] = useState()
  const [fileType, setFileType] = useState()
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

  const handleFileInput = (event) => {
    setFile(event.target.files[0])
    setFileType(event.target.files[0].type)
  }

  const handleFileUpload = async (event) => {
    event.preventDefault()
    console.log(file)

    // Creates a copy of the file with a random name in order
    // not to overwrite existing files in AWS with the same name.
    const fileToUpload = new File([file], uuid())
    console.log(fileToUpload)

    try {
      const uploadedFile = await uploadFile(fileToUpload, config)
      console.log(uploadedFile)

      const newMedia = await mediaService.createMedia({
        content: uploadedFile.location,
        type: fileType,
        name: file.name
      })

      console.log(newMedia)

      setAllMedia(allMedia.concat(newMedia))
    } catch (e) {
      console.error(e)
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

      <form onSubmit={handleFileUpload}>
        <label>
          File:
          <br />
          <input type="file" onChange={handleFileInput} />
          <br />
        </label>
        <input type="submit" value="Upload file" />
      </form>
      <br />

      {allMedia.map(media => {
        if (media.type.split('/')[0] === 'image') {
          return (
            <p>
              <img style={{ width: '10%', height: '10%' }} src={media.content} alt={'Unknown'} />
              <br />
              <a href={media.content}>
                <button>Download {media.name}</button>
              </a>
            </p>
          )
        } else if (media.type === 'text') {
          return (
            <p>
              {media.content}
            </p>)
        } else {
          return (
            <p>
              <a href={media.content}>
                <button>Download {media.name}</button>
              </a>
            </p>
          )
        }
      })}

    </div>
  )
}

export default App
