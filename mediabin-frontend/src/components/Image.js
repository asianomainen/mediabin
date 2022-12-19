import byteSize from 'byte-size'
import { useState } from 'react'

const Image = ({ media }) => {
  const [copied, setCopied] = useState(false)
  const btnStyle = copied ? 'bg-orange-800 text-white' : ''

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(`https://mediabin.fly.dev/${media.id}`).then(
      () => {
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 2000)
      },
      (error) => {
        console.log('Could not copy URL', error.message)
      }
    )
  }

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const onClickUrl = (url) => {
    return () => openInNewTab(url)
  }

  return (
    <div className="flex flex-col p-1 justify-center">
      <div className="items-start p-3 border-b-2 border-[#333333]">
        <div className="pb-3 font-semibold text-2xl">
          Media Info
        </div>
        <div className="flex text-lg font-light text-orange-400">
          File name:
          <div className="pl-3 text-lg font-semibold text-[#ddd]">{media.fileName}</div>
        </div>
        <div className="flex text-lg font-light text-orange-400">
          File size:
          <div className="pl-3 text-lg font-semibold text-[#ddd]">{byteSize(media.size).toString()}</div>
        </div>
        <div className="flex text-lg font-light text-orange-400">
          Share:
          <div className="flex pl-3 text-lg font-light text-[#ddd]"
            onClick={copyToClipboard}>
            <div className="pr-3">
              {`https://mediabin.fly.dev/${media.id}`}
            </div>
            <button type="submit"
              className={btnStyle + ' items-center w-28 rounded-lg bg-[#2b2b2b] text-center text-xs font-medium text-[#ddd] hover:bg-orange-800'}>
              {copied ? 'URL copied' : 'Copy to clipboard'}
            </button>
          </div>
        </div>
        <div className="pt-2">
          <a onClick={onClickUrl(media.content)}>
            <button type="submit"
              className="rounded-lg bg-[#2b2b2b] border-2 border-[#403e3d] py-2.5 px-4 text-center text-xs font-medium text-[#ddd] hover:bg-orange-800">
              Preview full size image
            </button>
          </a>
        </div>
      </div>
      <div className="p-3 whitespace-pre-line">
        <img className="max-w-md drop-shadow-lg" src={media.content} alt={'Unknown upload by an unknown person'} />
      </div>
    </div>
  )
}

export default Image
