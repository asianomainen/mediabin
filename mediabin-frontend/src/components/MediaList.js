import { Link } from 'react-router-dom'
import byteSize from 'byte-size'
import { useContext } from 'react'
import { MediaContext } from '../App'

const MediaList = () => {
  const [allMedia] = useContext(MediaContext)

  return (
    <div className="flex flex-col">
      <label className="border-b-2 border-[#333333] font-semibold">Latest media</label>
      {allMedia.map(media => {
        return (
          <div key={media.id} className="py-1.5 border-dotted border-b-2 border-[#333333]">
            <Link to={`/${media.id}`}
              className="text-lg text-orange-400">{media.title.length > 22 ? media.title.slice(0, 16).concat('...') : media.title}</Link>
            <div className="flex text-sm text-[#999]">
              {media.type
                ? media.type === 'text'
                  ? media.type
                  : media.type.split('/')[1]
                : <div className="text-sm text-red-500">
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
