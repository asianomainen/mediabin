import { useEffect, useState } from "react"

import mediaService from "./services/media"
import TextUpload from "./components/TextUpload";
import FileUpload from "./components/FileUpload";

const App = () => {
  const [allMedia, setAllMedia] = useState([])

  useEffect(() => {
    const fetchMedia = async () => {
      const media = await mediaService.getAll()
      setAllMedia(media)
    }

    fetchMedia().catch(console.error)
  }, [])

  return (
    <div>
      <h1>Mediabin</h1>
      <TextUpload allMedia={allMedia} setAllMedia={setAllMedia} />
      <FileUpload allMedia={allMedia} setAllMedia={setAllMedia} />
    </div>
  )
}

export default App
