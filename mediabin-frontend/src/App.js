import { useEffect, useState } from 'react'

import mediaService from './services/media'
import Media from './components/Media'
import Menu from './components/Menu'
import { Route, Routes, useMatch } from 'react-router-dom'
import styles from './index.css'

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
    <div style={styles} className='min-h-screen bg-[#252525] text-[#ddd]'>
      <div className='container max-w-7xl'>
        <Routes>
          <Route>
            <Route path='/' element={<Menu allMedia={allMedia} setAllMedia={setAllMedia} />} />
            <Route path='/:id' element={<Media media={media} />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
