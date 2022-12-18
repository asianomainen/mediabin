import MediaUpload from './MediaUpload'
import MediaList from './MediaList'

const Menu = ({ allMedia, setAllMedia }) => {
  return (
    <div className="flex p-5 gap-6">
      <div className="w-4/5">
        <MediaUpload allMedia={allMedia} setAllMedia={setAllMedia} />
      </div>
      <div className="w-1/5">
        <MediaList allMedia={allMedia} />
      </div>
    </div>
  )
}

export default Menu

