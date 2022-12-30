import { useState } from 'react'

import mediaService from '../services/media'
import preSignedUrlService from '../services/preSignedUrl'
import { useNavigate } from 'react-router-dom'
import UploadBar from './UploadBar'

window.Buffer = window.Buffer || require('buffer').Buffer

const FileUpload = () => {
  const [file, setFile] = useState()
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [hidden, setHidden] = useState(false)
  const [burnAfterRead, setBurnAfterRead] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [fileTooLarge, setFileTooLarge] = useState(false)
  const navigate = useNavigate()

  const handleFileInput = (event) => {
    setFile(event.target.files[0])
    setFileTooLarge(false)
  }

  const handleFileUpload = async (event) => {
    event.preventDefault()

    if (file.size > 104857600) {
      setFileTooLarge(true)
      return
    } else {
      setFileTooLarge(false)
    }

    try {
      setUploading(true)

      const { url, Key } = await preSignedUrlService.getPreSignedUrl(file.type)
      await preSignedUrlService.uploadMedia(url, file)

      const newMedia = await mediaService.createMedia({
        content: Key,
        type: file.type,
        fileName: file.name,
        size: file.size,
        title: title.trim().length === 0 ? 'Untitled' : title,
        hidden: hidden,
        burnAfterRead: burnAfterRead
      })

      setFile(null)
      setTitle('')
      setHidden(false)
      setBurnAfterRead(false)

      if (!burnAfterRead) {
        navigate(`/${newMedia.id}`)
      } else {
        handleShowModal()
        setUrl(`https://mediabin.fly.dev/#/${newMedia.id}`)
      }

      setUploading(false)
    } catch (error) {
      setUploading(false)
      console.error('File upload failed')
    }
  }

  const handleShowModal = () => {
    setShowModal(true)
  }

  return (
    <div>
      <form onSubmit={handleFileUpload}>
        <div className="mb-4 w-full rounded-lg border border-[#403e3d] bg-[#403e3d]">
          <div className="flex rounded-t-lg bg-[#2b2b2b] px-3 py-2">
            <label htmlFor="text-media" className="sr-only"></label>
            <div className="py-1 items-center space-x-3">
              <label className="block">
                <input type="file"
                  className="block cursor-pointer rounded-lg border border-[#403e3d] pr-5 text-sm text-[#ddd] file:mr-4 file:rounded-l file:border-0 file:bg-[#403e3d] file:py-2 file:px-4 file:text-sm file:font-semibold file:text-[#ddd] file:hover:bg-orange-400 file:transition-all file:duration-150 file:ease-linear file:hover:text-[#202020]"
                  onChange={handleFileInput}
                  required />
              </label>
              {fileTooLarge && <div className="text-red-500">File too large. Maximum file size is 100MB.</div>}
            </div>
          </div>

          <UploadBar title={title} setTitle={setTitle} url={url} hidden={hidden} setHidden={setHidden}
            burnAfterRead={burnAfterRead} setBurnAfterRead={setBurnAfterRead} showModal={showModal}
            setShowModal={setShowModal} uploading={uploading} />
        </div>
      </form>
    </div>
  )
}

export default FileUpload
