import byteSize from 'byte-size'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Text = ({ media }) => {
  const [copied, setCopied] = useState(false)
  const btnStyle = copied ? 'bg-orange-400 text-[#202020]' : ''

  useEffect(() => {
    window.Prism.highlightAll()
  }, [])

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(`https://mediabin.fly.dev/${media.id}`).then(
      () => {
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 2000)
      }
    )
  }

  return (
    <div className="flex flex-col p-1 justify-center">
      <Link className="pl-3" to="/">
        <button
          className="items-center w-16 py-2 text-xs font-medium text-center border-2 border-[#403e3d] text-[#ddd] bg-[#2b2b2b] rounded-lg hover:bg-orange-400 hover:border-[#2b2b2b] hover:text-[#202020] ease-linear transition-all duration-150">
          Back
        </button>
      </Link>

      <div className="items-start p-3 border-b-2 border-[#333333]">
        <div className="pb-3 font-semibold text-2xl">
          Media Info
        </div>
        <div className="flex text-lg font-light text-orange-400">
          Text title:
          <div className="pl-3 font-semibold text-[#ddd]">{media.title}</div>
        </div>
        <div className="flex text-lg font-light text-orange-400">
          File size:
          <div className="pl-3 text-[#ddd]">{byteSize(media.size).toString()}</div>
        </div>
        <div className="flex text-lg font-light text-orange-400">
          Share:
          <div className="flex pl-3 text-[#ddd]"
            onClick={copyToClipboard}>
            <div className="pr-3">
              {`https://mediabin.fly.dev/${media.id}`}
            </div>
            <button type="submit"
              className={btnStyle + ' w-28 rounded-lg bg-[#2b2b2b] border-2 border-[#403e3d] text-xs font-medium text-[#ddd] hover:bg-orange-400 hover:border-[#2b2b2b] hover:text-[#202020] ease-linear transition-all duration-150'}>
              {copied ? 'URL copied' : 'Copy share link'}
            </button>
          </div>
        </div>
      </div>

      <pre className="line-numbers">
        <code className={`language-${media.syntaxHighlight}`} data-prismjs-copy="Copy code">
          {media.content}
        </code>
      </pre>
    </div>
  )
}

export default Text
