import { Link } from 'react-router-dom'

const MediaList = ({ allMedia }) => {
  return (
    <div className="flex flex-col">
      <label className="border-b-2 border-[#333333] font-semibold">Latest media</label>
      {allMedia.map(media => {
        return (
          <div key={media.id} className="py-1">
            <Link to={`/${media.id}`}>{media.name}</Link>
          </div>
        )
      })}
    </div>
  )
}

export default MediaList
