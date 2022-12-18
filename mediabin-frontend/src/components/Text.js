import byteSize from 'byte-size'
import { useState } from 'react'

const Text = ({ media }) => {
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

  return (
    <div className="flex flex-col p-1 justify-center">
      <div className="items-start p-3 border-b-2 border-[#333333]">
        <div className="pb-3 font-semibold text-2xl">
          Media Info
        </div>
        <div className="flex text-lg font-light text-orange-400">
          Text title:
          <div className="pl-3 text-lg font-semibold text-[#ddd]">{media.name}</div>
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
      </div>
      <div className="bg-[#2b2b2b] my-3 p-3 whitespace-pre-line">
        {media.content}
      </div>
    </div>
  )
}

export default Text
