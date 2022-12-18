import { useEffect, useState } from 'react'

const File = ({ media }) => {
  const [fileContent, setFileContent] = useState('')

  useEffect(() => {
    const fetchFileContent = async () => {
      const fetchedContent = await fetch(media.content)
      const body = await fetchedContent.text()
      setFileContent(body)
    }

    fetchFileContent().catch(console.error)
  }, [])

  if (!fileContent) {
    return <div>
      Loading...
    </div>
  }

  return (
    <div className="whitespace-pre-line">
      {fileContent}
    </div>
  )
}

export default File
