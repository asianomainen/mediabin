import TextUpload from './TextUpload'
import FileUpload from './FileUpload'
import { useState } from 'react'

const MediaUpload = () => {
  const [mediaChoice, setMediaChoice] = useState(true)

  const handleMediaChoiceChange = () => {
    setMediaChoice(!mediaChoice)
  }

  return (
    <div>
      <form onChange={handleMediaChoiceChange}>
        <div className="flex pb-3">
          <label className="flex items-center mr-4 font-semibold">New media type:</label>
          <div className="flex items-center mr-4">
            <input defaultChecked id="text" type="radio" value="Text" name="inline-radio-group"
              className="w-4 h-4 text-orange-600 focus:ring-orange-800 ring-offset-gray-800bg-gray-700 border-gray-600" />
            <label htmlFor="text" className="ml-2 text-sm font-medium text-gray-300">
              Text</label>
          </div>
          <div className="flex items-center mr-4">
            <input id="file-radio" type="radio" value="File" name="inline-radio-group"
              className="w-4 h-4 text-orange-600 focus:ring-orange-800 ring-offset-gray-800bg-gray-700 border-gray-600" />
            <label htmlFor="text" className="ml-2 text-sm font-medium text-gray-300">
              File</label>
          </div>
        </div>
      </form>

      {mediaChoice === true
        ? <TextUpload />
        : <FileUpload />
      }
    </div>
  )
}

export default MediaUpload
