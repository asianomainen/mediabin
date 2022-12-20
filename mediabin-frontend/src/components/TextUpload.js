import mediaService from '../services/media'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UploadBar from './UploadBar'

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
        setShowModal(true)
        setUrl(`https://mediabin.fly.dev/${newMedia.id}`)
      }
    } catch (error) {
      console.error('Creating new media failed.')
    }
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

          <UploadBar title={title} setTitle={setTitle} url={url} hidden={hidden} setHidden={setHidden}
            burnAfterRead={burnAfterRead} setBurnAfterRead={setBurnAfterRead} showModal={showModal}
            setShowModal={setShowModal} />
        </div>
      </form>
    </div>
  )
}

export default TextUpload
