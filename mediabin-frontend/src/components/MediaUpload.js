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
              className="w-4 h-4 focus:ring-orange-400 accent-orange-400" />
            <label htmlFor="text" className="ml-2 text-sm font-medium">
              Text</label>
          </div>
          <div className="flex items-center mr-4">
            <input id="file-radio" type="radio" value="File" name="inline-radio-group"
              className="w-4 h-4 focus:ring-orange-400 accent-orange-400" />
            <label htmlFor="text" className="ml-2 text-sm font-medium">
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
