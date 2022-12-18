import byteSize from 'byte-size'

const Image = ({ media }) => {

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const onClickUrl = (url) => {
    return () => openInNewTab(url)
  }

  return (
    <div className="flex pt-5 justify-center">
      <img className="max-w-md" src={media.content} alt={'Unknown upload by an unknown person'} />
      <div className="items-start pl-5">
        <p className="pb-3 font-semibold text-2xl">
          Media Info
        </p>
        <div className="flex text-lg font-light text-orange-400">
          File name:
          <div className="pl-3 text-lg font-semibold text-[#ddd]">{media.name}</div>
        </div>
        <div className="flex pb-3 text-lg font-light text-orange-400">
          File size:
          <div className="pl-3 text-lg font-semibold text-[#ddd]">{byteSize(media.size).toString()}</div>
        </div>
        <a onClick={onClickUrl(media.content)}>
          <button
            className="border-2 border-[#999] py-2.5 px-4 text-md font-medium text-center text-[#ddd] bg-[#2b2b2b] rounded-lg hover:bg-orange-800">
            Preview full size image
          </button>
        </a>
      </div>
    </div>
  )
}

export default Image
