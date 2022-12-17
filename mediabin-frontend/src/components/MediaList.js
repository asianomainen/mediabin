import { Link } from 'react-router-dom'

const MediaList = ({ allMedia }) => {
  return (
    <div>
      {allMedia.map(media => {
        return (
          <div key={media.id}>
            <Link to={`/${media.id}`}>{media.name}</Link>
          </div>
        )
      })}
    </div>
  )
}

export default MediaList
