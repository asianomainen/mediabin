import Image from './Image'
import Text from './Text'
import File from './File'

const Media = ({ media }) => {
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
