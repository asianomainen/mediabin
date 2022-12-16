import { useEffect, useState } from 'react'

import mediaService from './services/media'
import AllMedia from './components/AllMedia'
import MediaUpload from './components/MediaUpload'

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
    <div className={'main-container'}>
      <h1>Mediabin</h1>

      <h4>Welcome to Mediabin! Are you tired of only being able to paste text in Pastebin? Worry no more! Mediabin is
        here. With Mediabin you are able to share files in addition to text.</h4>

      <MediaUpload allMedia={allMedia} setAllMedia={setAllMedia} />

      <h5>Uploaded media</h5>
      <AllMedia allMedia={allMedia} setAllMedia={setAllMedia} />
    </div>
  )
}

export default App
