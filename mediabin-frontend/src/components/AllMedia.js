const AllMedia = ({ allMedia }) => {
  return (
    <>
      {allMedia.map(media => {
        if (media.type.split('/')[0] === 'image') {
          return (
            <p>
              <img style={{ width: '20%', height: '20%' }} src={media.content} alt={'Unknown'} />
              <br />
              <a href={media.content}>
                <button>Download {media.name}</button>
              </a>
            </p>
          )
        } else if (media.type === 'text') {
          return (
            <p>
              {media.content}
            </p>)
        } else {
          return (
            <p>
              <a href={media.content}>
                <button>Download {media.name}</button>
              </a>
            </p>
          )
        }
      })}
    </>
  )
}

export default AllMedia
