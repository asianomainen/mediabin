import MediaUpload from './MediaUpload'
import MediaList from './MediaList'

const Menu = () => {

  return (
    <div className="flex-col md:flex md:flex-row p-5 gap-6">
      <div className="w-full md:w-4/5">
        <MediaUpload />
      </div>
      <div className="w-full md:w-1/5">
        <MediaList />
      </div>
    </div>
  )
}

export default Menu

