import uuid from 'react-uuid'
import { uploadFile } from 'react-s3'
import { useState } from 'react'

import mediaService from '../services/media'
import { awsConfig } from '../utils/config'

window.Buffer = window.Buffer || require('buffer').Buffer

const FileUpload = ({ allMedia, setAllMedia }) => {
  const [file, setFile] = useState()
  const [fileType, setFileType] = useState()

  const handleFileInput = (event) => {
    setFile(event.target.files[0])
    setFileType(event.target.files[0].type)
  }

  const handleFileUpload = async (event) => {
    event.preventDefault()

    // Creates a copy of the file with a random name in order
    // not to overwrite existing files in AWS with the same name.
    const fileToUpload = new File([file], uuid())

    try {
      const uploadedFile = await uploadFile(fileToUpload, awsConfig)

      const newMedia = await mediaService.createMedia({
        content: uploadedFile.location,
        type: fileType,
        name: file.name
      })

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
          <input type='file' onChange={handleFileInput} />
          <br />
        </label>
        <input type='submit' value='Upload file' />
      </form>
      <br />
    </>
  )
}

export default FileUpload
