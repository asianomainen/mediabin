import byteSize from 'byte-size'
import { useState } from 'react'

const MediaInfo = ({ buttonText, media, onClickButton }) => {
  const [copied, setCopied] = useState(false)
  const btnStyle = copied ? 'bg-orange-400 text-[#202020]' : ''

  const copyToClipboard = () => {
    window.navigator.clipboard
      .writeText(`https://mediabin.fly.dev/#/${media.id}`)
      .then(
        () => {
          setCopied(true)
          setTimeout(() => {
            setCopied(false)
          }, 2000)
        }
      )
  }

  return (
    <div className="items-start p-3 border-b-2 border-[#333333]">
      <div className="pb-3 font-semibold text-2xl">
        Media Info
      </div>
      <div className="flex text-lg font-light text-orange-400">
        Title:
        <div className="pl-3 font-semibold text-[#ddd]">{media.title}</div>
      </div>
      <div className="flex text-lg font-light text-orange-400">
        File name:
        <div className="pl-3 text-[#ddd]">{media.fileName}</div>
      </div>
      <div className="flex text-lg font-light text-orange-400">
        File type:
        <div className="pl-3 text-[#ddd]">{media.type}</div>
      </div>
      <div className="flex text-lg font-light text-orange-400">
        File size:
        <div className="pl-3 text-[#ddd]">{byteSize(media.size).toString()}</div>
      </div>
      <div className="flex text-lg font-light text-orange-400">
        Share:
        <div className="flex pl-3 text-lg font-light text-[#ddd]"
          onClick={copyToClipboard}>
          <div className="pr-3">
            {`https://mediabin.fly.dev/#/${media.id}`}
          </div>
          <button type="submit"
            className={btnStyle + ' w-28 rounded-lg bg-[#2b2b2b] border border-[#403e3d] text-xs font-medium text-[#ddd] hover:bg-orange-400 hover:border-[#2b2b2b] hover:text-[#202020] ease-linear transition-all duration-150'}>
            {copied ? 'URL copied' : 'Copy share link'}
          </button>
        </div>
      </div>
      <div className="pt-2">
        <a onClick={() => onClickButton(media.content)}>
          <button type="submit"
            className="rounded-lg bg-[#2b2b2b] border border-[#403e3d] py-2.5 px-4 text-center text-xs font-medium text-[#ddd] hover:bg-orange-400 hover:border-[#2b2b2b] hover:text-[#202020] ease-linear transition-all duration-150">
            {buttonText}
          </button>
        </a>
      </div>
    </div>
  )
}

export default MediaInfo
