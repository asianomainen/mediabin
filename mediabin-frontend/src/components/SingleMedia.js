import Image from './Image'
import Text from './Text'
import File from './File'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import mediaService from '../services/media'

const SingleMedia = () => {
  const [media, setMedia] = useState()
  const location = useLocation()

  useEffect(() => {
    const fetchMedia = async () => {
      const fetchedMedia = await mediaService.getOne(location.pathname.substring(1))
      setMedia(fetchedMedia)
    }

    fetchMedia().catch(console.error)
  }, [])

  console.log(typeof media)

  if (!media) {
    if (typeof media === 'undefined') {
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      return (
        <div>
          Media not found
        </div>
      )
    }
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

export default SingleMedia
