import Image from './Image'
import Text from './Text'
import File from './File'
import { useContext } from 'react'
import { MediaContext } from '../App'

const Media = () => {
  const [, , media] = useContext(MediaContext)

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
