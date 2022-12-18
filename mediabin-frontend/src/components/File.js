import { useEffect, useState } from 'react'
import uuid from 'react-uuid'

const File = ({ media }) => {
  const [fileContent, setFileContent] = useState([''])

  useEffect(() => {
    const fetchFileContent = async () => {
      const fetchedContent = await fetch(media.content)
      const body = await fetchedContent.text()
      setFileContent(body.split('\n'))
    }

    fetchFileContent().catch(console.error)
  }, [])

  if (!fileContent) {
    return <div>
      Loading...
    </div>
  }

  return (
    <div>
      {fileContent.map(line => {
        const key = uuid()

        if (line === '') {
          return (
            <br key={key} />
          )
        } else {
          return (
            <p key={key}>
              {line}
            </p>
          )
        }
      })}
    </div>
  )
}

export default File
