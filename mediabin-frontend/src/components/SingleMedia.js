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

  if (!media) {
    if (typeof media === 'undefined') {
      return (
        <div className="items-start p-3 border-b-2 border-[#333333] pb-3 font-semibold text-2xl">
          Loading...
        </div>
      )
    } else {
      return (
        <div className="items-start p-3 border-b-2 border-[#333333] pb-3 font-semibold text-2xl text-red-500">
          Media has been deleted.
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
