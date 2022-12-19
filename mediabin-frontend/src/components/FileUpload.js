import uuid from 'react-uuid'
import { uploadFile } from 'react-s3'
import { useContext, useState } from 'react'

import mediaService from '../services/media'
import { awsConfig } from '../utils/config'
import { MediaContext } from '../App'

window.Buffer = window.Buffer || require('buffer').Buffer

const FileUpload = () => {
  const [file, setFile] = useState()
  const [fileType, setFileType] = useState()
  const [allMedia, setAllMedia] = useContext(MediaContext)

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

      const newMedia = await mediaService.createMedia({
        content: uploadedFile.location,
        type: fileType,
        name: file.name,
        size: fileToUpload.size
      })

      setAllMedia(allMedia.concat(newMedia))
    } catch (e) {
      console.error(e)
    }
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
          <div className="flex items-center justify-between border-gray-600 px-3 py-2">
            <button type="submit"
              className="inline-flex items-center rounded-lg bg-[#2b2b2b] py-2.5 px-4 text-center text-xs font-medium text-[#ddd] hover:bg-orange-800">Create
              new media
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default FileUpload
