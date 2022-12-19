import mediaService from '../services/media'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TextUpload = () => {
  const [textArea, setTextArea] = useState('')
  const [title, setTitle] = useState('')
  const [hidden, setHidden] = useState(false)
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
        hidden: hidden
      })

      setTextArea('')
      navigate(`/${newMedia.id}`, {
        state: {
          media: newMedia
        }
      })
    } catch (error) {
      alert('Something went wrong')
    }
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleHiddenChange = () => {
    setHidden(!hidden)
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
                  placeholder="Untitled" onChange={handleTitleChange} />
              </div>
              <div className="p-1 pl-6">
                <div className="group relative inline-block">
                  <label className="pr-2">Hidden:</label>
                  <input type="checkbox" className="w-4 accent-orange-800" onChange={handleHiddenChange} />
                  <span
                    className="absolute -left-6 -top-2 hidden w-48 -translate-y-full rounded-lg bg-[#202020] px-2 py-1 text-center text-sm text-[#ddd] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-[#202020] after:content-[''] group-hover:flex"
                  >Hides your media from the &quot;Latest media&quot; list
                  </span>
                </div>
              </div>
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

export default TextUpload
