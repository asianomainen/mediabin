import { Link } from 'react-router-dom'
import byteSize from 'byte-size'

const MediaList = ({ allMedia }) => {
  return (
    <div className="flex flex-col">
      <label className="border-b-2 border-[#333333] font-semibold">Latest media</label>
      {allMedia.map(media => {
        return (
          <div key={media.id} className="py-1.5">
            <Link to={`/${media.id}`} className="text-lg text-orange-400">{media.name}</Link>
            <div className="flex text-sm text-[#999]">
              {media.type ? media.type :
                <div className="text-sm text-red-500">
                  unknown&nbsp;</div>
              } | {byteSize(media.size).toString()}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MediaList
