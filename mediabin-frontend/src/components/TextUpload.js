import mediaService from '../services/media'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TextUpload = () => {
  const [textArea, setTextArea] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [hidden, setHidden] = useState(false)
  const [burnAfterRead, setBurnAfterRead] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  const handleTextChange = (event) => {
    setTextArea(event.target.value)
  }

  const handleTextSubmit = async (event) => {
    event.preventDefault()

    try {
      const newMedia = await mediaService.createMedia({
        content: textArea,
        type: 'text',
        title: title.trim().length === 0 ? 'Untitled' : title,
        hidden: hidden,
        burnAfterRead: burnAfterRead
      })

      setTextArea('')
      setTitle('')
      setHidden(false)
      setBurnAfterRead(false)

      if (!burnAfterRead) {
        navigate(`/${newMedia.id}`)
      } else {
        handleShowModal()
        setUrl(`https://mediabin.fly.dev/${newMedia.id}`)
      }
    } catch (error) {
      console.error('Creating new media failed.')
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
      <form onSubmit={handleTextSubmit}>
        <div className="w-full mb-4 border rounded-lg bg-[#403e3d] border-[#403e3d]">
          <div className="px-4 py-2 rounded-t-lg bg-[#2b2b2b]">
            <label htmlFor="text-media" className="sr-only"></label>
            <textarea id="text" rows="15"
              className="w-full px-0 text-sm text-[#ddd] bg-[#2b2b2b] focus:ring-0 focus:outline-none placeholder-[#ddd]"
              required
              placeholder="Write your text here..."
              value={textArea}
              onChange={handleTextChange}>
            </textarea>
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
                            onClick={() => setShowModal(false)}
                          >
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
                            onClick={() => setShowModal(false)}
                          >
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

export default TextUpload
