const AllMedia = ({ allMedia }) => {
  return (
    <div>
      {allMedia.map(media => {
        if (media.type.split('/')[0] === 'image') {
          return (
            <p key={media.id}>
              <img style={{ width: '20%', height: '20%' }} src={media.content} alt={'Unknown'} />
              <br />
              <a href={media.content}>
                <button>Download {media.name}</button>
              </a>
            </p>
          )
        } else if (media.type === 'text') {
          return (
            <p key={media.id}>
              {media.content}
            </p>)
        } else {
          return (
            <p key={media.id}>
              <a href={media.content}>
                <button>Download {media.name}</button>
              </a>
            </p>
          )
        }
      })}
    </div>
  )
}

export default AllMedia
