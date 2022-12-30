import { useEffect, useState } from 'react'
import MediaInfo from './MediaInfo'

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

  const downloadFile = (url) => {
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
    <div className="flex-col pl-1 justify-center">
      <MediaInfo buttonText={'Download file'} media={media} onClickButton={downloadFile} />

      <div className="bg-[#2b2b2b] my-3 p-3 font-mono whitespace-pre-wrap break-words">
        {viewable
          ? <div>{fileContent
            ? <div id="file">{fileContent}</div>
            : <p className="text-orange-400">File content loading...</p>}</div>
          : <div id="no-preview" className="text-red-500">File could not be previewed. Please download file.</div>}
      </div>
    </div>
  )
}

export default File
