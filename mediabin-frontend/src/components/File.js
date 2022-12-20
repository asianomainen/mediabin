import { useEffect, useState } from 'react'
import byteSize from 'byte-size'

const File = ({ media }) => {
  const [fileContent, setFileContent] = useState('')
  const [viewable, setViewable] = useState(true)
  const [copied, setCopied] = useState(false)
  const btnStyle = copied ? 'bg-orange-800 text-white' : ''

  useEffect(() => {
    const fetchFileContent = async () => {
      const fetchedContent = await fetch(media.content)
      const body = await fetchedContent.text()

      if (body.indexOf('�') > -1) {
        setViewable(false)
      }

      setFileContent(body)
    }

    fetchFileContent().catch(console.error)
  }, [])

  if (!fileContent) {
    return <div>Loading...</div>
  }

  const copyToClipboard = () => {
    window.navigator.clipboard
      .writeText(`https://mediabin.fly.dev/${media.id}`)
      .then(
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

  const onClickUrl = (url) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': media.type,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(
          new Blob([blob]),
        )

        const link = document.createElement('a')
        link.href = url
        link.setAttribute(
          'download',
          media.fileName,
        )

        link.click()
      })
  }

  return (
    <div className="flex flex-col p-1 justify-center">
      <div className="items-start p-3 border-b-2 border-[#333333]">
        <div className="pb-3 font-semibold text-2xl">
          Media Info
        </div>
        <div className="flex text-lg font-light text-orange-400">
          File name:
          <div className="pl-3 font-semibold text-[#ddd]">{media.fileName}</div>
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
              className={btnStyle + ' w-28 rounded-lg bg-[#2b2b2b] text-xs font-medium text-[#ddd] hover:bg-orange-800'}>
              {copied ? 'URL copied' : 'Copy to clipboard'}
            </button>
          </div>
        </div>
        <div className="pt-2">
          <a onClick={() => {
            onClickUrl(media.content)
          }}>
            <button type="submit"
              className="rounded-lg bg-[#2b2b2b] border-2 border-[#403e3d] py-2.5 px-4 text-center text-xs font-medium text-[#ddd] hover:bg-orange-800">
              Download file
            </button>
          </a>
        </div>
      </div>
      <div className="bg-[#2b2b2b] my-3 p-3 font-mono whitespace-pre-wrap break-words">
        {viewable
          ? <div className="text-blue-300">{fileContent}</div>
          : <div className="text-red-500">File could not be previewed. Please download file.</div>}
      </div>
    </div>
  )
}

export default File
