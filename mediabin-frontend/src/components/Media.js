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
      <li key={media.id}>
        {media.name}
      </li>
    </div>
  )
}

export default Media
