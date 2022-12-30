import MediaInfo from './MediaInfo'

const Image = ({ media }) => {
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <div className="flex-col pl-1 justify-center">
      <MediaInfo buttonText={'Preview full size image'} media={media} onClickButton={openInNewTab} />

      <div className="p-3 whitespace-pre-line">
        <img id="image"
          className="max-w-md drop-shadow-lg"
          src={media.content}
          alt={'Unknown upload by an unknown person'} />
      </div>
    </div>
  )
}

export default Image
