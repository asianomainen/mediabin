import { useEffect, useState } from 'react'

import mediaService from './services/media'
import Media from './components/Media'
import Menu from './components/Menu'
import { Route, Routes, useMatch } from 'react-router-dom'

const App = () => {
  const [allMedia, setAllMedia] = useState([])

  const match = useMatch('/:id')
  const media = match
    ? allMedia.find(media => media.id === match.params.id)
    : null

  useEffect(() => {
    const fetchMedia = async () => {
      const fetchedMedia = await mediaService.getAll()
      setAllMedia(fetchedMedia)
    }

    fetchMedia().catch(console.error)
  }, [])

  return (
    <Routes>
      <Route>
        <Route path='/' element={<Menu allMedia={allMedia} setAllMedia={setAllMedia} />} />
        <Route path='/:id' element={<Media media={media} />} />
      </Route>
    </Routes>
  )
}

export default App
