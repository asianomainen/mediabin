import MediaUpload from './MediaUpload'
import MediaList from './MediaList'

const Menu = ({ allMedia, setAllMedia }) => {
  return (
    <div className="flex gap-6">
      <div className="w-4/5">
        <MediaUpload allMedia={allMedia} setAllMedia={setAllMedia} />
      </div>
      <div className="w-1/5">
        <label>All media</label>
        <hr />
        <MediaList allMedia={allMedia} />
      </div>
    </div>
  )
}

export default Menu

