import TextUpload from './TextUpload'
import FileUpload from './FileUpload'
import { useState } from 'react'

const MediaUpload = ({ allMedia, setAllMedia }) => {
  const [mediaChoice, setMediaChoice] = useState(true)

  const handleMediaChoiceChange = () => {
    setMediaChoice(!mediaChoice)
  }

  return (
    <div>
      <form onChange={handleMediaChoiceChange}>
        <div className="flex">
          <label className="flex items-center mr-4">New media type:</label>
          <div className="flex items-center mr-4">
            <input defaultChecked id="text" type="radio" value="" name="inline-radio-group"
              className="w-4 h-4 text-orange-600 focus:ring-orange-800 ring-offset-gray-800bg-gray-700 border-gray-600" />
            <label htmlFor="text" className="ml-2 text-sm font-medium text-gray-300">
              Text</label>
          </div>
          <div className="flex items-center mr-4">
            <input id="file-radio" type="radio" value="" name="inline-radio-group"
              className="w-4 h-4 text-orange-600 focus:ring-orange-800 ring-offset-gray-800bg-gray-700 border-gray-600" />
            <label htmlFor="text" className="ml-2 text-sm font-medium text-gray-300">
              File</label>
          </div>
        </div>
      </form>

      {mediaChoice === true
        ? <TextUpload allMedia={allMedia} setAllMedia={setAllMedia} />
        : <FileUpload allMedia={allMedia} setAllMedia={setAllMedia} />
      }
    </div>
  )
}

export default MediaUpload
