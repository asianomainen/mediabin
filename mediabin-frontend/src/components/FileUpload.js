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
  const [url, setUrl] = useState('')
  const [hidden, setHidden] = useState(false)
  const [burnAfterRead, setBurnAfterRead] = useState(false)
  const [showModal, setShowModal] = useState(false)
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

      const newMedia = await mediaService.createMedia({
        content: uploadedFile.location,
        type: fileType,
        fileName: file.name,
        size: fileToUpload.size,
        title: title.trim().length === 0 ? 'Untitled' : title,
        hidden: hidden
      })

      setFile('')
      setTitle('')
      setHidden(false)
      setBurnAfterRead(false)

      if (!burnAfterRead) {
        navigate(`/${newMedia.id}`)
      } else {
        handleShowModal()
        setUrl(`https://mediabin.fly.dev/${newMedia.id}`)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleHiddenChange = () => {
    setHidden(!hidden)

    if (hidden) {
      setBurnAfterRead(false)
    }
  }

  const handleBurnAfterReadChange = () => {
    setBurnAfterRead(!burnAfterRead)

    if (!burnAfterRead) {
      setHidden(true)
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
            <div className="flex py-1 items-center space-x-6">
              <label className="block">
                <input type="file"
                  className="block cursor-pointer rounded-lg border border-[#403e3d] pr-5 text-sm text-[#ddd] file:mr-4 file:rounded-l file:border-0 file:bg-[#403e3d] file:py-2 file:px-4 file:text-sm file:font-semibold file:text-[#ddd] hover:file:bg-orange-800"
                  onChange={handleFileInput} />
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex">
              <div className="p-1 pr-2">
                <label>Title / Name:</label>
              </div>
              <div>
                <input className="mr-0 rounded-lg bg-[#2b2b2b] p-1 pl-2 focus:outline-none focus:ring-0"
                  placeholder="Untitled"
                  value={title}
                  onChange={handleTitleChange} />
              </div>

              <div className="p-1 pl-4">
                <div className="border-l border-r border-dotted px-3 group relative inline-block">
                  <label className="pr-2">Hidden:</label>
                  <input type="checkbox"
                    className="w-4 accent-orange-800"
                    checked={hidden}
                    onChange={handleHiddenChange} />
                  <span
                    className="absolute -left-3 -top-2 hidden w-48 -translate-y-full rounded-lg bg-[#202020] px-2 py-1 text-center text-sm text-[#ddd] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-[#202020] after:content-[''] group-hover:flex"
                  >Hides your media from the &quot;Latest media&quot; list
                  </span>
                </div>
                <div className="group pl-3 relative inline-block">
                  <label className="pr-2">Burn after read:</label>
                  <input type="checkbox"
                    className="w-4 accent-orange-800"
                    checked={burnAfterRead}
                    onChange={handleBurnAfterReadChange} />
                  <span
                    className="absolute left-12 -top-2 hidden w-48 -translate-y-full rounded-lg bg-[#202020] px-2 py-1 text-center text-sm text-[#ddd] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-[#202020] after:content-[''] group-hover:flex"
                  >Deletes the media after being viewed once
                  </span>
                </div>
              </div>
            </div>

            <button type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-[#ddd] bg-[#2b2b2b] rounded-lg hover:bg-orange-800 ease-linear transition-all duration-150">
              Create new media
            </button>
            <>
              {showModal ? (
                <>
                  <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-2xl">
                      <div
                        className="border-0 rounded-lg relative flex flex-col w-full bg-[#2b2b2b] outline-none focus:outline-none">

                        <div
                          className="flex items-start justify-between p-5 border-b border-solid border-[#403e3d] rounded-t">
                          <h3 className="text-2xl font-semibold">
                            Burn After Read
                          </h3>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}>
                          </button>
                        </div>

                        <div className="relative px-6 py-3 flex-auto">
                          <div className="my-4 text-[#ddd] text-lg">
                            <div>
                              You have created a burn after read media. <strong className="text-red-500">This means that
                              it will be permanently deleted after it is opened for the first time.</strong>
                            </div>
                            <br />
                            <div>
                              Here is the link you can use to share the media:
                            </div>
                            <div className="font-bold text-orange-400">
                              {url}
                            </div>
                          </div>
                        </div>

                        <div
                          className="flex items-center justify-end p-4 border-t border-[#403e3d] border-solid rounded-b">
                          <button
                            className="inline-flex items-center py-2.5 px-4 border-2 border-[#403e3d] text-xs font-medium text-center text-[#ddd] bg-[#2b2b2b] rounded-lg hover:bg-orange-800 hover:border-[#2b2b2b] ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}>
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
            </>
          </div>
        </div>
      </form>
    </div>
  )
}

export default FileUpload
