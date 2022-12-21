import byteSize from 'byte-size'
import { useEffect, useState } from 'react'
import '../static/prism.css'
import Prism from 'prismjs'
import 'prismjs/plugins/toolbar/prism-toolbar.min'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min'
import 'prismjs/plugins/line-numbers/prism-line-numbers.min'

const Text = ({ media }) => {
  const [copied, setCopied] = useState(false)
  const btnStyle = copied ? 'bg-orange-800 text-white' : ''

  useEffect(() => {
    Prism.highlightAll()
  }, [])

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
              className={btnStyle + ' w-28 rounded-lg bg-[#2b2b2b] border-2 border-[#403e3d] text-xs font-medium text-[#ddd] hover:bg-orange-800 hover:border-[#2b2b2b] ease-linear transition-all duration-150'}>
              {copied ? 'URL copied' : 'Copy to clipboard'}
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
