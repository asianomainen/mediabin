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
    <div className='min-h-screen bg-[#252525] text-[#ddd]'>
      <div className='container max-w-7xl'>
        {media.type.split('/')[0] === 'image'
          ? <Image media={media} />
          : media.type === 'text'
            ? <Text media={media} />
            : <File media={media} />
        }
      </div>
    </div>
  )
}

export default Media
