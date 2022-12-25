import MediaInfo from './MediaInfo'
import { Link } from 'react-router-dom'

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
      <Link className="pl-3" to="/">
        <button
          className="items-center w-16 py-2 text-xs font-medium text-center border border-[#403e3d] text-[#ddd] bg-[#2b2b2b] rounded-lg hover:bg-orange-400 hover:border-[#2b2b2b] hover:text-[#202020] ease-linear transition-all duration-150">
          Back
        </button>
      </Link>

      <MediaInfo buttonText={'Preview full size image'} media={media} onClickUrl={onClickUrl} />

      <div className="p-3 whitespace-pre-line">
        <img className="max-w-md drop-shadow-lg" src={media.content} alt={'Unknown upload by an unknown person'} />
      </div>
    </div>
  )
}

export default Image
