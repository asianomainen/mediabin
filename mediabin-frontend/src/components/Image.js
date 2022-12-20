import MediaInfo from './MediaInfo'

const Image = ({ media }) => {
  const openInNewTab = (event, url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const onClickUrl = (url) => {
    return () => openInNewTab(url)
  }

  return (
    <div className="flex flex-col p-1 justify-center">
      <MediaInfo buttonText={'Preview full size image'} media={media} onClickUrl={onClickUrl} />
      <div className="p-3 whitespace-pre-line">
        <img className="max-w-md drop-shadow-lg" src={media.content} alt={'Unknown upload by an unknown person'} />
      </div>
    </div>
  )
}

export default Image
