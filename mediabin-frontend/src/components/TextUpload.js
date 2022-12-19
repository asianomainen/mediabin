import mediaService from '../services/media'
import { useContext, useState } from 'react'
import { MediaContext } from '../App'

const TextUpload = () => {
  const [textArea, setTextArea] = useState('')
  const [allMedia, setAllMedia] = useContext(MediaContext)


  const handleTextChange = (event) => {
    setTextArea(event.target.value)
  }

  const handleTextSubmit = async (event) => {
    event.preventDefault()

    try {
      const newMedia = await mediaService.createMedia({
        content: textArea,
        type: 'text',
        name: textArea.slice(0, 3)
      })

      setAllMedia(allMedia.concat(newMedia))
      setTextArea('')
    } catch (error) {
      alert('Something went wrong')
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
          <div className="flex items-center justify-between px-3 py-2 border-gray-600">
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
