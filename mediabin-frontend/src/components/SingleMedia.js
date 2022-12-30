import Image from './Image'
import Text from './Text'
import File from './File'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
    <div className="pt-1">
      <Link className="pl-4" to="/">
        <button
          className="items-center w-16 py-2 text-xs font-medium text-center border border-[#403e3d] text-[#ddd] bg-[#2b2b2b] rounded-lg hover:bg-orange-400 hover:border-[#2b2b2b] hover:text-[#202020] ease-linear transition-all duration-150">
          Back
        </button>
      </Link>
      {media.type.split('/')[0] === 'image'
        ? <Image media={media} />
        : media.type === 'text'
          ? <Text id="single-text" media={media} />
          : <File media={media} />
      }
    </div>
  )
}

export default SingleMedia
