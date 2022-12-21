import { useEffect, useState } from 'react'
import MediaInfo from './MediaInfo'
import { Link } from 'react-router-dom'

const File = ({ media }) => {
  const [fileContent, setFileContent] = useState('')
  const [viewable, setViewable] = useState(true)

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

  const downLoadFile = (url) => {
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

  const onClickUrl = (url) => {
    return () => downLoadFile(url)
  }

  return (
    <div className="flex flex-col p-1 justify-center">
      <Link className="pl-3" to="/">
        <button
          className="items-center w-16 py-2 text-xs font-medium text-center border-2 border-[#403e3d] text-[#ddd] bg-[#2b2b2b] rounded-lg hover:bg-orange-400 hover:border-[#2b2b2b] hover:text-[#202020] ease-linear transition-all duration-150">
          Back
        </button>
      </Link>

      <MediaInfo buttonText={'Download file'} media={media} onClickUrl={onClickUrl} />

      <div className="bg-[#2b2b2b] my-3 p-3 font-mono whitespace-pre-wrap break-words">
        {viewable
          ? <div>{fileContent ? fileContent : <p className="text-orange-400">File content loading...</p>}</div>
          : <div className="text-red-500">File could not be previewed. Please download file.</div>}
      </div>
    </div>
  )
}

export default File
