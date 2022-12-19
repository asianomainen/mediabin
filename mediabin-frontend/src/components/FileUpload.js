import uuid from 'react-uuid'
import { uploadFile } from 'react-s3'
import { useState } from 'react'

import mediaService from '../services/media'
import { awsConfig } from '../utils/config'
import { useNavigate } from 'react-router-dom'

window.Buffer = window.Buffer || require('buffer').Buffer

const FileUpload = () => {
  const [file, setFile] = useState()
  const [fileType, setFileType] = useState()
  const [title, setTitle] = useState('')
  const navigate = useNavigate()

  const handleFileInput = (event) => {
    setFile(event.target.files[0])
    setFileType(event.target.files[0].type)
  }

  const handleFileUpload = async (event) => {
    event.preventDefault()

    try {
      // Creates a copy of the file with a random name in order
      // not to overwrite existing files in AWS with the same name.
      const fileToUpload = new File([file], uuid())
      const uploadedFile = await uploadFile(fileToUpload, awsConfig)

      console.log(file.name)

      const newMedia = await mediaService.createMedia({
        content: uploadedFile.location,
        type: fileType,
        fileName: file.name,
        size: fileToUpload.size,
        title: title.trim().length === 0 ? 'Untitled' : title
      })

      navigate(`/${newMedia.id}`, {
        state: {
          media: newMedia
        }
      })
    } catch (e) {
      console.error(e)
    }
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  return (
    <div>
      <form onSubmit={handleFileUpload}>
        <div className="mb-4 w-full rounded-lg border border-[#403e3d] bg-[#403e3d]">
          <div className="flex rounded-t-lg bg-[#2b2b2b] px-3 py-2">
            <label htmlFor="text-media" className="sr-only"></label>
            <div className="flex py-1 items-center space-x-6">
              <label className="block">
                <input type="file"
                  className="block cursor-pointer rounded-lg border border-[#403e3d] pr-5  text-sm text-[#ddd] file:mr-4 file:rounded-l file:border-0 file:bg-[#403e3d] file:py-2 file:px-4 file:text-sm file:font-semibold file:text-[#ddd] hover:file:bg-orange-800"
                  onChange={handleFileInput} />
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex">
              <div className="p-1 pr-2">
                <label>Title / Name:</label>
              </div>
              <input className="pl-2 mr-0 rounded-lg focus:ring-0 focus:outline-none bg-[#2b2b2b] p-1"
                placeholder="Untitled"
                onChange={handleTitleChange} />
            </div>
            <button type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-[#ddd] bg-[#2b2b2b] rounded-lg hover:bg-orange-800">
              Create new media
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default FileUpload
