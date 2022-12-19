import MediaUpload from './MediaUpload'
import MediaList from './MediaList'

const Menu = () => {

  return (
    <div className="flex p-5 gap-6">
      <div className="w-4/5">
        <MediaUpload />
      </div>
      <div className="w-1/5">
        <MediaList />
      </div>
    </div>
  )
}

export default Menu

