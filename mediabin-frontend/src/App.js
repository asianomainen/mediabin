import { useEffect, useState } from 'react'

import mediaService from './services/media'
import Media from './components/Media'
import Menu from './components/Menu'
import { Route, Routes, useMatch } from 'react-router-dom'
import styles from './index.css'
import Header from './components/Header'
import Footer from './components/Footer'

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
    <div style={styles} className="bg-[#252525] text-[#ddd] flex flex-col h-screen">
      <Header />
      <div className="flex-1 py-2 container overflow-y-scroll max-w-7xl">
        <Routes>
          <Route>
            <Route path="/" element={<Menu allMedia={allMedia} setAllMedia={setAllMedia} />} />
            <Route path="/:id" element={<Media media={media} />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
