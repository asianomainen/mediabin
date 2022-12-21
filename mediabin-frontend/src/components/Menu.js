import MediaUpload from './MediaUpload'
import MediaList from './MediaList'

const Menu = () => {

  return (
    <div className="flex-col lg:flex lg:flex-row p-5 gap-6">
      <div className="w-full lg:w-4/5">
        <MediaUpload />
      </div>
      <div className="w-full lg:w-1/5">
        <MediaList />
      </div>
    </div>
  )
}

export default Menu

