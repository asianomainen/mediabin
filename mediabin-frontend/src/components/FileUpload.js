import uuid from "react-uuid";
import { uploadFile } from "react-s3";
import { useState } from "react";

import mediaService from "../services/media";
import { awsConfig } from "../utils/config"

window.Buffer = window.Buffer || require("buffer").Buffer;

const FileUpload = ({ allMedia, setAllMedia }) => {
  const [file, setFile] = useState()
  const [fileType, setFileType] = useState()

  const handleFileInput = (event) => {
    setFile(event.target.files[0])
    setFileType(event.target.files[0].type)
  }

  const handleFileUpload = async (event) => {
    event.preventDefault()

    console.log('file', file)

    // Creates a copy of the file with a random name in order
    // not to overwrite existing files in AWS with the same name.
    const fileToUpload = new File([file], uuid())
    console.log('fileToUpload', fileToUpload)

    try {
      const uploadedFile = await uploadFile(fileToUpload, awsConfig)

      const newMedia = await mediaService.createMedia({
        content: uploadedFile.location,
        type: fileType,
        name: file.name
      })

      console.log('newMedia', newMedia)


      setAllMedia(allMedia.concat(newMedia))
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
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
    </>
  )
}

export default FileUpload
