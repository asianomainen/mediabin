import MediaUpload from './MediaUpload'
import MediaList from './MediaList'

const Menu = ({ allMedia, setAllMedia }) => {
  return (
    <div>
      <h1 className="text-5xl">MEDIABIN</h1>

      <h4>Welcome to Mediabin! Are you tired of only being able to paste text in Pastebin? Worry no more! Mediabin is
        here. With Mediabin you are able to share files in addition to text.</h4>

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
    </div>
  )
}

export default Menu

