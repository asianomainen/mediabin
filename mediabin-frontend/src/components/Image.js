const Image = ({ media }) => {
  return (
    <div>
      <img className="max-w-xs" src={media.content} alt={'Unknown'} />
      <a href={media.content}>
        <button>Preview {media.name} at full size</button>
      </a>
    </div>
  )
}

export default Image
