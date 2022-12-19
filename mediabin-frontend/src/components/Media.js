import Image from './Image'
import Text from './Text'
import File from './File'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import mediaService from '../services/media'

const Media = () => {
  const [media, setMedia] = useState()
  const location = useLocation()

  useEffect(() => {
    const fetchMedia = async () => {
      const fetchedMedia = await mediaService.getOne(location.pathname.substring(1))
      setMedia(fetchedMedia)
    }

    fetchMedia().catch(console.error)
  }, [])

  if (!media) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div>
      {media.type.split('/')[0] === 'image'
        ? <Image media={media} />
        : media.type === 'text'
          ? <Text media={media} />
          : <File media={media} />
      }
    </div>
  )
}

export default Media
